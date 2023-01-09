import {server} from '../../../config';
import Meta from '../../../components/Meta';
import Link from 'next/link';

const Comment = ({comment}) => {
  return (
    <>
      <Meta title={comment.name} />
      <h3>{comment.name} &rarr;</h3>
      <p>{comment.body}</p>
      <br />
      <Link href="/">Go back</Link>
    </>
  )
}

export const getStaticProps = async (context) => {
  const res = await fetch(`${server}/api/comments/${context.params.id}`);
  const comment = await res.json();

  return {
    props: {
      comment
    }
  }
}

export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/comments`);
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
