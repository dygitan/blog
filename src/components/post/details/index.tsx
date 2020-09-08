import Comment from '~/components/post/comment';
import useHook from './hook';

export default function PostDetails() {
  const { comment, comments, events, post } = useHook();

  return (
    <div>
      <h3>{post?.title || 'Loading...'}</h3>
      <p>{post?.description}</p>
      <div className="text-right">
        by <a className="text-decoration-none">{post?.owner}</a>
      </div>
      <div className="mt-3 pt-3 borders border-left-0 border-right-0 border-bottom-0 ">
        <textarea className="form-control" rows={5} onChange={events.onInputChange} value={comment || ''} />
        <div className="mt-3 text-right">
          <button className="btn btn-primary" onClick={events.onClickAddComment}>
            Leave a comment
          </button>
        </div>
      </div>
      <div className="pt-s4 mt-4 container">
        {comments.map((comment) => (
          <Comment key={comment.id} postId={post?.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
