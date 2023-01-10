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
      const contractAddress = "";
      const abi = [];
      const contract = new ethers.Contract(contractAddress, abi, signer);
    }
  }

  return (
    <>
      {
        isConnected ? 
        <>
          <button>Connected!</button>
          <button onCLick={execute}>Execute</button>
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
