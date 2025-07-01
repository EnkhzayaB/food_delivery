const Card = () => {
  return (
    <div className="flex px-4 flex-col items-start self-stretch rounded-[20px] bg-white w-[397px] mt-2.5">
      <img src="/ProductImage1.png" alt="food" className="mt-2 " />
      <div className="flex justify-between gap-2 items-center">
        <p className="text-2xl font-semibold text-[#EF4444]">Finger food </p>
        <p className="text-[18px] font-semiold ">$12.99</p>
      </div>
      <p className="text-sm font-semibold ">
        Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.
      </p>
    </div>
  );
};

export default Card;
