import Link from 'next/link';

const Sidebar = () => (
  <div>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/about">
      <a>About</a>
    </Link>
  </div>
);

export default Sidebar;
