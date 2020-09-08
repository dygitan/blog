import { useRouter } from 'next/router';
import PostDetails from '~/components/post/details';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <p>Please wait...</p>;
  }

  return <PostDetails />;
}
