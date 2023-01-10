import {comments} from '../../../data';

export default function handler(req, res) {
  const id = req.query.id;
  const filtered = comments.filter(comment => comment.id == id);
  if (filtered.length > 0) {
    res.status(200).json(filtered[0]);
  } else {
    res.status(404).json({message: `Article with the id of ${id} is not found`});
  }
}
