import "@solana/wallet-adapter-react-ui/styles.css";

import { SettingModal } from "./SettingModal";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ChangeEventHandler, useContext, useEffect, useMemo, useState } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { AppContext } from "./AppContext";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { FEATURES } from "./constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToolbox } from "@fortawesome/free-solid-svg-icons";

export const NavigationBar = () => {
  const wallet = useAnchorWallet();
  const { notify, settings, setSettings } = useContext(AppContext);
  const connection = useMemo(() => new Connection(settings.rpcUrl), [settings]);
  const [requesting, setRequesting] = useState(false);

  const onToolkitChanged: ChangeEventHandler<HTMLSelectElement> = (e) => {
    window.location.pathname = e.target.value;
  };

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

  useEffect(() => {
    (document.getElementById("current-page") as HTMLSelectElement).value = window.location.pathname;
  }, []);

  return (
    <nav className="px-8 py-2 flex flex-row flex-nowrap gap-4 w-full items-center text-slate-100 bg-slate-800">
      <h1 className="text-2xl">
        <FontAwesomeIcon className="pr-[1ch]" icon={faToolbox} />
        Candy Machine V2 Toolkit
      </h1>
      <select id="current-page" className="ml-4 select select-ghost" onChange={onToolkitChanged}>
        <option value=".">Home</option>
        {FEATURES.map((s, idx) => (
          <option key={idx} value={s.link}>
            {s.name}
          </option>
        ))}
      </select>

      <div className="flex-grow" />
      {wallet && settings.cluster != "mainnet-beta" && (
        <button className={`btn glass ${requesting ? "btn-disabled loading" : ""}`} onClick={requestAirdrop} disabled={requesting}>
          {requesting ? "Requesting..." : "Request Airdrop"}
        </button>
      )}
      <SettingModal />

      <WalletMultiButton />
    </nav>
  );
};
