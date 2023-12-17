import Image from 'next/image';

function Hero() {
  return (
    <header className='bg-hero overlay-dark bg-center bg-cover bg-no-repeat sm:p-16 py-16 px-8 flex justify-center lg:items-center max-lg:flex-col w-full sm:gap-16 gap-0'>
      <div className='flex-1 flex flex-col gap-8'>
        <h1 className='sm:text-6xl text-5xl text-white lg:max-w-lg font-bold leading-[120%]'>
          Explore The <span className='red-gradient'>Diverse World</span> of
          Pokemon
        </h1>
      </div>
      <div className='lg:flex-1 relative w-full h-64 justify-center'>
        <Image
          src='/pikachu_sleep.png'
          alt='anime'
          fill
          className='object-contain'
        />
      </div>
    </header>
  );
}

export default Hero;
