import { fetchSingle } from '@/app/action';
import Image from 'next/image';
import Link from 'next/link';
import { PriceTable } from '../../../components/PriceTable';

const PokemonPage = async ({ params }: { params: { pokemon: string } }) => {
  const pokemonId = params.pokemon;

  const data = await fetchSingle(pokemonId);
  const { name, images, tcgplayer } = data;
  return (
    <div className='md:columns-2'>
      <Image
        src={`${images.large}`}
        alt={name}
        height={798}
        width={580}
        style={{ width: '100%' }}
      />
      <div className='flex flex-col items-center mt-4 md:mt-0'>
        <h2 className='text-2xl mb-4'>{name}</h2>
        <h3 className='text-xl mb-2'>TCG Player Prices:</h3>
        <div className='flex gap-4'>
          {tcgplayer.prices?.['1stEditionHolofoil'] && (
            <PriceTable
              type='1st Edition Holo'
              low={tcgplayer.prices?.['1stEditionHolofoil'].low}
              mid={tcgplayer.prices?.['1stEditionHolofoil'].mid}
              high={tcgplayer.prices?.['1stEditionHolofoil'].high}
            />
          )}
          {tcgplayer.prices?.['1stEditionNormal'] && (
            <PriceTable
              type='1st Edition Normal'
              low={tcgplayer.prices?.['1stEditionNormal'].low}
              mid={tcgplayer.prices?.['1stEditionNormal'].mid}
              high={tcgplayer.prices?.['1stEditionNormal'].high}
            />
          )}
          {tcgplayer.prices?.unlimitedHolofoil && (
            <PriceTable
              type='Unlimited Holo'
              low={tcgplayer.prices?.unlimitedHolofoil.low}
              mid={tcgplayer.prices?.unlimitedHolofoil.mid}
              high={tcgplayer.prices?.unlimitedHolofoil.high}
            />
          )}
          {tcgplayer.prices?.holofoil && (
            <PriceTable
              type='Holo'
              low={tcgplayer.prices?.holofoil.low}
              mid={tcgplayer.prices?.holofoil.mid}
              high={tcgplayer.prices?.holofoil.high}
            />
          )}
          {tcgplayer.prices?.reverseHolofoil && (
            <PriceTable
              type='Reverse Holo'
              low={tcgplayer.prices?.reverseHolofoil.low}
              mid={tcgplayer.prices?.reverseHolofoil.mid}
              high={tcgplayer.prices?.reverseHolofoil.high}
            />
          )}
          {tcgplayer.prices?.normal && (
            <PriceTable
              type='Normal'
              low={tcgplayer.prices?.normal.low}
              mid={tcgplayer.prices?.normal.mid}
              high={tcgplayer.prices?.normal.high}
            />
          )}
          {tcgplayer.prices?.['1stEdition'] && (
            <PriceTable
              type='1st Edition'
              low={tcgplayer.prices?.['1stEdition'].low}
              mid={tcgplayer.prices?.['1stEdition'].mid}
              high={tcgplayer.prices?.['1stEdition'].high}
            />
          )}
          {tcgplayer.prices?.unlimited && (
            <PriceTable
              type='1st Edition'
              low={tcgplayer.prices?.unlimited.low}
              mid={tcgplayer.prices?.unlimited.mid}
              high={tcgplayer.prices?.unlimited.high}
            />
          )}
        </div>
        <Link href={tcgplayer.url} target='_blank'>
          <button className='rounded-full bg-blue-800 py-2 px-4 uppercase my-4 hover:bg-sky-500'>
            Buy Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PokemonPage;
