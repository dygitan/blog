import moment from 'moment';
import { useContext } from 'react';
import { MdDelete } from 'react-icons/md';

import { AuthContext } from '~/context';
import { Comment as CommentModel } from '~/graphql/models';
import useHook from './hook';

export default function Comment({ postId, comment }: { postId: string; comment: CommentModel }) {
  const authContext = useContext(AuthContext);
  const { id = '', content = '', createdAt = new Date(), owner } = comment;
  const { events } = useHook();
  return (
    <div key={id} className="row mb-3">
      <div className="d-flex align-items-start">
        <img className="my-img" src="https://imgur.com/I80W1Q0.png" />
        <div className="ml-3 w-100">
          <a className="d-block text-decoration-none">{owner}</a>
          <small>{moment(createdAt).fromNow()}</small>
          <div className="d-flex border mt-3 border-top-0 border-left-0 border-right-0">
            <p className="w-100">{content}</p>
            {owner === authContext.userInfo?.username && (
              <a className="text-muted btn btn-sm" onClick={() => events.onClickDelete(postId, comment)}>
                <MdDelete fontSize="1.5rem" />
              </a>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .my-img {
          height: 48px;
          width: 48px;
        }
      `}</style>
    </div>
  );
}
