import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { GlowWalletAdapter } from "@solana/wallet-adapter-glow";
import { SlopeWalletAdapter } from "@solana/wallet-adapter-slope";
import { useEffect, useMemo, useState } from "react";
import { PhantomWalletAdapter, TorusWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { AppContext } from "../components/appContext";
import { DEFAULT_SETTINGS } from "../components/settingModal";
import Notify from "bnc-notify";
import useLocalStorageState from "use-local-storage-state";

function MyApp({ Component, pageProps }: AppProps) {
  const [notify, setNotify] = useState<ReturnType<typeof Notify>>();
  const [settings, setSettings] = useLocalStorageState("appSettings", { ssr: true, defaultValue: DEFAULT_SETTINGS });
  const wallets = useMemo(() => [new PhantomWalletAdapter(), new GlowWalletAdapter(), new SlopeWalletAdapter(), new TorusWalletAdapter()], []);
  const endpoint = useMemo(() => clusterApiUrl("mainnet-beta"), []);

  useEffect(() => {
    setNotify(
      Notify({
        desktopPosition: "topLeft",
      }),
    );
  }, []);

  return (
    <AppContext.Provider value={{ settings, setSettings, notify }}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <Component {...pageProps} />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </AppContext.Provider>
  );
}

export default MyApp;
