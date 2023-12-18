import { fetchSingle } from '@/app/action';
import Image from 'next/image';
import Link from 'next/link';
import { PriceTable } from '../../components/PriceTable';

const PokemonPage = async ({ params }: { params: { slug: string } }) => {
  const pokemonId = params.slug;

  const data = await fetchSingle(pokemonId);

  return (
    <>
      <div className='md:columns-2'>
        <Image
          src={`${data?.images?.large}`}
          alt={data?.name}
          height={798}
          width={580}
          style={{ width: '100%' }}
          className='p-16'
        />
        <div className='flex flex-col items-center pb-16 md:pt-16'>
          <h2 className='text-2xl mb-4'>{data?.name}</h2>
          {data?.tcgplayer && (
            <>
              <h3 className='text-xl mb-2'>TCG Player Prices:</h3>
              <div className='flex gap-4'>
                {data?.tcgplayer?.prices?.['1stEditionHolofoil'] && (
                  <PriceTable
                    type='1st Edition Holo'
                    low={data?.tcgplayer?.prices?.['1stEditionHolofoil'].low}
                    mid={data?.tcgplayer?.prices?.['1stEditionHolofoil'].mid}
                    high={data?.tcgplayer?.prices?.['1stEditionHolofoil'].high}
                  />
                )}
                {data?.tcgplayer?.prices?.['1stEditionNormal'] && (
                  <PriceTable
                    type='1st Edition Normal'
                    low={data?.tcgplayer?.prices?.['1stEditionNormal'].low}
                    mid={data?.tcgplayer?.prices?.['1stEditionNormal'].mid}
                    high={data?.tcgplayer?.prices?.['1stEditionNormal'].high}
                  />
                )}
                {data?.tcgplayer?.prices?.unlimitedHolofoil && (
                  <PriceTable
                    type='Unlimited Holo'
                    low={data?.tcgplayer?.prices?.unlimitedHolofoil.low}
                    mid={data?.tcgplayer?.prices?.unlimitedHolofoil.mid}
                    high={data?.tcgplayer?.prices?.unlimitedHolofoil.high}
                  />
                )}
                {data?.tcgplayer?.prices?.holofoil && (
                  <PriceTable
                    type='Holo'
                    low={data?.tcgplayer?.prices?.holofoil.low}
                    mid={data?.tcgplayer?.prices?.holofoil.mid}
                    high={data?.tcgplayer?.prices?.holofoil.high}
                  />
                )}
                {data?.tcgplayer?.prices?.reverseHolofoil && (
                  <PriceTable
                    type='Reverse Holo'
                    low={data?.tcgplayer?.prices?.reverseHolofoil.low}
                    mid={data?.tcgplayer?.prices?.reverseHolofoil.mid}
                    high={data?.tcgplayer?.prices?.reverseHolofoil.high}
                  />
                )}
                {data?.tcgplayer?.prices?.normal && (
                  <PriceTable
                    type='Normal'
                    low={data?.tcgplayer?.prices?.normal.low}
                    mid={data?.tcgplayer?.prices?.normal.mid}
                    high={data?.tcgplayer?.prices?.normal.high}
                  />
                )}
                {data?.tcgplayer?.prices?.['1stEdition'] && (
                  <PriceTable
                    type='1st Edition'
                    low={data?.tcgplayer?.prices?.['1stEdition'].low}
                    mid={data?.tcgplayer?.prices?.['1stEdition'].mid}
                    high={data?.tcgplayer?.prices?.['1stEdition'].high}
                  />
                )}
                {data?.tcgplayer?.prices?.unlimited && (
                  <PriceTable
                    type='1st Edition'
                    low={data?.tcgplayer?.prices?.unlimited.low}
                    mid={data?.tcgplayer?.prices?.unlimited.mid}
                    high={data?.tcgplayer?.prices?.unlimited.high}
                  />
                )}
              </div>
              {data?.tcgplayer?.url && (
                <Link href={data.tcgplayer.url} target='_blank'>
                  <button className='rounded-full bg-blue-800 py-2 px-4 uppercase mt-8 hover:bg-sky-500'>
                    Buy Now
                  </button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PokemonPage;
