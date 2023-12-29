import Image from 'next/image';
import { fetchCardTypes, fetchEnergies } from '../action';
import { pickUniqueRandomObjects, weightedRandomSelection } from './helpers';
import { CardData, CardWeighted } from './types';
import TiltCard from '../components/TiltCard';
import RefreshPage from '../components/RefreshPage';

// Pack Structure:
// 2 Energy
// 5 Common
// 3 Uncommon
// 1 Rare

// Rare Types:
// Rare
// Rare Holo

const Base1 = async () => {
  const commons = await fetchCardTypes('base1', 'common');
  const energies = await fetchEnergies('base1');
  // Remove Special Energies that are Uncommons
  const energyBasic = energies.filter(
    (energy: CardData) => energy.rarity === undefined
  );
  const uncommons = await fetchCardTypes('base1', 'uncommon');
  const rares = await fetchCardTypes('base1', 'rare');
  // 75% chance
  // 16 Cards
  const basicRare = rares
    .filter((rare: CardData) => rare.rarity === 'Rare')
    .map((rare: CardWeighted) => {
      return {
        ...rare,
        probability: 0.046875,
      };
    });

  // 25% chance
  // 16 Cards
  const rareHolo = rares
    .filter((rare: CardData) => rare.rarity === 'Rare Holo')
    .map((rare: CardWeighted) => {
      return {
        ...rare,
        probability: 0.015625,
      };
    });

  const raresWithProbability = [...basicRare, ...rareHolo];

  const uniqueRandomCommons = pickUniqueRandomObjects(commons, 5);
  const uniqueRandomUncommons = pickUniqueRandomObjects(uncommons, 3);
  const uniqueRandomEnergy = pickUniqueRandomObjects(energyBasic, 2);
  const uniqueRandomRares = weightedRandomSelection(raresWithProbability);
  const combinedPack = [
    ...uniqueRandomCommons,
    ...uniqueRandomUncommons,
    ...uniqueRandomEnergy,
    ...uniqueRandomRares,
  ];

  return (
    <>
      <RefreshPage />
      <section className='p-16'>
        <div className='flex flex-col justify-center items-center'>
          <h2 className='text-2xl pb-4'>Base Set</h2>
          <Image
            src={`/packs/base1_pack.jpg`}
            alt='Base Set Pack Artwork'
            height={342}
            width={245}
            className='max-h-60 object-contain'
          />
        </div>
        <hr className='my-8' />
        <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-8'>
          {!!combinedPack.length &&
            combinedPack.map((pack) => (
              <div key={pack?.id}>
                <TiltCard
                  name={pack?.name}
                  image={pack?.images?.large}
                  rarity={pack?.rarity}
                  supertype={pack?.supertype}
                  set='base1'
                />
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default Base1;
