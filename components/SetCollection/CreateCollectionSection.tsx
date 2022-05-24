import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { createCreateMasterEditionV3Instruction, createCreateMetadataAccountV2Instruction } from "@metaplex-foundation/mpl-token-metadata";
import { Connection, Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { NFTStorageMetaplexor, prepareMetaplexNFT } from "@nftstorage/metaplex-auth";
import {
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  createMintToInstruction,
  getAssociatedTokenAddress,
  MintLayout,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { getBrowserLinkByAddress, getBrowserLinkByTxId, isValidPublicKey, waitForTransactionConfirmation } from "../../utils/solana";
import { AppContext } from "../AppContext";
import { getEditionPDA, getMetadataPDA } from "../../utils/mpl";
import { URLPolyfill } from "../../utils/urlPolyfill";
import { readFileAsDataUrl } from "../../utils/file";
import { Task, TaskStatus } from "../TaskStatus";

export interface CreateCollectionSectionProps {
  connection: Connection;
  onCreated: (collectionTokenPublicKey: PublicKey) => void;
}

export default function CreateCollectionSection(props: CreateCollectionSectionProps) {
  const { connection, onCreated } = props;
  const { settings } = useContext(AppContext);
  const wallet = useWallet();

  const [taskPackMetadata, setTaskPackMetadata] = useState<Task>();
  const [taskSignAndUpload, setTaskSignAndUpload] = useState<Task & { metadataUri?: string; metadataIpfsUri?: string }>();
  const [taskSignForMintingTx, setTaskSignForMintingTx] = useState<Task & { collectionNFTLink?: string }>();
  const [taskWaitingTx, setTaskWaitingTx] = useState<Task & { txLink?: string }>();
  const [taskFinish, setTaskFinish] = useState<Task>();
  const [executing, setExecuting] = useState(false);

  const resetCreateCollectionStates = () => {
    setTaskPackMetadata({});
    setTaskSignAndUpload({});
    setTaskSignForMintingTx({});
    setTaskWaitingTx({});
    setTaskFinish({});
  };

  const [iconFile, setIconFile] = useState<{ dataURL: string; mimeType: string }>();
  const [creators, setCreators] = useState<{ address: string; share: string }[]>([]);

  const selectLogo = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.addEventListener(
      "change",
      () => {
        if ((input.files?.length || 0) <= 0) return;
        readFileAsDataUrl(input.files![0]).then(setIconFile);
        input.remove();
      },
      { once: true },
    );
  };

  const onAddressChanged = (idx: number, value: string) => {
    const newCreators = [...creators];
    newCreators[idx].address = value;
    setCreators(newCreators);
  };

  const onShareChanged = (idx: number, value: string) => {
    const newCreators = [...creators];
    newCreators[idx].share = value;
    setCreators(newCreators);
  };

  const addCreator = () => {
    setCreators([...creators, { share: "0", address: "" }]);
  };

  const removeCreator = (idx: number) => {
    const newCreators = [...creators];
    newCreators.splice(idx, 1);
    setCreators(newCreators);
  };

  const getAndValidateCollectionNFTInfo: (collectionPublicKey: PublicKey) => Promise<{
    error?: string;
    name?: string;
    symbol?: string;
    description?: string;
    royaltyFeeRatio?: number;
    logo?: File;
    creators?: { address: PublicKey; share: number }[];
  }> = async (collectionPublicKey) => {
    let royaltyFeeRatio = parseFloat(document.querySelector<HTMLInputElement>("input#collection-fee")!.value ?? "");
    if (isNaN(royaltyFeeRatio)) return { error: "Invalid royalty fee ratio" };
    royaltyFeeRatio = Math.trunc(royaltyFeeRatio * 100);

    const name = (document.querySelector<HTMLInputElement>("input#collection-name")!.value! ?? "").trim();
    if (!name) return { error: "Name is blank" };

    const symbol = (document.querySelector<HTMLInputElement>("input#collection-symbol")!.value! ?? "").trim();
    if (!symbol) return { error: "Symbol is blank" };

    const description = (document.querySelector<HTMLTextAreaElement>("textarea#collection-description")!.value! ?? "").trim();

    const shares = [
      parseInt(document.querySelector<HTMLInputElement>("input#collection-default-share")!.value! ?? ""),
      ...creators.map(({ share }) => parseInt(share)),
    ];
    const invalidShareIndex = shares.findIndex((s) => isNaN(s) || s < 0);
    if (invalidShareIndex !== -1) return { error: `Invalid share for Creator ${invalidShareIndex + 1}` };
    if (shares.reduce((prev, curr) => prev + curr, 0) !== 100) return { error: "Shares doesn't add up to 100" };

    const creatorAddresses = [wallet?.publicKey?.toBase58() ?? "", ...creators.map(({ address }) => address)];
    const invalidCreatorIndex = creatorAddresses.findIndex((addr) => !isValidPublicKey(addr));
    if (invalidCreatorIndex !== -1) return { error: `Invalid address for Creator ${invalidCreatorIndex + 1}` };

    const blob = await (await fetch(iconFile!.dataURL)).blob();
    const file = new File([blob], collectionPublicKey.toBase58(), {
      type: iconFile!.mimeType,
      lastModified: +new Date(),
    });

    return {
      name,
      symbol,
      description,
      royaltyFeeRatio,
      logo: file,
      creators: creatorAddresses.map((addr, idx) => ({ address: new PublicKey(addr), share: shares[idx] })),
    };
  };

  const createCollectionToken = () => {
    const userPubKey = wallet!.publicKey!;

    resetCreateCollectionStates();
    setExecuting(true);
    setTaskPackMetadata({ status: TaskStatus.Loading });

    (async () => {
      const collectionTokenKeypair = Keypair.generate();
      console.debug("Collection Token:", collectionTokenKeypair.publicKey.toBase58());

      const inputs = await getAndValidateCollectionNFTInfo(collectionTokenKeypair.publicKey);

      if (inputs.error) {
        setTaskPackMetadata({ status: TaskStatus.Error, errorMessage: inputs.error });
        return;
      }

      setTaskPackMetadata({ status: TaskStatus.Success });
      setTaskSignAndUpload({ status: TaskStatus.Loading });

      const rawMetadata = {
        name: inputs.name!,
        symbol: inputs.symbol!,
        description: inputs.description!,
        seller_fee_basis_points: inputs.royaltyFeeRatio!,
        image: "",
        properties: {
          files: [
            {
              uri: collectionTokenKeypair.publicKey.toBase58(),
              type: iconFile!.mimeType,
            },
          ],
          category: "image",
          creators: inputs.creators!.map((c) => ({ address: c.address.toBase58(), share: c.share })),
        },
      };
      const nativeURL = window.URL;
      window.URL = URLPolyfill as any;
      const metaplexNFT = await prepareMetaplexNFT(rawMetadata, inputs.logo!);
      window.URL = nativeURL;

      let uploadResult: Awaited<ReturnType<typeof NFTStorageMetaplexor.storePreparedNFT>>;

      try {
        const nftStorageClient = await NFTStorageMetaplexor.withSigner(wallet.signMessage!, wallet.publicKey!.toBytes(), {
          solanaCluster: settings.cluster,
          mintingAgent: "thagki9/candy-machine-toolkit",
        });
        uploadResult = await nftStorageClient.storePreparedNFT(metaplexNFT);
      } catch (err) {
        console.error("Fail to sign:", err);
        setTaskSignAndUpload({ status: TaskStatus.Error, errorMessage: `${err}` });
        return;
      }
      console.debug("Metadata Upload:", uploadResult);

      setTaskSignAndUpload({
        status: TaskStatus.Success,
        metadataUri: uploadResult.metadataGatewayURL,
        metadataIpfsUri: uploadResult.metadataURI,
      });
      setTaskSignForMintingTx({ status: TaskStatus.Loading });

      const [editionPDA, metadataPDA, userTokenAccountAddress] = await Promise.all([
        getEditionPDA(collectionTokenKeypair.publicKey),
        getMetadataPDA(collectionTokenKeypair.publicKey),
        getAssociatedTokenAddress(collectionTokenKeypair.publicKey, userPubKey),
      ]);

      let transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: userPubKey,
          newAccountPubkey: collectionTokenKeypair.publicKey,
          space: MintLayout.span,
          lamports: await connection.getMinimumBalanceForRentExemption(MintLayout.span),
          programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMintInstruction(collectionTokenKeypair.publicKey, 0, userPubKey, userPubKey),
        createAssociatedTokenAccountInstruction(userPubKey, userTokenAccountAddress, userPubKey, collectionTokenKeypair.publicKey),
        createMintToInstruction(collectionTokenKeypair.publicKey, userTokenAccountAddress, userPubKey, 1, []),
        createCreateMetadataAccountV2Instruction(
          {
            metadata: metadataPDA[0],
            mint: collectionTokenKeypair.publicKey,
            mintAuthority: userPubKey,
            payer: userPubKey,
            updateAuthority: userPubKey,
          },
          {
            createMetadataAccountArgsV2: {
              data: {
                symbol: rawMetadata.symbol,
                name: rawMetadata.name,
                uri: uploadResult.metadataGatewayURL,
                sellerFeeBasisPoints: rawMetadata.seller_fee_basis_points,
                creators: inputs.creators!.map((c, idx) => ({
                  ...c,
                  verified: idx === 0,
                })),
                collection: null,
                uses: null,
              },
              isMutable: true,
            },
          },
        ),
        createCreateMasterEditionV3Instruction(
          {
            edition: editionPDA[0],
            metadata: metadataPDA[0],
            mint: collectionTokenKeypair.publicKey,
            mintAuthority: userPubKey,
            updateAuthority: userPubKey,
            payer: userPubKey,
          },
          { createMasterEditionArgs: { maxSupply: 0 } },
        ),
      );

      try {
        const recentBlockHash = await connection.getLatestBlockhash();
        transaction.recentBlockhash = recentBlockHash.blockhash;
        transaction.feePayer = userPubKey;
        transaction.partialSign(collectionTokenKeypair);
        transaction = await wallet!.signTransaction!(transaction);
      } catch (err: any) {
        setTaskSignForMintingTx({ status: TaskStatus.Error, errorMessage: `${err}` });
        return;
      }

      setTaskSignForMintingTx({
        status: TaskStatus.Success,
        collectionNFTLink: getBrowserLinkByAddress(collectionTokenKeypair.publicKey.toBase58(), settings.cluster),
      });
      setTaskWaitingTx({ status: TaskStatus.Loading });

      let txId: string;
      try {
        txId = await connection.sendRawTransaction(transaction.serialize());
      } catch (err: any) {
        setTaskWaitingTx({ status: TaskStatus.Error, errorMessage: err.message });
        return;
      }

      const txLink = getBrowserLinkByTxId(txId, settings.cluster);
      setTaskWaitingTx({ status: TaskStatus.Loading, txLink });

      try {
        await waitForTransactionConfirmation(txId, connection);
      } catch (err: any) {
        setTaskWaitingTx({ status: TaskStatus.Error, errorMessage: err.message, txLink });
        return;
      }

      setTaskWaitingTx({ status: TaskStatus.Success, txLink });
      setTaskFinish({ status: TaskStatus.Finish });

      onCreated(collectionTokenKeypair.publicKey);
    })().finally(() => {
      setExecuting(false);
    });
  };

  return (
    <>
      <article className="flex flex-col gap-4 w-96 flex-shrink-0">
        <div className="form-control w-full">
          <label className="label label-text">Collection Name</label>
          <input
            id="collection-name"
            className="input input-bordered w-full max-w-md"
            disabled={executing}
            type="text"
            placeholder="Please input the name of the collection"
          />
        </div>

        <div className="form-control w-full flex flex-row gap-4">
          <div className="flex-grow">
            <label className="label label-text">Symbol</label>
            <input
              id="collection-symbol"
              className="input input-bordered w-full max-w-md"
              disabled={executing}
              type="text"
              placeholder="Please input the symbol of the collection"
            />

            <label className="label label-text">Royalty Ratio (%)</label>
            <label className="input-group">
              <input
                id="collection-fee"
                className="input input-bordered w-full max-w-md"
                disabled={executing}
                type="number"
                max={100}
                min={0}
                placeholder="0 to 100"
                defaultValue={5}
              />
              <span>%</span>
            </label>
          </div>
          <div>
            <label className="label label-text">Icon</label>
            <div className="flex flex-row gap-2">
              <div
                className={`border border-zinc-300 h-32 w-32 aspect-square flex justify-center items-center rounded-md ${executing ? "" : " cursor-pointer"}`}
                onClick={executing ? undefined : selectLogo}
              >
                {iconFile ? <img className="h-full w-full object-contain" src={iconFile!.dataURL} alt="icon" /> : <span>Upload Logo</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            id="collection-description"
            disabled={executing}
            className="textarea textarea-bordered leading-relaxed"
            rows={3}
            placeholder="Please input your description to the collection"
          />
        </div>

        <div className="form-control w-full">
          <label className="label label-text">Creators</label>

          <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-row gap-3 items-center">
              <input
                disabled={true}
                className="block flex-grow input input-bordered input-sm w-full max-w-md"
                type="text"
                defaultValue={wallet?.publicKey?.toBase58() ?? ""}
              />
              <input
                id="collection-default-share"
                className="block w-3/12 input input-bordered input-sm w-full max-w-md appearance-none"
                type="number"
                disabled={executing}
                max={100}
                min={0}
                placeholder="Shares"
                defaultValue={100}
              />
              <button className="btn btn-circle btn-xs" disabled={executing} onClick={addCreator}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            {creators.map((creator, idx) => (
              <div key={idx} className="flex flex-row gap-3 items-center">
                <input
                  className="block flex-grow input input-bordered input-sm w-full max-w-md"
                  disabled={executing}
                  type="text"
                  onChange={(e) => onAddressChanged(idx, e.target.value)}
                  placeholder={`Creator ${idx + 1} Address`}
                />
                <input
                  className="block w-3/12 input input-bordered input-sm w-full max-w-md appearance-none"
                  disabled={executing}
                  type="number"
                  max={100}
                  min={0}
                  onChange={(e) => onShareChanged(idx, e.target.value)}
                  placeholder="Shares"
                  defaultValue={creator.share}
                />
                <button className="btn btn-circle btn-xs btn-error" disabled={executing} onClick={() => removeCreator(idx)}>
                  <FontAwesomeIcon icon={faXmark} color="white" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button className={`btn ${executing ? "loading" : ""} mt-4 px-8 w-fit`} disabled={executing || !wallet} onClick={createCollectionToken}>
          {executing ? "Creating..." : "Create"}
        </button>
      </article>

      {taskPackMetadata?.status && <div className="divider divider-horizontal" />}
      {taskPackMetadata?.status && (
        <ul className="tasks w-fit">
          <li className="task" data-status={taskPackMetadata?.status}>
            <div>Pack collection NFT metadata</div>
            {taskPackMetadata.errorMessage && <div className="error-message">{taskPackMetadata.errorMessage}</div>}
          </li>

          <li className="task" data-status={taskSignAndUpload?.status}>
            <div>Sign and uploading collection metadata</div>
            {taskSignAndUpload?.errorMessage && <div className="error-message">{taskSignAndUpload.errorMessage}</div>}
            {taskSignAndUpload?.metadataUri && (
              <a className="block underline" href={taskSignAndUpload.metadataUri} target="_blank" rel="noreferrer">
                Metadata
              </a>
            )}
            {taskSignAndUpload?.metadataIpfsUri && (
              <a className="block underline" href={taskSignAndUpload.metadataIpfsUri} target="_blank" rel="noreferrer">
                Metadata (IPFS)
              </a>
            )}
          </li>

          <li className="task" data-status={taskSignForMintingTx?.status}>
            <div>Sign for minting of collection NFT</div>
            {taskSignForMintingTx?.errorMessage && <div className="error-message">{taskSignForMintingTx.errorMessage}</div>}
            {taskSignForMintingTx?.collectionNFTLink && (
              <a className="block underline" href={taskSignForMintingTx.collectionNFTLink} target="_blank" rel="noreferrer">
                Collection NFT
              </a>
            )}
          </li>

          <li className="task" data-status={taskWaitingTx?.status}>
            <div>Waiting for transaction confirmation</div>
            {taskWaitingTx?.errorMessage && <div className="error-message">{taskWaitingTx.errorMessage}</div>}
            {taskWaitingTx?.txLink && (
              <a className="block underline" href={taskWaitingTx.txLink} target="_blank" rel="noreferrer">
                Transaction
              </a>
            )}
          </li>

          <li className="task" data-status={taskFinish?.status}>
            <div>Finish</div>
            {taskFinish?.errorMessage && <div className="error-message">{taskFinish.errorMessage}</div>}
          </li>
        </ul>
      )}
    </>
  );
}
