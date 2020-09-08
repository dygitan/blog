import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Breadcrumbs({ menus = [{ text: 'Home', href: '/' }] }) {
  const router = useRouter();
  return (
    <nav className="mb-4">
      <ol className="breadcrumb">
        {(menus || []).map(({ text, href }, index) => (
          <li key={index} className={`breadcrumb-item ${href === router.asPath && 'active'}`}>
            {!href || href === router.asPath ? (
              <>{text}</>
            ) : (
              <Link href={href}>
                <a className="text-decoration-none">{text}</a>
              </Link>
            )}
          </li>
        ))}
        <li className="text-right ml-auto">
          <Link href="/post/new">
            <a className="text-decoration-none">New Post</a>
          </Link>
        </li>
      </ol>
    </nav>
  );
}
