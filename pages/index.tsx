import Head from "next/head";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import { FEATURES } from "../components/constant";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Candy Machine V2 Toolkit</title>
        <meta name="description" content="A set of tools for Candy Machine to empower Solana NFT." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="NFT, Solana, Ape, Golden, Copyright" />
      </Head>
      <Layout>
        <h1 className="text-6xl text-center">Features</h1>

        <div className="grid place-items-center">
          <div className="pt-12 w-fit px-auto grid grid-cols-[repeat(3,20rem)] gap-6">
            {FEATURES.map((s, idx) => (
              <a key={idx} className="card bg-base-100 shadow-md border-zinc-100 border" href={"." + s.link} target="_blank" rel="noreferrer">
                <div className="card-body">
                  <h2 className="card-title">{s.name}</h2>
                  <p className="text-zinc-400">{s.link}</p>
                  <p className="">{s.description}</p>
                </div>
              </a>
            ))}

            <div className="card bg-base-100 shadow-md border-zinc-100 border">
              <div className="card-body">
                <h2 className="card-title">Adding More...</h2>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
