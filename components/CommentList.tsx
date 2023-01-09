import ArticleItem from '../components/CommentItem';
import styles from '../styles/Comment.module.css';

const CommentList = ({ comments }) => {
  return (
    <div className={styles.grid}>
      {comments.map((comment, index) => {
        return <ArticleItem key={comment.postId + '-' + index} comment={comment} />
      })}
    </div>
  )
}

export default CommentList;
