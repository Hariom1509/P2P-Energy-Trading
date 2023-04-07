const fs = require('fs');
const path = require('path');
const solc = require('solc');
const Web3 = require('web3');

const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = 'analyst perfect crunch draft error soft rule toilet secret rib desk vapor'
const providerOrUrl = 'https://polygon-mumbai.g.alchemy.com/v2/O0NoeH1LAg3fNJKYjtNoDAHVW1QsAmWk'

const provider = new HDWalletProvider({ mnemonic, providerOrUrl });
const web3 = new Web3(provider);

//console.log(web3);
	
const ABI = [
    {
      "type": "event",
      "name": "FCalled",
      "inputs": [
        {
          "type": "tuple[]",
          "name": "_a",
          "components": [
            {
              "type": "bytes32",
              "name": "id",
              "internalType": "bytes32"
            },
            {
              "type": "string",
              "name": "area",
              "internalType": "string"
            },
            {
              "type": "uint256",
              "name": "kwh",
              "internalType": "uint256"
            },
            {
              "type": "uint256",
              "name": "price",
              "internalType": "uint256"
            },
            {
              "type": "uint256",
              "name": "time",
              "internalType": "uint256"
            }
          ],
          "indexed": false,
          "internalType": "struct EnergyTrading.MyStruct[]"
        }
      ],
      "outputs": [],
      "anonymous": false
    },
    {
      "type": "function",
      "name": "addBalance",
      "inputs": [
        {
          "type": "string",
          "name": "id",
          "internalType": "string"
        },
        {
          "type": "int256",
          "name": "balance",
          "internalType": "int256"
        }
      ],
      "outputs": [
        {
          "type": "int256",
          "name": "",
          "internalType": "int256"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "addOrder",
      "inputs": [
        {
          "type": "string",
          "name": "pid",
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "cid",
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "area",
          "internalType": "string"
        },
        {
          "type": "uint256",
          "name": "kwh",
          "internalType": "uint256"
        },
        {
          "type": "uint256",
          "name": "price",
          "internalType": "uint256"
        },
        {
          "type": "uint256",
          "name": "cbal",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "type": "bytes32",
          "name": "",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "addUser",
      "inputs": [
        {
          "type": "string",
          "name": "id",
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "area",
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "typ",
          "internalType": "string"
        },
        {
          "type": "int256",
          "name": "balance",
          "internalType": "int256"
        }
      ],
      "outputs": [
        {
          "type": "bytes32",
          "name": "",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "allOrders",
      "inputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "type": "bytes32",
          "name": "pid",
          "internalType": "bytes32"
        },
        {
          "type": "bytes32",
          "name": "cid",
          "internalType": "bytes32"
        },
        {
          "type": "string",
          "name": "area",
          "internalType": "string"
        },
        {
          "type": "uint256",
          "name": "kwh",
          "internalType": "uint256"
        },
        {
          "type": "uint256",
          "name": "price",
          "internalType": "uint256"
        },
        {
          "type": "uint256",
          "name": "cbal",
          "internalType": "uint256"
        },
        {
          "type": "uint256",
          "name": "time",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "allUsers",
      "inputs": [
        {
          "type": "uint256",
          "name": "",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "type": "bytes32",
          "name": "id",
          "internalType": "bytes32"
        },
        {
          "type": "string",
          "name": "area",
          "internalType": "string"
        },
        {
          "type": "string",
          "name": "typ",
          "internalType": "string"
        },
        {
          "type": "int256",
          "name": "balance",
          "internalType": "int256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "viewBalance",
      "inputs": [
        {
          "type": "string",
          "name": "id",
          "internalType": "string"
        }
      ],
      "outputs": [
        {
          "type": "int256",
          "name": "",
          "internalType": "int256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "viewCustOrder",
      "inputs": [
        {
          "type": "string",
          "name": "id",
          "internalType": "string"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "viewProsOrder",
      "inputs": [
        {
          "type": "string",
          "name": "id",
          "internalType": "string"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    }
  ]

const mainAccount = '0x595f4030575aCCd032dAD62B9838911917a5D5fd'; //Ganache Account
const ADDRESS = '0xaFfBBcd360bFC60b7184365Ce879c66Cda026E5A'; //Contract Address

// web3.eth.getAccounts().then((accounts) => {
//   // console.log("Accounts:", accounts);

//   mainAccount = accounts[0];

//   console.log("Default Account:", mainAccount);
// });

//const contract = new web3.eth.Contract(ABI);

// web3.eth.getAccounts().then((accounts) => {
//     // console.log("Accounts:", accounts);
  
//     mainAccount = accounts[0];
  
//     console.log("Default Account:", mainAccount);
//     contract
//         .deploy({ data: bytecode })
//         .send({ from: mainAccount, gas: 4700000 })
//         .on("receipt", (receipt) => {
  
//             console.log("Contract Address:", receipt.contractAddress);
//             ADDRESS = receipt.contractAddress;
//         })
// });

async function Add_User(id, area, typ, balance, abi, contractAddress){
    const contractInstance = new web3.eth.Contract(abi, contractAddress);
    const res = await contractInstance.methods.addUser(id, area, typ, balance).send({from: mainAccount, gasPrice: "0xFFFF", gasLimit: "0xFFFFF"});
    return res
}

async function Add_Balance(id, balance, abi, contractAddress){
    const contractInstance = new web3.eth.Contract(abi, contractAddress);
    const res = await contractInstance.methods.addBalance(id, balance).send({from: mainAccount, gasPrice: "0xFFFF", gasLimit: "0xFFFFF"});
    return res
}

async function View_Balance(id, abi, contractAddress){
    const contractInstance = new web3.eth.Contract(abi, contractAddress);
    const res = await contractInstance.methods.viewBalance(id).call();
    console.log("The balance of the user is : "+ res);
    return res
}

async function test(){
    // const res1 = await Add_User("Hariom1509", "390018", "consumer", "100", ABI, ADDRESS);
    // const res2 = await Add_Balance("Hariom1509", "159", ABI, ADDRESS);
    const res3 = await View_Balance("hariom", ABI, ADDRESS);
    // console.log(res1);
    // console.log(res2);
    console.log(res3);
}

test();