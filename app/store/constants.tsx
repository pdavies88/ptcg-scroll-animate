import SunMoon1 from '../packs/sm1';

export const renderPack = (pack: string) => {
  switch (pack) {
    case 'sm1':
      return <SunMoon1 />;
    default:
      return null;
  }
};
