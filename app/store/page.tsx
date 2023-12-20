import React from 'react';
import { fetchSets } from '../action';
import Image from 'next/image';
import Link from 'next/link';

type SetData = {
  id: string;
  name: string;
};

const Store = async () => {
  const openablePacks = ['base1', 'sm1'];
  const sets = await fetchSets();
  const filteredSets = sets.filter((set: SetData) =>
    openablePacks.includes(set.id)
  );

  return (
    <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8'>
      {filteredSets.map((set: SetData) => (
        <div key={set.id} className='flex flex-col items-center'>
          <div>{set.name}</div>
          <Image
            src={`/packs/${set.id}_pack.jpg`}
            alt={`${set.name} Pack Artwork`}
            height={342}
            width={245}
            className='max-h-60 object-contain my-4'
          />
          <Link href={`/store/${set.id}`}>
            <button className='border-white border rounded-md py-4 px-8 text-center hover:bg-blue-500'>
              Open Pack
            </button>
          </Link>
        </div>
      ))}
    </section>
  );
};

export default Store;
