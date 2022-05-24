import { PublicKey } from "@solana/web3.js";
import { PROGRAM_ADDRESS } from "@metaplex-foundation/mpl-token-metadata";

export const CANDY_MACHINE_PROGRAM_V2_ID = new PublicKey("cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ");
export const METADATA_PROGRAM_ADDRESS = new PublicKey(PROGRAM_ADDRESS);

const METADATA_PREFIX = Buffer.from("metadata");
const EDITION_PREFIX = Buffer.from("edition");
const COLLECTION_PREFIX = Buffer.from("collection");
const COLLECTION_AUTHORITY_PREFIX = Buffer.from("collection_authority");

export async function getMetadataPDA(token: PublicKey) {
  return await PublicKey.findProgramAddress([METADATA_PREFIX, METADATA_PROGRAM_ADDRESS.toBuffer(), token.toBuffer()], METADATA_PROGRAM_ADDRESS);
}

export async function getEditionPDA(token: PublicKey) {
  return await PublicKey.findProgramAddress([METADATA_PREFIX, METADATA_PROGRAM_ADDRESS.toBuffer(), token.toBuffer(), EDITION_PREFIX], METADATA_PROGRAM_ADDRESS);
}

export async function getCollectionPDA(candyMachine: PublicKey) {
  return await PublicKey.findProgramAddress([COLLECTION_PREFIX, candyMachine.toBuffer()], CANDY_MACHINE_PROGRAM_V2_ID);
}

export async function getCollectionAuthorityRecordPDA(token: PublicKey, newAuthority: PublicKey) {
  return await PublicKey.findProgramAddress(
    [METADATA_PREFIX, METADATA_PROGRAM_ADDRESS.toBuffer(), token.toBuffer(), COLLECTION_AUTHORITY_PREFIX, newAuthority.toBuffer()],
    METADATA_PROGRAM_ADDRESS,
  );
}
