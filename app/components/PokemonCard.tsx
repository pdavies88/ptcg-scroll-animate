import Image from 'next/image';
import { MotionDiv } from './Motion';

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
  flavorText: string;
  number: string;
};

function PokemonCard({ pokemon }: { pokemon: PokemonProp }) {
  return (
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
      <div className='py-4 flex flex-col gap-3'>
        <div className='flex justify-between items-center gap-1'>
          <h2 className='font-bold text-white text-xl line-clamp-1 w-full'>
            {pokemon.name}
          </h2>
          <div className='py-1 px-2 bg-[#161921] rounded-sm'>
            <p className='text-white text-sm font-bold capitalize'>
              {pokemon.rarity}
            </p>
          </div>
        </div>
        <div className='flex gap-4 items-center'>
          <div className='flex flex-row gap-2 items-center'>
            <Image
              src='../episodes.svg'
              alt='episodes'
              width={20}
              height={20}
              className='object-contain'
            />
            <p className='text-base text-white font-bold'>
              {pokemon.flavorText}
            </p>
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <Image
              src='../star.svg'
              alt='star'
              width={18}
              height={18}
              className='object-contain'
            />
            <p className='text-base font-bold text-[#FFAD49]'>
              {pokemon.number}
            </p>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}

export default PokemonCard;
