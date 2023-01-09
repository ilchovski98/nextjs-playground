import Link from 'next/link'
import styles from '../styles/Comment.module.css';

const CommentItem = ({ comment }) => {
  return (
    <Link href="/comment/[id]" as={`/comment/${comment.id}`}>
      <div className={styles.card}>
        <h3>{comment.name} &rarr;</h3>
        <p>{comment.body}</p>
      </div>
    </Link>
  )
}

export default CommentItem;
