// import { useRouter } from 'next/router';
import Link from 'next/link';

const Comment = ({comment}) => {
  // const router = useRouter();
  // const {id} = router.query;
  console.log('comment', comment);
  
  return (
    <>
      <h3>{comment.name} &rarr;</h3>
      <p>{comment.body}</p>
      <br />
      <Link href="/">Go back</Link>
    </>
  )
}

export const getStaticProps = async (context) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/comments/${context.params.id}`);
  const comment = await res.json();

  return {
    props: {
      comment
    }
  }
}

export const getStaticPaths = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/comments`);
  const comments = await res.json();
  const ids = comments.map(comment => comment.id);
  const paths = ids.map(id => ({params: {id: id.toString()}}))
  
  return {
    paths,
    fallback: false
  }
}

// export const getServerSideProps = async (context) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/comments/${context.params.id}`);
//   const comment = await res.json();

//   return {
//     props: {
//       comment
//     }
//   }
// }
export default Comment;
