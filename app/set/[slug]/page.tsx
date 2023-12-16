import { fetchPokemon } from '@/app/action';
import LoadMore from '@/app/components/LoadMore';
import PokemonCard, { PokemonProp } from '@/app/components/PokemonCard';

const SetPage = async ({ params }: { params: { slug: string } }) => {
  const set = params.slug;
  const data = await fetchPokemon(set, 1);
  const totalInSet = data[0].set.total;

  return (
    <>
      <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
        {data.map((pokemon: PokemonProp) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </section>
      <LoadMore set={set} totalInSet={totalInSet} />
    </>
  );
};

export default SetPage;
