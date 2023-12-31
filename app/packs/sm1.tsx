import Image from 'next/image';
import { fetchCardTypes } from '../action';
import { pickUniqueRandomObjects, weightedRandomSelection } from './helpers';
import { CardData, CardWeighted } from './types';
import TiltCard from '../components/TiltCard';
import RefreshPage from '../components/RefreshPage';

// Pack Structure:
// Packs say 10 cards energy does not count towards pack total
// 1 Energy
// 5 Common
// 3 Uncommon
// 1 Reverse Holo Any Common/Uncommon/Rare(Non-Holofoil)
// 1 Rare

// Rare Types:
// Rare
// Rare Holo
// Rare Holo GX
// Rare Ultra
// Rare Rainbow
// Rare Secret

const SunMoon1 = async () => {
  const commons = await fetchCardTypes('sm1', 'common');
  const energies = commons.filter(
    (common: CardData) => common.supertype === 'Energy'
  );
  const commonsNoEnergy = commons.filter(
    (common: CardData) => common.supertype !== 'Energy'
  );
  const uncommons = await fetchCardTypes('sm1', 'uncommon');
  const rares = await fetchCardTypes('sm1', 'rare');
  // 50% chance - CAN BE A REVERSE HOLO
  // 17 Cards
  const basicRare = rares
    .filter((rare: CardData) => rare.rarity === 'Rare')
    .map((rare: CardWeighted) => {
      return {
        ...rare,
        probability: 0.029411764705882,
      };
    });

  // 25% chance - CAN BE A REVERSE HOLO
  // 16 Cards
  const rareHolo = rares
    .filter((rare: CardData) => rare.rarity === 'Rare Holo')
    .map((rare: CardWeighted) => {
      return {
        ...rare,
        probability: 0.015625,
      };
    });
  // 10% chance
  // 11 Cards
  const rareGX = rares
    .filter((rare: CardData) => rare.rarity === 'Rare Holo GX')
    .map((rare: CardWeighted) => {
      return {
        ...rare,
        probability: 0.009090909090909,
      };
    });

  // 5% chance
  // 12 Cards
  const rareUltra = rares
    .filter((rare: CardData) => rare.rarity === 'Rare Ultra')
    .map((rare: CardWeighted) => {
      return {
        ...rare,
        probability: 0.004166666666667,
      };
    });

  // 5% chance
  // 8 Cards
  const rareRainbow = rares
    .filter((rare: CardData) => rare.rarity === 'Rare Rainbow')
    .map((rare: CardWeighted) => {
      return {
        ...rare,
        probability: 0.00625,
      };
    });
  // 5% chance
  // 6 Cards
  const rareSecret = rares
    .filter((rare: CardData) => rare.rarity === 'Rare Secret')
    .map((rare: CardWeighted) => {
      return {
        ...rare,
        probability: 0.008333333333333,
      };
    });

  const reverseHolos = [
    ...commonsNoEnergy,
    ...uncommons,
    ...basicRare,
    ...rareHolo,
  ];
  const raresWithProbability = [
    ...basicRare,
    ...rareHolo,
    ...rareGX,
    ...rareUltra,
    ...rareRainbow,
    ...rareSecret,
  ];

  const uniqueRandomCommons = pickUniqueRandomObjects(commonsNoEnergy, 5);
  const uniqueRandomUncommons = pickUniqueRandomObjects(uncommons, 3);
  const uniqueRandomEnergy = pickUniqueRandomObjects(energies, 1);
  const uniqueReverseHolo = pickUniqueRandomObjects(reverseHolos, 1).map(
    (reverse) => {
      return {
        ...reverse,
        rarity: 'Reverse Holo',
      };
    }
  );
  const uniqueRandomRares = weightedRandomSelection(raresWithProbability);
  const combinedPack = [
    ...uniqueRandomCommons,
    ...uniqueRandomUncommons,
    ...uniqueRandomEnergy,
    ...uniqueReverseHolo,
    ...uniqueRandomRares,
  ];

  return (
    <>
      <RefreshPage />
      <section className='p-16'>
        <div className='flex flex-col justify-center items-center'>
          <h2 className='text-2xl pb-4'>Sun & Moon Base Set</h2>
          <Image
            src={`/packs/sm1_pack.jpg`}
            alt='Sun & Moon Pack Artwork'
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
                  set='sm1'
                />
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default SunMoon1;
