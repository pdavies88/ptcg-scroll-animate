import Base1 from './base1';
import SunMoon1 from './sm1';

export const renderPack = (pack: string) => {
  switch (pack) {
    case 'base1':
      return <Base1 />;
    case 'sm1':
      return <SunMoon1 />;
    default:
      return null;
  }
};
