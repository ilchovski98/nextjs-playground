import {server} from '../config';
import CommentList from '../components/CommentList';

export default function Home({comments}) {
  
  return (
    <>
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
