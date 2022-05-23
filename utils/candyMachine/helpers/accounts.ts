import { Connection, Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import {
  A,
  AUCTION_HOUSE,
  AUCTION_HOUSE_PROGRAM_ID,
  B,
  CANDY_MACHINE,
  CANDY_MACHINE_PROGRAM_ID,
  CANDY_MACHINE_PROGRAM_V2_ID,
  ESCROW,
  FAIR_LAUNCH_PROGRAM_ID,
  FEE_PAYER,
  SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
  TOKEN_ENTANGLEMENT_PROGRAM_ID,
  TOKEN_ENTANGLER,
  TOKEN_METADATA_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  TREASURY,
} from "./constants";
import * as anchor from "@project-serum/anchor";
import { AnchorProvider, Wallet, web3 } from "@project-serum/anchor";
import { createCandyMachineV2Account } from "./instructions";

export interface WhitelistMintMode {
  neverBurn: undefined | boolean;
  burnEveryTime: undefined | boolean;
}

export interface CandyMachineData {
  itemsAvailable: anchor.BN;
  uuid: null | string;
  symbol: string;
  sellerFeeBasisPoints: number;
  isMutable: boolean;
  maxSupply: anchor.BN;
  price: anchor.BN;
  retainAuthority: boolean;
  gatekeeper: null | {
    expireOnUse: boolean;
    gatekeeperNetwork: web3.PublicKey;
  };
  goLiveDate: null | anchor.BN;
  endSettings: null | [number, anchor.BN];
  whitelistMintSettings: null | {
    mode: WhitelistMintMode;
    mint: PublicKey;
    presale: boolean;
    discountPrice: null | anchor.BN;
  };
  hiddenSettings: null | {
    name: string;
    uri: string;
    hash: Uint8Array;
  };
  creators: {
    address: PublicKey;
    verified: boolean;
    share: number;
  }[];
}

export const createCandyMachineV2 = async function (
  anchorProgram: anchor.Program,
  payerWallet: Keypair,
  treasuryWallet: PublicKey,
  splToken: PublicKey,
  candyData: CandyMachineData,
) {
  const candyAccount = Keypair.generate();
  candyData.uuid = uuidFromConfigPubkey(candyAccount.publicKey);

  if (!candyData.symbol) {
    throw new Error("Invalid config, there must be a symbol.");
  }

  if (!candyData.creators || candyData.creators.length === 0) {
    throw new Error("Invalid config, there must be at least one creator.");
  }

  const totalShare = (candyData.creators || []).reduce((acc, curr) => acc + curr.share, 0);

  if (totalShare !== 100) {
    throw new Error("Invalid config, creators shares must add up to 100");
  }

  const remainingAccounts = [];
  if (splToken) {
    remainingAccounts.push({
      pubkey: splToken,
      isSigner: false,
      isWritable: false,
    });
  }
  return {
    candyMachine: candyAccount.publicKey,
    uuid: candyData.uuid,
    txLink: await anchorProgram.rpc.initializeCandyMachine(candyData, {
      accounts: {
        candyMachine: candyAccount.publicKey,
        wallet: treasuryWallet,
        authority: payerWallet.publicKey,
        payer: payerWallet.publicKey,
        systemProgram: SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      },
      signers: [payerWallet, candyAccount],
      remainingAccounts: remainingAccounts.length > 0 ? remainingAccounts : undefined,
      instructions: [await createCandyMachineV2Account(anchorProgram, candyData, payerWallet.publicKey, candyAccount.publicKey)],
    }),
  };
};

export function uuidFromConfigPubkey(configAccount: PublicKey) {
  return configAccount.toBase58().slice(0, 6);
}

export const getTokenWallet = async function (wallet: PublicKey, mint: PublicKey) {
  return (await PublicKey.findProgramAddress([wallet.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()], SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID))[0];
};

export const getCandyMachineAddress = async (config: PublicKey, uuid: string): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress([Buffer.from(CANDY_MACHINE), config.toBuffer(), Buffer.from(uuid)], CANDY_MACHINE_PROGRAM_ID);
};

export const deriveCandyMachineV2ProgramAddress = async (candyMachineId: PublicKey): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress([Buffer.from(CANDY_MACHINE), candyMachineId.toBuffer()], CANDY_MACHINE_PROGRAM_V2_ID);
};

export const getTokenMint = async (authority: PublicKey, uuid: string): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress([Buffer.from("fair_launch"), authority.toBuffer(), Buffer.from("mint"), Buffer.from(uuid)], FAIR_LAUNCH_PROGRAM_ID);
};

export const getFairLaunch = async (tokenMint: PublicKey): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress([Buffer.from("fair_launch"), tokenMint.toBuffer()], FAIR_LAUNCH_PROGRAM_ID);
};

export const getCandyMachineCreator = async (candyMachine: PublicKey): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress([Buffer.from("candy_machine"), candyMachine.toBuffer()], CANDY_MACHINE_PROGRAM_V2_ID);
};

export const getFairLaunchTicket = async (tokenMint: PublicKey, buyer: PublicKey): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress([Buffer.from("fair_launch"), tokenMint.toBuffer(), buyer.toBuffer()], FAIR_LAUNCH_PROGRAM_ID);
};

export const getFairLaunchLotteryBitmap = async (tokenMint: PublicKey): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress([Buffer.from("fair_launch"), tokenMint.toBuffer(), Buffer.from("lottery")], FAIR_LAUNCH_PROGRAM_ID);
};

export const getFairLaunchTicketSeqLookup = async (tokenMint: PublicKey, seq: anchor.BN): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress([Buffer.from("fair_launch"), tokenMint.toBuffer(), seq.toBuffer("le", 8)], FAIR_LAUNCH_PROGRAM_ID);
};

export const getAtaForMint = async (mint: PublicKey, buyer: PublicKey): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress([buyer.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()], SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID);
};

export const getParticipationMint = async (authority: PublicKey, uuid: string): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress(
    [Buffer.from("fair_launch"), authority.toBuffer(), Buffer.from("mint"), Buffer.from(uuid), Buffer.from("participation")],
    FAIR_LAUNCH_PROGRAM_ID,
  );
};

export const getParticipationToken = async (authority: PublicKey, uuid: string): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress(
    [Buffer.from("fair_launch"), authority.toBuffer(), Buffer.from("mint"), Buffer.from(uuid), Buffer.from("participation"), Buffer.from("account")],
    FAIR_LAUNCH_PROGRAM_ID,
  );
};

export const getTreasury = async (tokenMint: PublicKey): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress([Buffer.from("fair_launch"), tokenMint.toBuffer(), Buffer.from("treasury")], FAIR_LAUNCH_PROGRAM_ID);
};

export const getMetadata = async (mint: PublicKey): Promise<PublicKey> => {
  return (await PublicKey.findProgramAddress([Buffer.from("metadata"), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer()], TOKEN_METADATA_PROGRAM_ID))[0];
};

export const getCollectionPDA = async (candyMachineAddress: PublicKey): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress([Buffer.from("collection"), candyMachineAddress.toBuffer()], CANDY_MACHINE_PROGRAM_V2_ID);
};

export const getCollectionAuthorityRecordPDA = async (mint: PublicKey, newAuthority: PublicKey): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress(
    [Buffer.from("metadata"), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer(), Buffer.from("collection_authority"), newAuthority.toBuffer()],
    TOKEN_METADATA_PROGRAM_ID,
  );
};

export const getMasterEdition = async (mint: PublicKey): Promise<PublicKey> => {
  return (
    await PublicKey.findProgramAddress(
      [Buffer.from("metadata"), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer(), Buffer.from("edition")],
      TOKEN_METADATA_PROGRAM_ID,
    )
  )[0];
};

export const getEditionMarkPda = async (mint: PublicKey, edition: number): Promise<PublicKey> => {
  const editionNumber = Math.floor(edition / 248);
  return (
    await PublicKey.findProgramAddress(
      [Buffer.from("metadata"), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer(), Buffer.from("edition"), Buffer.from(editionNumber.toString())],
      TOKEN_METADATA_PROGRAM_ID,
    )
  )[0];
};

export const getAuctionHouse = async (creator: PublicKey, treasuryMint: PublicKey): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress([Buffer.from(AUCTION_HOUSE), creator.toBuffer(), treasuryMint.toBuffer()], AUCTION_HOUSE_PROGRAM_ID);
};

export const getAuctionHouseProgramAsSigner = async (): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress([Buffer.from(AUCTION_HOUSE), Buffer.from("signer")], AUCTION_HOUSE_PROGRAM_ID);
};

export const getAuctionHouseFeeAcct = async (auctionHouse: PublicKey): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress([Buffer.from(AUCTION_HOUSE), auctionHouse.toBuffer(), Buffer.from(FEE_PAYER)], AUCTION_HOUSE_PROGRAM_ID);
};

export const getAuctionHouseTreasuryAcct = async (auctionHouse: PublicKey): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress([Buffer.from(AUCTION_HOUSE), auctionHouse.toBuffer(), Buffer.from(TREASURY)], AUCTION_HOUSE_PROGRAM_ID);
};

export const getAuctionHouseBuyerEscrow = async (auctionHouse: PublicKey, wallet: PublicKey): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress([Buffer.from(AUCTION_HOUSE), auctionHouse.toBuffer(), wallet.toBuffer()], AUCTION_HOUSE_PROGRAM_ID);
};

export const getAuctionHouseTradeState = async (
  auctionHouse: PublicKey,
  wallet: PublicKey,
  tokenAccount: PublicKey,
  treasuryMint: PublicKey,
  tokenMint: PublicKey,
  tokenSize: anchor.BN,
  buyPrice: anchor.BN,
): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress(
    [
      Buffer.from(AUCTION_HOUSE),
      wallet.toBuffer(),
      auctionHouse.toBuffer(),
      tokenAccount.toBuffer(),
      treasuryMint.toBuffer(),
      tokenMint.toBuffer(),
      buyPrice.toBuffer("le", 8),
      tokenSize.toBuffer("le", 8),
    ],
    AUCTION_HOUSE_PROGRAM_ID,
  );
};

export const getTokenEntanglement = async (mintA: PublicKey, mintB: PublicKey): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress([Buffer.from(TOKEN_ENTANGLER), mintA.toBuffer(), mintB.toBuffer()], TOKEN_ENTANGLEMENT_PROGRAM_ID);
};

export const getTokenEntanglementEscrows = async (mintA: PublicKey, mintB: PublicKey): Promise<[PublicKey, number, PublicKey, number]> => {
  return [
    ...(await PublicKey.findProgramAddress(
      [Buffer.from(TOKEN_ENTANGLER), mintA.toBuffer(), mintB.toBuffer(), Buffer.from(ESCROW), Buffer.from(A)],
      TOKEN_ENTANGLEMENT_PROGRAM_ID,
    )),
    ...(await PublicKey.findProgramAddress(
      [Buffer.from(TOKEN_ENTANGLER), mintA.toBuffer(), mintB.toBuffer(), Buffer.from(ESCROW), Buffer.from(B)],
      TOKEN_ENTANGLEMENT_PROGRAM_ID,
    )),
  ];
};

export async function loadCandyProgramV2(wallet: Wallet, connection: Connection) {
  const provider = new AnchorProvider(connection, wallet, { preflightCommitment: "recent" });
  const idl = await anchor.Program.fetchIdl(CANDY_MACHINE_PROGRAM_V2_ID, provider);
  if (!idl) return;

  const program = new anchor.Program(idl, CANDY_MACHINE_PROGRAM_V2_ID, provider);
  return program;
}

function unsafeAccount(account: anchor.web3.AccountInfo<[string, string]>) {
  return {
    // TODO: possible delay parsing could be added here
    data: Buffer.from(account.data[0], "base64"),
    executable: account.executable,
    lamports: account.lamports,
    // TODO: maybe we can do it in lazy way? or just use string
    owner: account.owner,
  } as anchor.web3.AccountInfo<Buffer>;
}

function unsafeResAccounts(
  data: Array<{
    account: anchor.web3.AccountInfo<[string, string]>;
    pubkey: string;
  }>,
) {
  return data.map((item) => ({
    account: unsafeAccount(item.account),
    pubkey: item.pubkey,
  }));
}
