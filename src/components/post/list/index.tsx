import moment from 'moment';
import Link from 'next/link';
import { useContext } from 'react';
import { MdDelete } from 'react-icons/md';

import { AuthContext } from '~/context';
import useHook from './hook';

export default function PostList() {
  const authContext = useContext(AuthContext);
  const { events, loading, posts } = useHook();

  if (loading) {
    return (
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <p>Loading...</p>
        </li>
      </ul>
    );
  }

  return (
    <ul className="list-group list-group-flush">
      {posts.map((post) => {
        return (
          <li key={post.id} className="d-flex justify-content-between list-group-item list-group-item-action py-3 ">
            <div>
              <h3>
                <Link href={`/post/[id]`} as={`/post/${post.id}`}>
                  <a className="text-decoration-none text-dark">{post.title}</a>
                </Link>
              </h3>
              <div className="mt-2 d-flex align-items-center">
                <img src="https://imgur.com/I80W1Q0.png" style={{ height: '48px', width: '48px' }} />
                <div className="ml-4">
                  <a className="d-block text-decoration-none">
                    <small className="text-dark">by </small> {post.owner}
                  </a>
                  <small>{moment(post.createdAt).fromNow()}</small>
                </div>
              </div>
            </div>
            {post.owner === authContext.userInfo?.username && (
              <div className="align-self-end">
                <a className="text-muted btn btn-sm" onClick={() => events.onClickDeletePost(post)}>
                  <MdDelete fontSize="1.5rem" />
                </a>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
