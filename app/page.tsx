import { fetchSets } from './action';
import SetCard, { SetProp } from './components/SetCard';

async function Home() {
  const sets = await fetchSets();

  return (
    <main className='sm:p-16 py-16 px-8 flex flex-col gap-8 relative'>
      <h2 className='text-3xl text-white font-bold'>
        Explore Pokemon TCG Sets
      </h2>
      <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8'>
        {sets.map((set: SetProp) => (
          <SetCard
            key={set.id}
            id={set.id}
            name={set.name}
            images={set.images}
          />
        ))}
      </section>
    </main>
  );
}

export default Home;
