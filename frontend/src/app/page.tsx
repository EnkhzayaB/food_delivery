// import { Banner, FoodCards, Footer } from "@/components";
import {
  Header,
  Banner,
  FoodCards,
  Footer,
  food2,
  foodList,
} from "@/components";
export default function home() {
  return (
    <div>
      <Header />
      <Banner />

      <main className="p-4 bg-gray-100 px-10">
        <h2 className="text-3xl font-semibold mb-4">Appetizers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {foodList.map((food, index) => (
            <FoodCards
              key={index}
              title={food.title}
              price={food.price}
              image={food.image}
              description={food.description}
            />
          ))}
        </div>

        <h2 className="text-3xl font-semibold mb-4 mt-15">Lunch favorites</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {food2.map((food, index) => (
            <FoodCards
              key={index}
              title={food.title}
              price={food.price}
              image={food.image}
              description={food.description}
            />
          ))}
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
