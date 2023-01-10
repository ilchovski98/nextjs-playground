import {server} from '../config';
import CommentList from '../components/CommentList';
import {ethers} from 'ethers';
import {useState} from 'react';

export default function Home({comments}) {
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState();

  async function connect() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({method: 'eth_requestAccounts'});
        setIsConnected(true);
        let connectedProvider = new ethers.providers.Web3Provider(window.ethereum);
        setSigner(connectedProvider.getSigner());
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsConnected(false);
    }
  }

  async function execute() {
    if (typeof window.ethereum !== 'undefined') {
      const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
      const abi = [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "vrfCoordinatorV2",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "entranceFee",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "gasLane",
              "type": "bytes32"
            },
            {
              "internalType": "uint64",
              "name": "subscriptionId",
              "type": "uint64"
            },
            {
              "internalType": "uint32",
              "name": "callbackGasLimit",
              "type": "uint32"
            },
            {
              "internalType": "uint256",
              "name": "interval",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "have",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "want",
              "type": "address"
            }
          ],
          "name": "OnlyCoordinatorCanFulfill",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "Raffle__RaffleNotOpen",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "Raffle__SendMoreToEnterRaffle",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "Raffle__TransferFailed",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "currentBalance",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "numPlayers",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "raffleState",
              "type": "uint256"
            }
          ],
          "name": "Raffle__UpkeepNotNeeded",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "player",
              "type": "address"
            }
          ],
          "name": "RaffleEnter",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "requestId",
              "type": "uint256"
            }
          ],
          "name": "RequestedRaffleWinner",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "player",
              "type": "address"
            }
          ],
          "name": "WinnerPicked",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "",
              "type": "bytes"
            }
          ],
          "name": "checkUpkeep",
          "outputs": [
            {
              "internalType": "bool",
              "name": "upkeepNeeded",
              "type": "bool"
            },
            {
              "internalType": "bytes",
              "name": "",
              "type": "bytes"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "enterRaffle",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getEntranceFee",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getInterval",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getLastTimeStamp",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getNumWords",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getNumberOfPlayers",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "getPlayer",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getRaffleState",
          "outputs": [
            {
              "internalType": "enum Raffle.RaffleState",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getRecentWinner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getRequestConfirmations",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "",
              "type": "bytes"
            }
          ],
          "name": "performUpkeep",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "requestId",
              "type": "uint256"
            },
            {
              "internalType": "uint256[]",
              "name": "randomWords",
              "type": "uint256[]"
            }
          ],
          "name": "rawFulfillRandomWords",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];
      const contract = new ethers.Contract(contractAddress, abi, signer);
      await contract.enterRaffle({value: ethers.utils.parseEther("10")});
    }
  }

  return (
    <>
      {
        isConnected ?
        <>
          <button>Connected!</button>
          <button onClick={execute}>Execute</button>
        </> :
        <button onClick={connect}>Connect</button>
      }
      <CommentList comments={comments} />
    </>
  )
}

// getStaticProps - fetch at build time
// getServerSideProps - fetch the data on every request (little slower)
// getStaticPaths - generate paths based on the data that we are fetching
// export const getStaticProps = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/comments?_limit=6`);
//   const comments = await res.json();
//   return {
//     props: {
//       comments
//     }
//   }
// }
export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/comments`);
  const comments = await res.json();
  return {
    props: {
      comments
    }
  }
}
