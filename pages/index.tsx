import {ethers} from 'ethers';
import {useWeb3React} from '@web3-react/core';
import {InjectedConnector} from '@web3-react/injected-connector'

import {server} from '../config';
import CommentList from '../components/CommentList';
import {abi} from '../constants/raffle';

const injected = new InjectedConnector();

export default function Home({comments}) {
  const { activate, active, library: provider } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
    } catch (error) {
      console.log(error);
    }
  }

  async function execute() {
    if (active) {
      const signer = provider.getSigner();
      const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        await contract.enterRaffle({value: ethers.utils.parseEther("10")});
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      {
        active ?
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
