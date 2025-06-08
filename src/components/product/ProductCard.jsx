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
      <div className="flex flex-col flex-1 p-4 items-center">
        <h3 className="text-sm font-medium text-gray-900 ">
          <Link to={`/san-pham/${id}`}>
            <span aria-hidden="true" className="absolute inset-0 " />
            {name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-gray-500">{category}</p>
        <div className="mt-1 flex items-center ">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="h-4 w-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
            </svg>
          ))}
        </div>
        <div className="mt-auto pt-4">
          <div className="flex items-center gap-2">
            <span className="text-base font-medium text-red-500 line-through">
              {(price + 500000).toLocaleString('vi-VN')}₫
            </span>
            <span className="text-base font-medium text-gray-900">
              {price.toLocaleString('vi-VN')}₫
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard; 