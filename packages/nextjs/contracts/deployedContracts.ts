/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  10: {
    John: {
      address: "0x29BB1313321dbA27Ad074DD6AD2943040319B439",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_contractOwner",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "confirmedBy",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bytes",
              name: "verseId",
              type: "bytes",
            },
          ],
          name: "Confirmation",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "donor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "Donation",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "signer",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "verseId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "verseNumber",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "chapterNumber",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "verseContent",
              type: "string",
            },
          ],
          name: "Verse",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256[]",
              name: "_verseNumber",
              type: "uint256[]",
            },
            {
              internalType: "uint256[]",
              name: "_chapterNumber",
              type: "uint256[]",
            },
            {
              internalType: "string[]",
              name: "_verseContent",
              type: "string[]",
            },
          ],
          name: "addBatchVerses",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_verseNumber",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_chapterNumber",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "_verseContent",
              type: "string",
            },
          ],
          name: "addVerse",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "_verseId",
              type: "bytes",
            },
            {
              internalType: "uint256",
              name: "_numericalId",
              type: "uint256",
            },
          ],
          name: "confirmVerse",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "confirmations",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "donate",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "numberOfVerses",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "verses",
          outputs: [
            {
              internalType: "uint256",
              name: "verseId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "verseNumber",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "chapterNumber",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "verseContent",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "withdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          stateMutability: "payable",
          type: "receive",
        },
      ],
      inheritedFunctions: {
        owner: "@openzeppelin/contracts/access/Ownable.sol",
        renounceOwnership: "@openzeppelin/contracts/access/Ownable.sol",
        transferOwnership: "@openzeppelin/contracts/access/Ownable.sol",
      },
    },
  },
  31337: {
    John: {
      address: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_contractOwner",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "confirmedBy",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bytes",
              name: "verseId",
              type: "bytes",
            },
          ],
          name: "Confirmation",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "donor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "Donation",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "signer",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "verseId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "verseNumber",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "chapterNumber",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "verseContent",
              type: "string",
            },
          ],
          name: "Verse",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256[]",
              name: "_verseNumber",
              type: "uint256[]",
            },
            {
              internalType: "uint256[]",
              name: "_chapterNumber",
              type: "uint256[]",
            },
            {
              internalType: "string[]",
              name: "_verseContent",
              type: "string[]",
            },
          ],
          name: "addBatchVerses",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_verseNumber",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_chapterNumber",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "_verseContent",
              type: "string",
            },
          ],
          name: "addVerse",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "_verseId",
              type: "bytes",
            },
            {
              internalType: "uint256",
              name: "_numericalId",
              type: "uint256",
            },
          ],
          name: "confirmVerse",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "confirmations",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "donate",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "numberOfVerses",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "verses",
          outputs: [
            {
              internalType: "uint256",
              name: "verseId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "verseNumber",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "chapterNumber",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "verseContent",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "withdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          stateMutability: "payable",
          type: "receive",
        },
      ],
      inheritedFunctions: {
        owner: "@openzeppelin/contracts/access/Ownable.sol",
        renounceOwnership: "@openzeppelin/contracts/access/Ownable.sol",
        transferOwnership: "@openzeppelin/contracts/access/Ownable.sol",
      },
    },
  },
  11155420: {
    John: {
      address: "0xa5BAF105bad838cf1Cd4518dc59ba51Df283aab0",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_contractOwner",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "confirmedBy",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bytes",
              name: "verseId",
              type: "bytes",
            },
          ],
          name: "Confirmation",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "donor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "Donation",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "signer",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "verseId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "verseNumber",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "chapterNumber",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "verseContent",
              type: "string",
            },
          ],
          name: "Verse",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256[]",
              name: "_verseNumber",
              type: "uint256[]",
            },
            {
              internalType: "uint256[]",
              name: "_chapterNumber",
              type: "uint256[]",
            },
            {
              internalType: "string[]",
              name: "_verseContent",
              type: "string[]",
            },
          ],
          name: "addBatchVerses",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_verseNumber",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_chapterNumber",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "_verseContent",
              type: "string",
            },
          ],
          name: "addVerse",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "_verseId",
              type: "bytes",
            },
            {
              internalType: "uint256",
              name: "_numericalId",
              type: "uint256",
            },
          ],
          name: "confirmVerse",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "confirmations",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "donate",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "numberOfVerses",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "verses",
          outputs: [
            {
              internalType: "uint256",
              name: "verseId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "verseNumber",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "chapterNumber",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "verseContent",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "withdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          stateMutability: "payable",
          type: "receive",
        },
      ],
      inheritedFunctions: {
        owner: "@openzeppelin/contracts/access/Ownable.sol",
        renounceOwnership: "@openzeppelin/contracts/access/Ownable.sol",
        transferOwnership: "@openzeppelin/contracts/access/Ownable.sol",
      },
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
