import { ChangeEventHandler, createRef, MouseEventHandler, useContext } from "react";
import { Cluster, clusterApiUrl } from "@solana/web3.js";
import { AppContext } from "./appContext";

export interface Settings {
  cluster: Cluster;
  rpcUrl: string;
}

const DEFAULT_CLUSTER = "mainnet-beta";

export const DEFAULT_SETTINGS: Settings = {
  cluster: DEFAULT_CLUSTER,
  rpcUrl: clusterApiUrl(DEFAULT_CLUSTER),
};

export const SettingModal = () => {
  const { settings, setSettings } = useContext(AppContext);

  const onClusterChanged: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSettings({ ...settings, cluster: e.target.value as Cluster });
  };

  const onRpcUrlChanged: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSettings({ ...settings, rpcUrl: e.target.value });
  };

  return (
    <>
      <label htmlFor="settings-modal" className="btn modal-button">
        {
          {
            "mainnet-beta": "Mainnet Beta",
            testnet: "Testnet",
            devnet: "Devnet",
          }[settings.cluster]
        }
      </label>

      <input type="checkbox" id="settings-modal" className="modal-toggle" />
      <div className="modal text-zinc-900">
        <div className="modal-box">
          <div className="form-control">
            <label className="label">
              <span className="label-text">RPC Url</span>
            </label>
            <input onChange={onRpcUrlChanged} type="text" placeholder="https://..." className="input input-bordered w-full" value={settings.rpcUrl} />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Cluster</span>
            </label>
            <select onChange={onClusterChanged} className="w-full select select-bordered" value={settings.cluster}>
              <option value="mainnet-beta">Mainnet Beta</option>
              <option value="testnet">Testnet</option>
              <option value="devnet">Devnet</option>
            </select>
          </div>

          <div className="modal-action">
            <label htmlFor="settings-modal" className="btn btn-outline">
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
