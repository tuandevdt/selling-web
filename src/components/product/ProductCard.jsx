import { Link } from 'react-router-dom';
import Card from '../ui/Card';

const ProductCard = ({ product }) => {  
  const { id, name, category, price, imageUrl } = product;

  return (
    <Card className="group relative h-full flex flex-col">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-t-lg overflow-hidden group-hover:opacity-75">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          <Link to={`/san-pham/${id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-gray-500">{category}</p>
        <div className="mt-auto pt-4">
          <p className="text-base font-medium text-gray-900">{price.toLocaleString('vi-VN')}₫</p>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard; 