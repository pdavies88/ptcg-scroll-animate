import Image from 'next/image';
import Link from 'next/link';

export type SetProp = {
  id: string;
  name: string;
  images: {
    symbol: string;
    logo: string;
  };
};

const SetCard = ({ id, name, images }: SetProp) => {
  return (
    <Link
      href={`/set/${id}`}
      className='flex flex-col items-center p-3 bg-blue-800 border-white rounded-md border-2 text-center'
    >
      <Image
        src={images.symbol}
        alt={name}
        width={64}
        height={64}
        className='object-contain h-16 mb-1'
      />
      <span>{name}</span>
    </Link>
  );
};

export default SetCard;
