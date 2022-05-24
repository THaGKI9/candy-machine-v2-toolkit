import type { NextPage } from "next";
import Head from "next/head";
import { useContext, useMemo, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import Layout from "../components/Layout";
import { AppContext } from "../components/AppContext";
import SetCollectionLayout from "../components/SetCollection/SetCollectionLayout";
import CreateCollectionSection from "../components/SetCollection/CreateCollectionSection";
import SetCollectionSection from "../components/SetCollection/SetCollectionSection";

const SetCollectionPage: NextPage = () => {
  const { settings } = useContext(AppContext);
  const connection = useMemo(() => new Connection(settings.rpcUrl), [settings]);

  const [collectionTokenPublicKey, setCollectionTokenPublicKey] = useState<PublicKey>();

  const onCollectionTokenCreated = (publicKey: PublicKey) => {
    document.getElementById("#step-2-create-collection")?.scrollIntoView();
    setCollectionTokenPublicKey(publicKey);
  };

  return (
    <>
      <Head>
        <title>Set Collection - Candy Machine V2 Toolkit</title>
      </Head>
      <Layout>
        <SetCollectionLayout
          id="step-1-create-collection"
          title="Step 1. Create collection metadata NFT"
          description={
            <>
              <div>Before setting a collection for a candy machine, you need to mint an NFT which will be used as the candy machine&apos;s collection.</div>
              <div>Skip this step if you already have one.</div>
            </>
          }
        >
          <CreateCollectionSection connection={connection} onCreated={onCollectionTokenCreated} />
        </SetCollectionLayout>
        <div className="divider" />
        <SetCollectionLayout
          id="step-2-create-collection"
          title="Step 2: Set Collection"
          description={
            <>
              <div>Add a collection to the candy machine. You need to be the authority of both collection token and candy machine.</div>
              <div>
                This only works for tokens that are not yet minted. For minted tokens, <span className="italic font-semibold">Set And Verify Collection</span>{" "}
                should be used.
              </div>
            </>
          }
        >
          <SetCollectionSection connection={connection} collectionTokenPublicKey={collectionTokenPublicKey} />
        </SetCollectionLayout>
      </Layout>
    </>
  );
};

export default SetCollectionPage;
