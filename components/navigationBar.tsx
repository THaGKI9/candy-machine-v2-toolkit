import { SettingModal } from "./settingModal";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useContext, useMemo, useState } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { AppContext } from "./appContext";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";

export const NavigationBar = () => {
  const wallet = useAnchorWallet();
  const { notify, settings, setSettings } = useContext(AppContext);
  const connection = useMemo(() => new Connection(settings.rpcUrl), [settings]);
  const [requesting, setRequesting] = useState(false);

  const requestAirdrop = () => {
    setRequesting(true);

    (async () => {
      const maximum = {
        "mainnet-beta": 0,
        devnet: 1,
        testnet: 1,
      }[settings.cluster] as number;

      const notification = notify!.notification({
        message: `Requesting ${maximum} SOL airdrop...`,
        type: "pending",
      });

      await connection.requestAirdrop(wallet!.publicKey, maximum * LAMPORTS_PER_SOL);

      notification.update({
        message: `Successfully requested ${maximum} SOL!`,
        type: "success",
        autoDismiss: 5000,
      });
    })().finally(() => {
      setRequesting(false);
    });
  };

  return (
    <nav className="px-8 py-2 flex flex-row flex-nowrap gap-4 w-full items-center text-slate-100 bg-slate-800">
      <div className="text-2xl">Candy Machine V2 Toolkit</div>
      <select className="ml-4 select select-ghost">
        <option>Collection</option>
      </select>

      <div className="flex-grow" />
      {wallet && settings.cluster != "mainnet-beta" && (
        <button className={`btn btn-accent ${requesting ? "loading" : ""}`} onClick={requestAirdrop} disabled={requesting}>
          {requesting ? "Requesting..." : "Request Airdrop"}
        </button>
      )}
      <SettingModal />

      <WalletMultiButton />
    </nav>
  );
};
