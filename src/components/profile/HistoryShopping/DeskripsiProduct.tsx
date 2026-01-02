import { FC } from 'react';

type Props = {
    name : string;
    price : number;
    quantity : number
}

const DeskripsiProduct : FC<Props> = ({ name, quantity }) => {
  return (
    <p className="text-sm space-y-2 md:text-lg font-medium text-gray-700 line-clamp-1 lg:text-base">
      {name} x {quantity}
    </p>
  )
}

export default DeskripsiProduct