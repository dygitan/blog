import PostList from '~/components/post/list';

export default function HomePage() {
  return <PostList />;
}

export async function getStaticProps() {
  return {
    props: {
      menus: [{ text: 'Home', href: '/' }],
    },
  };
}
