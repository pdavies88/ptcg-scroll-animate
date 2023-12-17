type Props = {
  type: string;
  low: number;
  mid: number;
  high: number;
};
export const PriceTable = ({ type, low, mid, high }: Props) => {
  return (
    <table className='border border-blue-400'>
      <thead className='border border-blue-400 text-center'>
        <tr>
          <th colSpan={2} className='p-2'>
            {type}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className='border border-blue-400'>
          <td className='border border-blue-400 p-2'>Low</td>
          <td className='border border-blue-400 p-2'>${low.toFixed(2)}</td>
        </tr>
        <tr className='border border-blue-400'>
          <td className='border border-blue-400 p-2'>Mid</td>
          <td className='border border-blue-400 p-2'>${mid.toFixed(2)}</td>
        </tr>
        <tr className='border border-blue-400'>
          <td className='border border-blue-400 p-2'>High</td>
          <td className='border border-blue-400 p-2'>${high.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  );
};
