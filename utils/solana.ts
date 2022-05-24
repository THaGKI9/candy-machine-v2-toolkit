import { Cluster, Connection, PublicKey, PublicKeyInitData, TransactionSignature } from "@solana/web3.js";
import { isString, sleep } from "./misc";

export function shortenAddress(publicKey: string): string {
  return publicKey.substring(0, 4) + "..." + publicKey.substring(publicKey.length - 4);
}

export function isValidPublicKey(publicKeyData: PublicKeyInitData): boolean {
  try {
    return PublicKey.isOnCurve(publicKeyData);
  } catch {
    return false;
  }
}

export function getBrowserLinkByAddress(address: string, cluster: Cluster): string {
  if (cluster === "mainnet-beta") return "https://explorer.solana.com/address/" + address;

  return `https://explorer.solana.com/address/${address}?cluster=${cluster}`;
}

export function getBrowserLinkByTxId(txId: string, cluster: Cluster): string {
  if (cluster === "mainnet-beta") return "https://explorer.solana.com/tx/" + txId;

  return `https://explorer.solana.com/tx/${txId}?cluster=${cluster}`;
}

export const waitForTransactionConfirmation = async (txId: TransactionSignature, connection: Connection, timeout: number = 2 * 60 * 1000) => {
  let done = false;
  let pollInterval = 3000;

  await Promise.race([
    (async () => {
      await sleep(timeout);
      done = true;
      throw new Error("Timeout exceeded");
    })(),
    (async () => {
      while (!done) {
        const status = await connection.getSignatureStatus(txId);
        if (!status.value) {
          await sleep(pollInterval);
          console.debug(`Transaction ${txId} is not seen yet`);
          continue;
        }

        console.debug(`Transaction ${txId}`, status.value);
        if (status.value.err) {
          if (isString(status.value.err)) throw new Error(status.value.err as string);

          const instructionError = (status.value.err as any).InstructionError as [number, { Custom: number }] | undefined;
          if (instructionError) {
            throw new Error(`Instruction ${instructionError[0]} throws custom error ${instructionError[1].Custom}`);
          }

          throw new Error(JSON.stringify(status.value.err));
        }

        if (status.value.confirmationStatus === "finalized") return;
        await sleep(pollInterval);
      }
    })(),
  ]);
};
