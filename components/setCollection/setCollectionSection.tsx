import { useContext, useEffect, useState } from "react";
import { Edition, Key, Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { Connection, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { getCollectionAuthorityRecordPDA, getCollectionPDA, getEditionPDA, getMetadataPDA, METADATA_PROGRAM_ADDRESS } from "../../utils/mpl/token";
import { loadCandyProgramV2 } from "../../utils/candyMachine/helpers/accounts";
import { Wallet } from "@project-serum/anchor";
import { AppContext } from "../appContext";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { Task } from "../taskStatus";

export interface SetCollectionSectionProps {
  id?: string;
  connection: Connection;
  collectionTokenPublicKey?: PublicKey;
}

export default function SetCollectionSection(props: SetCollectionSectionProps) {
  const { connection, id } = props;
  const externalCollectionTokenPublicKey = props.collectionTokenPublicKey;
  const wallet = useAnchorWallet();

  const [settingCollection, setSettingCollection] = useState(false);

  const [taskGetMetadata, setTaskGetMetadata] = useState<Task & { metadata?: Metadata; edition?: Edition }>();

  const [creatingCollection, setCreatingCollection] = useState(false);
  const resetCreateCollectionStates = () => {
    // setTaskPackMetadata({ ...taskPackMetadataDefault });
    // setTaskSignAndUpload({ ...taskSignAndUploadDefault });
    // setTaskSignForMintingTx({ ...taskSignForMintingTxDefault });
    // setTaskWaitingTx({ ...taskWaitingTxDefault });
    // setTaskFinishCreating({ ...taskFinishCreatingDefault });
  };

  const getAndValidateInput: () => Promise<{
    error?: string;
    collectionTokenPublicKey?: PublicKey;
    candyMachinePublicKey?: PublicKey;
  }> = async () => {
    const collectionTokenPublicKeyString = ((document.getElementById("collection-token-address") as HTMLInputElement)?.value ?? "").trim();
    const candyMachinePublicKeyString = ((document.getElementById("candy-machine-address") as HTMLInputElement)?.value ?? "").trim();

    if (!PublicKey.isOnCurve(collectionTokenPublicKeyString)) return { error: "Invalid collection token address" };
    if (!PublicKey.isOnCurve(candyMachinePublicKeyString)) return { error: "Invalid candy machine address" };

    return {
      collectionTokenPublicKey: new PublicKey(collectionTokenPublicKeyString),
      candyMachinePublicKey: new PublicKey(candyMachinePublicKeyString),
    };
  };

  const setCollection = () => {
    const userPubKey = wallet!.publicKey;

    setSettingCollection(true);

    (async () => {
      const inputs = await getAndValidateInput();

      if (!inputs.collectionTokenPublicKey) return;
      if (!inputs.candyMachinePublicKey) return;

      const [editionPDA, metadataPDA, collectionPDA] = await Promise.all([
        getMetadataPDA(inputs.collectionTokenPublicKey),
        getEditionPDA(inputs.collectionTokenPublicKey),
        getCollectionPDA(inputs.candyMachinePublicKey),
      ]);

      const collectionAuthorityPDA = await getCollectionAuthorityRecordPDA(inputs.candyMachinePublicKey, collectionPDA[0]);

      const [metadata, edition] = await Promise.all([
        Metadata.fromAccountAddress(connection, metadataPDA[0]),
        Edition.fromAccountAddress(connection, editionPDA[0]),
      ]);
      console.debug("Metadata:", metadata);
      console.debug("Edition:", edition);

      const anchorProgram = await loadCandyProgramV2(wallet as Wallet, connection);
      const instruction = anchorProgram!.methods.setCollection().accounts({
        candyMachine: inputs.candyMachinePublicKey,
        authority: userPubKey,
        collectionPda: collectionPDA[0],
        payer: userPubKey,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
        metadata: metadataPDA[0],
        mint: inputs.collectionTokenPublicKey,
        edition: editionPDA[0],
        collectionAuthorityRecord: collectionAuthorityPDA[0],
        tokenMetadataProgram: METADATA_PROGRAM_ADDRESS,
      });

      const recentBlockHash = await connection.getLatestBlockhash();
      const transaction = await instruction.transaction();
      transaction.recentBlockhash = recentBlockHash.blockhash;
      transaction.feePayer = userPubKey;

      const signedTransaction = await wallet!.signTransaction(transaction);
      await connection.sendRawTransaction(signedTransaction.serialize());
    })().finally(() => setSettingCollection(false));
  };

  useEffect(() => {
    const ele = document.getElementById("collection-token-address") as HTMLInputElement;
    if (!ele || !externalCollectionTokenPublicKey) return;

    ele.value = externalCollectionTokenPublicKey.toBase58();
  }, [externalCollectionTokenPublicKey]);

  return (
    <div id={id}>
      <section className="text-3xl pb-8">Step 2: Set Collection</section>
      <article className="flex flex-row gap-12">
        <article className="flex flex-col gap-4 w-96 flex-shrink-0">
          <div className="form-control w-full">
            <div className="form-control w-full">
              <label className="label label-text">Collection Token Address</label>
              <input
                id="collection-token-address"
                disabled={settingCollection}
                type="text"
                placeholder="The token that contains your collection's metadata"
                className="input input-bordered w-full max-w-md"
              />
            </div>

            <label className="label label-text">Candy Machine Address</label>
            <input
              id="candy-machine-address"
              disabled={settingCollection}
              type="text"
              placeholder="The address to your Candy Machine V2"
              className="input input-bordered w-full max-w-md"
            />
          </div>

          <button className={`btn ${settingCollection ? "loading" : ""} mt-4 px-8 w-fit`} disabled={settingCollection || !wallet} onClick={setCollection}>
            {settingCollection ? "Executing..." : "Execute"}
          </button>
        </article>

        {!settingCollection && (
          <>
            <div className="divider divider-horizontal" />
            <aside>
              <div className="grid grid-rows-[repeat(min-content,4)] grid-cols-[min-content_auto] gap-x-2 gap-y-1 items-center whitespace-nowrap">
                <header className="col-span-2 py-2 bg-zinc-400 text-center">Collection Metadata Info</header>
                {[
                  // ["Name", collectionMetadata?.data.name],
                  // ["Symbol", collectionMetadata?.data.symbol],
                  // ["Update Authority", collectionMetadata?.updateAuthority.toBase58()],
                  // ["Master Edition", collectionEdition?.key === Key.MasterEditionV1 ? "V1" : collectionEdition?.key === Key.MasterEditionV2 ? "V1" : "N/A"],
                ].map(([field, value], idx) => (
                  <>
                    <section key={"header-" + idx} className="font-bold text-right leading-none pl-4">
                      {field}
                    </section>
                    <article key={"value-" + idx} className="pr-4 overflow-hidden overflow-ellipsis">
                      {value}
                    </article>
                  </>
                ))}
              </div>

              <div className="divider" />
              <ul className="steps steps-vertical">
                <li className="step step-neutral">
                  Getting Collection Token Metadata & Edition
                  <ul className="list-disc"></ul>
                </li>

                <li className="step step-neutral">AAA</li>
                <li className="step step-neutral">AAA</li>
              </ul>
            </aside>
          </>
        )}
      </article>
    </div>
  );
}
