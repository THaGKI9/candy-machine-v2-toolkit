import { Connection, SendOptions, Signer, Transaction } from "@solana/web3.js";
import { AnchorWallet } from "@solana/wallet-adapter-react";

export default function BundlrProviderWrapper(signer: AnchorWallet, ...partialSigners: Signer[]) {
  return {
    async sendTransaction(tx: Transaction, conn: Connection, opts: SendOptions) {
      if (partialSigners.length) tx.partialSign(...partialSigners);
      const signedTransaction = await signer.signTransaction(tx);
      return await conn.sendRawTransaction(signedTransaction.serialize(), opts);
    },
    publicKey: signer.publicKey,
    wallet: signer,
  };
}
