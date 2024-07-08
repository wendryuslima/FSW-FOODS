import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";

const RestaurantList = async () => {
  const restaurants = await db.restaurant.findMany({ take: 10 });
  return (
    <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurants) => (
        <RestaurantItem restaurant={restaurants} key={restaurants.id} />
      ))}
    </div>
  );
};

export default RestaurantList;
