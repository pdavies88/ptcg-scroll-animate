import { fetchPokemon } from '@/app/action';
import LoadMore from '@/app/components/LoadMore';
import PokemonCard, { PokemonProp } from '@/app/components/PokemonCard';
import ScrollToTop from '@/app/components/ScrollToTop';

const SetPage = async ({ params }: { params: { slug: string } }) => {
  const set = params.slug;
  const data = await fetchPokemon(set, 1);
  const totalInSet = data[0].set.total;
  const setName = data[0].set.name;

  return (
    <>
      <ScrollToTop />
      <h2 className='text-2xl py-8 px-16'>Set Name: {setName}</h2>
      <section className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-8 mb-10 px-16 justify-center'>
        {data.map((pokemon: PokemonProp) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </section>
      <LoadMore set={set} totalInSet={totalInSet} />
    </>
  );
};

export default SetPage;
