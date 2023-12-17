'use client';

import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { fetchPokemon } from '../action';
import PokemonCard, { PokemonProp } from './PokemonCard';
import { MAX_LIMIT } from '../constants';

let page = 2;

function LoadMore({ set, totalInSet }: { set: string; totalInSet: number }) {
  const { ref, inView } = useInView();

  const [data, setData] = useState<PokemonProp[]>([]);
  const [, setInitLoad] = useState(false);
  let loadingLimit = MAX_LIMIT * (page - 1) >= totalInSet;

  useEffect(() => {
    if (inView && !loadingLimit) {
      const delay = 300;

      const timeoutId = setTimeout(() => {
        fetchPokemon(set, page).then((res) => {
          setData([...data, ...res]);
          page++;
        });
      }, delay);

      // Clear the timeout if the component is unmounted or inView becomes false
      return () => clearTimeout(timeoutId);
    }
  }, [inView, data, set, loadingLimit]);

  useEffect(() => {
    setInitLoad(true);
    page = 2;
    return () => setInitLoad(false);
  }, []);

  return (
    <>
      <section className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-8 px-16 justify-center mb-16'>
        {data.map((pokemon: PokemonProp) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </section>
      {!loadingLimit && (
        <section className='flex justify-center items-center w-full'>
          <div ref={ref}>
            {inView && (
              <Image
                src='../spinner.svg'
                alt='spinner'
                width={56}
                height={56}
                className='object-contain'
              />
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default LoadMore;
