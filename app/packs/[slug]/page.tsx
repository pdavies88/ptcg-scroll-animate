import { renderPack } from '../constants';

const PackPage = async ({ params }: { params: { slug: string } }) => {
  const pack = params.slug;

  return <>{renderPack(pack)}</>;
};

export default PackPage;
