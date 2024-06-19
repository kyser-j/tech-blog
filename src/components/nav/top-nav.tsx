import Link from 'next/link';

const TopNav = () => {
  return (
    <nav className='flex justify-between items-center px-4 py-4 shadow bg-white'>
      <div>
        <Link href='/'>
          <span className='text-xl font-semibold'>Wayback Software Blog</span>
        </Link>
      </div>
      <div>
        <ul className='flex gap-4'>
          <li className='px-2 py-1 list-none hover:bg-red-100 rounded hover:cursor-pointer'>
            <Link href='/about'>About</Link>
          </li>
          <li className='px-2 py-1 list-none hover:bg-red-100 rounded hover:cursor-pointer'>
            <Link href='/contact'>Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default TopNav;
