type FoodCardProps = {
  title: string;
  price: number;
  image: string;
  description: string;
};

const FoodCards = ({ title, price, image, description }: FoodCardProps) => {
  return (
    <div className="bg-white rounded-[20px] shadow-md p-2">
      <img
        src={image}
        alt={title}
        className="rounded w-full h-32 object-cover"
      />
      <h3 className="text-md font-semibold mt-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-sm font-bold mt-1">${price}</p>
    </div>
  );
};

export default FoodCards;
