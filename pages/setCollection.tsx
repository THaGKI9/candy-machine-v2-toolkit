import "@solana/wallet-adapter-react-ui/styles.css";

import type { NextPage } from "next";
import { Layout } from "../components/layout";
import { useContext, useMemo, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { AppContext } from "../components/appContext";
import Head from "next/head";
import CreateCollectionSection from "../components/setCollection/createCollectionSection";
import SetCollectionSection from "../components/setCollection/setCollectionSection";

const SetCollectionPage: NextPage = () => {
  const { settings, notify } = useContext(AppContext);
  const connection = useMemo(() => new Connection(settings.rpcUrl), [settings]);

  const [collectionTokenPublicKey, setCollectionTokenPublicKey] = useState<PublicKey>();

  const onCollectionTokenCreated = (publicKey: PublicKey) => {
    window.location.hash = "#step-2-create-collection";
    setCollectionTokenPublicKey(publicKey);
  };

  return (
    <>
      <Head>
        <title>Set Collection Metadata - Candy Machine V2 Toolkit</title>
      </Head>
      <Layout>
        <main className="flex-grow m-8">
          <CreateCollectionSection id="step-1-create-collection" connection={connection} onCreated={onCollectionTokenCreated} />
          <div className="divider" />
          <SetCollectionSection id="step-2-create-collection" connection={connection} collectionTokenPublicKey={collectionTokenPublicKey} />
        </main>
      </Layout>
    </>
  );
};

export default SetCollectionPage;
