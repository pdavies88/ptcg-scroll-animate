import { fetchSets } from './action';

async function Home() {
  const sets = await fetchSets();

  return (
    <main className='sm:p-16 py-16 px-8 flex flex-col gap-8 relative'>
      <h2 className='text-3xl text-white font-bold'>
        Explore Pokemon TCG Sets
      </h2>
      <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8'>
        {sets}
      </section>
    </main>
  );
}

export default Home;
