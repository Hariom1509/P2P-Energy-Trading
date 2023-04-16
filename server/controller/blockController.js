const fs = require('fs');
const path = require('path');
const solc = require('solc');
const Web3 = require('web3');

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
          "type": "string",
          "name": "hash",
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
          "type": "string",
          "name": "hash",
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

// IF USING ganache-cli
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

// IF USING ropsten deployed testnetwork
// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const mnemonic = 'analyst perfect crunch draft error soft rule toilet secret rib desk vapor'
// const providerOrUrl = 'https://ropsten.infura.io/v3/9c9ce33525ce49809af51a4b21ba1dfd'

// const provider = new HDWalletProvider({ mnemonic, providerOrUrl });
// const web3 = new Web3(provider);

// COPY PASTE HERE
const mainAccount = '0x733c3dbB78C6d6128c55af4a980B33c71310cEb4';
const ADDRESS = '0xE3B16f562f2E980023f372661CD78572F5D948B6';

exports.addAllUsers = async(req, res) => {
    const contractInstance = new web3.eth.Contract(ABI, ADDRESS);

    console.log(req.body.id, req.body.area, req.body.typ, req.body.hash, req.body.balance);

    await contractInstance.methods
        .addUser(req.body.id, req.body.area, req.body.typ, req.body.hash, req.body.balance)
        .send(
            {from: mainAccount, gasPrice: "0xFFFF", gasLimit: "0xFFFFF"}
        ).then( flag => {
            if(flag){
                console.log("User Added Successfully!");
                return res.status(200).json({ document: "User Added Successfully!" })
            } else {
                console.log("User already exists!");
                return res.status(400).json({ document: "User already exists." });
            }
        }).catch((err) => {
            console.log(err);
        });
}

exports.addAllBalance = async(req, res) => {
    const contractInstance = new web3.eth.Contract(ABI, ADDRESS);

    console.log(req.body.id, req.body.balance);
    await contractInstance.methods
        .addBalance(req.body.id, req.body.balance)
        .send(
            {from: mainAccount, gasPrice: "0xFFFF", gasLimit: "0xFFFFF"}
        ).then( () => {
            console.log("Balance Added Successfully");
            return res.status(200).json({ document: "Balance Added Successfully!" })
        }).catch((err) => {
            console.log(err);
        });
}

exports.viewAllBalance = async(req, res) => {
    const contractInstance = new web3.eth.Contract(ABI, ADDRESS);

    console.log(req.body.id);
    await contractInstance.methods
        .viewBalance(req.body.id)
        .call()
        .then( bal => {
            if(bal == 65536){
                console.log("User doesn't exist on blockchain!");
                return res.status(400).json({document: "User not on blockchain"});
            } else {
                console.log("Balance Retrieved");
                return res.status(200).json({document: bal});
            }
        }).catch((err) => {
            console.log(err);
        });
}

exports.addAllOrders = async(req, res) => {
    const contractInstance = new web3.eth.Contract(ABI, ADDRESS);

    console.log(req.body.pid, req.body.cid, req.body.area, req.body.kwh, req.body.price, req.body.cbal);
    await contractInstance.methods
        .addOrder(req.body.pid, req.body.cid, req.body.area, req.body.kwh, req.body.price, req.body.cbal)
        .send(
            {from: mainAccount, gasPrice: "0xFFFF", gasLimit: "0xFFFFF"}
        ).then(flag => {
            if(flag<0){
                console.log("Insufficient Consumer balance to proceed");
                return res.status(400).json({document: "Insufficient Consumer balance to proceed"});
            } else {
                console.log("Order completed successfully!");
                return res.status(200).json({document: "Order Successful"});
            }
        }).catch((err) => {
            console.log(err);
        });
}

exports.viewPOrder = async(req, res) => {
    const contractInstance = new web3.eth.Contract(ABI, ADDRESS);

    console.log(req.body.pid);
    await contractInstance.methods
        .viewProsOrder(req.body.pid)
        .send(
            {from: mainAccount, gasPrice: "0xFFFF", gasLimit: "0xFFFFF"}
        ).then(result => {
            if(result.events.FCalled.returnValues['_a'][0] === undefined){
                console.log("No Prosumer transactions yet");
                return res.status(400).json({document: "No Prosumer transactions yet"});
            } else {
                console.log("Transactions successfully retrieved");
                return res.status(200).json({document: result.events.FCalled.returnValues['_a']});
            }
        }).catch((err) => {
            console.log(err);
        });
}

exports.viewCOrder = async(req, res) => {
    const contractInstance = new web3.eth.Contract(ABI, ADDRESS);

    console.log(req.body.pid);
    await contractInstance.methods
        .viewCustOrder(req.body.pid)
        .send(
            {from: mainAccount, gasPrice: "0xFFFF", gasLimit: "0xFFFFF"}
        ).then(result => {
            if(result.events.FCalled.returnValues['_a'][0] === undefined){
                console.log("No Consumer transactions yet");
                return res.status(400).json({document: "No Consumer transactions yet"});
            } else {
                console.log("Transactions successfully retrieved");
                return res.status(200).json({document: result.events.FCalled.returnValues['_a']});
            }
        }).catch((err) => {
            console.log(err);
        });
}