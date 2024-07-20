import Link from 'next/link';

const TopNav = () => {
  return (
    <nav className='flex justify-between items-center px-4 py-2 shadow bg-white'>
      <div>
        <Link href='/' className='text-slate-800 hover:no-underline'>
          <span className='text-xl font-semibold'>Wayback Software Blog</span>
        </Link>
      </div>
      <div className='flex gap-12'>
        <div className='rounded py-2 px-4 hover:cursor-pointer hover:bg-slate-100 group'>
          <Link href='/about' className='text-slate-800 group-hover:underline'>
            About
          </Link>
        </div>
        <div className='rounded py-2 px-4 hover:cursor-pointer hover:bg-slate-100 group'>
          <Link href='/contact' className='text-slate-800 group-hover:underline'>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
