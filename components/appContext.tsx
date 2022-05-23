import React, { createContext, Dispatch, SetStateAction } from "react";
import { DEFAULT_SETTINGS, Settings } from "./settingModal";
import { WalletContextState } from "@solana/wallet-adapter-react";
import Notify from "bnc-notify";

export interface IAppContext {
  settings: Settings;
  setSettings: Dispatch<SetStateAction<Settings>>;
  notify?: ReturnType<typeof Notify>;
}

export const AppContext = createContext<IAppContext>({} as any);
