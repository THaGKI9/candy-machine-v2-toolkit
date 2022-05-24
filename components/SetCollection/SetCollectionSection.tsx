import { useContext, useEffect, useState } from "react";
import { Edition, Key, Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { getCollectionAuthorityRecordPDA, getCollectionPDA, getEditionPDA, getMetadataPDA, METADATA_PROGRAM_ADDRESS } from "../../utils/mpl";
import { useWallet } from "@solana/wallet-adapter-react";
import { Task, TaskStatus } from "../TaskStatus";
import { getBrowserLinkByTxId, isValidPublicKey, waitForTransactionConfirmation } from "../../utils/solana";
import { AppContext } from "../AppContext";
import { CandyMachine, CollectionPDA, createSetCollectionInstruction } from "@metaplex-foundation/mpl-candy-machine";

export interface SetCollectionSectionProps {
  id?: string;
  connection: Connection;
  collectionTokenPublicKey?: PublicKey;
}

export default function SetCollectionSection(props: SetCollectionSectionProps) {
  const { connection, id } = props;
  const { settings } = useContext(AppContext);
  const externalCollectionTokenPublicKey = props.collectionTokenPublicKey;
  const wallet = useWallet();

  const [executing, setExecuting] = useState(false);
  const [taskGetMetadata, setTaskGetMetadata] = useState<
    Task & { metadata?: Metadata; edition?: Edition; candyMachine?: CandyMachine; candyMachineCollection?: CollectionPDA }
  >();
  const [taskSignTx, setTaskSignTx] = useState<Task>();
  const [taskWaitingTx, setTaskWaitingTx] = useState<Task & { txLink?: string }>();
  const [taskFinish, setTaskFinish] = useState<Task>();

  const resetCreateCollectionStates = () => {
    setTaskGetMetadata({ status: TaskStatus.Loading });
    setTaskSignTx({});
    setTaskWaitingTx({});
    setTaskFinish({});
  };

  const getAndValidateInput: () => Promise<{
    error?: string;
    collectionTokenPublicKey?: PublicKey;
    candyMachinePublicKey?: PublicKey;
  }> = async () => {
    const collectionTokenPublicKeyString = ((document.getElementById("collection-token-address") as HTMLInputElement)?.value ?? "").trim();
    const candyMachinePublicKeyString = ((document.getElementById("candy-machine-address") as HTMLInputElement)?.value ?? "").trim();

    if (!isValidPublicKey(collectionTokenPublicKeyString)) return { error: "Invalid collection token address" };
    if (!isValidPublicKey(candyMachinePublicKeyString)) return { error: "Invalid candy machine address" };

    return {
      collectionTokenPublicKey: new PublicKey(collectionTokenPublicKeyString),
      candyMachinePublicKey: new PublicKey(candyMachinePublicKeyString),
    };
  };

  const setCollection = () => {
    const userPubKey = wallet!.publicKey!;

    resetCreateCollectionStates();
    setExecuting(true);

    (async () => {
      const inputs = await getAndValidateInput();

      if (inputs.error) {
        setTaskGetMetadata({ status: TaskStatus.Error, errorMessage: inputs.error });
        return;
      }

      const [editionPDA, metadataPDA, collectionPDAAddress] = await Promise.all([
        getEditionPDA(inputs.collectionTokenPublicKey!),
        getMetadataPDA(inputs.collectionTokenPublicKey!),
        getCollectionPDA(inputs.candyMachinePublicKey!),
      ]);

      const collectionAuthorityPDA = await getCollectionAuthorityRecordPDA(inputs.collectionTokenPublicKey!, collectionPDAAddress[0]);

      let metadata: Metadata, edition: Edition, candyMachine: CandyMachine, candyMachineCollection: CollectionPDA;
      try {
        [metadata, edition, candyMachine, candyMachineCollection] = await Promise.all([
          Metadata.fromAccountAddress(connection, metadataPDA[0]),
          Edition.fromAccountAddress(connection, editionPDA[0]),
          CandyMachine.fromAccountAddress(connection, inputs.candyMachinePublicKey!),
          CollectionPDA.fromAccountAddress(connection, collectionPDAAddress[0]),
        ]);
        console.debug("Candy Machine:", candyMachine);
        console.debug("Metadata:", metadata);
        console.debug("Edition:", edition);
        console.debug("Collection:", candyMachineCollection);
      } catch (err) {
        setTaskGetMetadata({ status: TaskStatus.Error, errorMessage: `${err}` });
        return;
      }

      if (!candyMachine.authority.equals(userPubKey)) {
        setTaskGetMetadata({
          status: TaskStatus.Error,
          errorMessage: "You aren't allowed to update this Candy Machine",
          candyMachine,
          candyMachineCollection,
          metadata,
          edition,
        });
        return;
      }

      if (!metadata.updateAuthority.equals(userPubKey)) {
        setTaskGetMetadata({
          status: TaskStatus.Error,
          errorMessage: "You aren't allowed to use this collection metadata NFT",
          candyMachine,
          candyMachineCollection,
          metadata,
          edition,
        });
        return;
      }

      if (edition.key !== Key.MasterEditionV1 && edition.key !== Key.MasterEditionV2) {
        setTaskGetMetadata({
          status: TaskStatus.Error,
          errorMessage: "This token is not the MasterEdition",
          candyMachine,
          candyMachineCollection,
          metadata,
          edition,
        });
        return;
      }

      setTaskGetMetadata({ status: TaskStatus.Success, candyMachine, candyMachineCollection, metadata, edition });
      setTaskSignTx({ status: TaskStatus.Loading });

      let transaction = new Transaction().add(
        createSetCollectionInstruction({
          candyMachine: inputs.candyMachinePublicKey!,
          authority: userPubKey,
          collectionPda: collectionPDAAddress[0],
          payer: userPubKey,
          metadata: metadataPDA[0],
          mint: inputs.collectionTokenPublicKey!,
          edition: editionPDA[0],
          collectionAuthorityRecord: collectionAuthorityPDA[0],
          tokenMetadataProgram: METADATA_PROGRAM_ADDRESS,
        }),
      );

      try {
        const recentBlockHash = await connection.getLatestBlockhash();
        transaction.recentBlockhash = recentBlockHash.blockhash;
        transaction.feePayer = userPubKey;
        transaction = await wallet!.signTransaction!(transaction);
      } catch (err: any) {
        setTaskSignTx({ status: TaskStatus.Error, errorMessage: `${err}` });
        return;
      }

      setTaskSignTx({ status: TaskStatus.Success });
      setTaskWaitingTx({ status: TaskStatus.Loading });

      let txId: string;
      try {
        txId = await connection.sendRawTransaction(transaction.serialize(), { skipPreflight: true });
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
    })().finally(() => setExecuting(false));
  };

  useEffect(() => {
    const ele = document.getElementById("collection-token-address") as HTMLInputElement;
    if (!ele || !externalCollectionTokenPublicKey) return;

    ele.value = externalCollectionTokenPublicKey.toBase58();
  }, [externalCollectionTokenPublicKey]);

  return (
    <>
      <article className="flex flex-col gap-4 w-96 flex-shrink-0">
        <div className="form-control w-full">
          <div className="form-control w-full">
            <label className="label label-text">Collection Token Address</label>
            <input
              id="collection-token-address"
              disabled={executing}
              type="text"
              placeholder="The token that contains your collection's metadata"
              className="input input-bordered w-full max-w-md"
            />
          </div>

          <label className="label label-text">Candy Machine Address</label>
          <input
            id="candy-machine-address"
            disabled={executing}
            type="text"
            placeholder="The address to your Candy Machine V2"
            className="input input-bordered w-full max-w-md"
          />
        </div>

        <button className={`btn ${executing ? "loading" : ""} mt-4 px-8 w-fit`} disabled={executing || !wallet} onClick={setCollection}>
          {executing ? "Executing..." : "Execute"}
        </button>
      </article>

      {taskGetMetadata?.status && <div className="divider divider-horizontal" />}
      {taskGetMetadata?.status && (
        <ul className="tasks">
          <li className="task" data-status={taskGetMetadata?.status}>
            <div>Getting Collection Token Metadata & Edition</div>
            {taskGetMetadata?.errorMessage && <div className="error-message">{taskGetMetadata.errorMessage}</div>}

            {taskGetMetadata?.candyMachine && taskGetMetadata?.candyMachineCollection && (
              <div className="mt-2 grid grid-cols-[auto_1fr] grid-rows-4 gap-1 text-sm align-middle">
                <header className="place-self-center font-bold col-span-2 text-base">Candy Machine</header>
                <header className="text-right font-bold">Symbol:</header>
                <article>{taskGetMetadata.candyMachine.data.symbol}</article>
                <header className="text-right font-bold">Authority:</header>
                <article>{taskGetMetadata.candyMachine.authority.toBase58()}</article>
                <header className="text-right font-bold">Collection:</header>
                <article>{taskGetMetadata.candyMachineCollection.mint.toBase58()}</article>
              </div>
            )}

            {taskGetMetadata?.candyMachine && taskGetMetadata?.metadata && taskGetMetadata?.edition && <div className="divider my-0" />}

            {taskGetMetadata?.metadata && taskGetMetadata?.edition && (
              <div className="grid grid-cols-[auto_1fr] grid-rows-5 gap-1 text-sm align-middle">
                <header className="place-self-center font-bold col-span-2 text-base">Collection Metadata</header>
                <header className="text-right font-bold">Name:</header>
                <article>{taskGetMetadata.metadata.data.name}</article>
                <header className="text-right font-bold">Update Authority:</header>
                <article>{taskGetMetadata.metadata.updateAuthority.toBase58()}</article>
                <header className="text-right font-bold">Master Edition:</header>
                <article>
                  {taskGetMetadata.edition.key === Key.MasterEditionV1 ? "V1" : taskGetMetadata.edition.key === Key.MasterEditionV2 ? "V1" : "N/A"}
                </article>
              </div>
            )}
          </li>

          <li className="task" data-status={taskSignTx?.status}>
            <div>Sign for minting of collection NFT</div>
            {taskSignTx?.errorMessage && <div className="error-message">{taskSignTx.errorMessage}</div>}
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
