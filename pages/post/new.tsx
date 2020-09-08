import NewPost from '~/components/post/new';

export default function NewPostPage() {
  return <NewPost />;
}

export async function getStaticProps() {
  return {
    props: {
      menus: [{ text: 'Home', href: '/' }, { text: 'Post' }, { text: 'New', href: `/post/new` }],
    },
  };
}
