import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navigation = () => {
  return (
    <div className='bg-gray-800 flex justify-between p-8 sm:px-16 max-w-7xl m-auto'>
      <Link href='/'>
        <Image src='/home_link.png' alt='Home Page' height={53} width={102} />
      </Link>
      <Link href='/store'>
        <Image src='/store_link.png' alt='Store Page' height={53} width={102} />
      </Link>
    </div>
  );
};

export default Navigation;
