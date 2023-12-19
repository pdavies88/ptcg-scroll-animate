import { renderPack } from '../constants';

const PackPage = async ({ params }: { params: { slug: string } }) => {
  const pack = params.slug;

  return (
    <>
      <h2 className='text-2xl py-8 px-16'>Pack Name: {pack}</h2>
      {renderPack(pack)}
    </>
  );
};

export default PackPage;
