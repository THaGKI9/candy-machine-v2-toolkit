import React, { createContext, Dispatch, SetStateAction } from "react";
import Notify from "bnc-notify";
import { Cluster, clusterApiUrl } from "@solana/web3.js";

export interface Settings {
  cluster: Cluster;
  rpcUrl: string;
}

const DEFAULT_CLUSTER = "mainnet-beta";

export const DEFAULT_SETTINGS: Settings = {
  cluster: DEFAULT_CLUSTER,
  rpcUrl: clusterApiUrl(DEFAULT_CLUSTER),
};

export interface IAppContext {
  settings: Settings;
  setSettings: Dispatch<SetStateAction<Settings>>;
  notify?: ReturnType<typeof Notify>;
}

export const AppContext = createContext<IAppContext>({ settings: { ...DEFAULT_SETTINGS } } as any);
