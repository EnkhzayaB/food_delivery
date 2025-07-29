import { Food } from "@/types";
import { Footer } from "@/components";
import { FoodCards } from "@/components/menu/FoodCards";

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/food/category/${params.category}`,
    { cache: "no-store" }
  );
  const data: { data: Food[] } = await res.json();

  return (
    <div>
      <h1 className="font-semibold text-3xl mt-10 mb-4 mx-6 md:mx-25 2xl:mx-26">
        {params.category}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mx-6 md:mx-25 2xl:mx-26">
        {data.data.map((food, index) => (
          <FoodCards key={index} food={food} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
