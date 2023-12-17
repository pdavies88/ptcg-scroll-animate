import Image from 'next/image';
import { MotionDiv } from './Motion';
import Link from 'next/link';

const stagger = 0.5;

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export type PokemonProp = {
  id: string;
  name: string;
  images: {
    small: string;
  };
  rarity: string;
  number: string;
  set: {
    id: string;
  };
};

function PokemonCard({ pokemon }: { pokemon: PokemonProp }) {
  return (
    <Link href={`/set/${pokemon.set.id}/${pokemon.id}`}>
      <MotionDiv
        variants={variants}
        initial='hidden'
        animate='visible'
        transition={{
          delay: stagger,
          ease: 'easeInOut',
          duration: 0.5,
        }}
        viewport={{ amount: 0 }}
        className='max-w-sm rounded relative w-full'
      >
        <div className='relative w-full'>
          <Image
            src={`${pokemon.images.small}`}
            alt={pokemon.name}
            height={342}
            width={245}
            style={{ width: '100%' }}
          />
        </div>
        <div className='columns-2 font-bold'>
          <h2>{pokemon.name}</h2>
          <p className='text-right'>
            #{pokemon.number} | {pokemon.rarity}
          </p>
        </div>
      </MotionDiv>
    </Link>
  );
}

export default PokemonCard;
