import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";
import { authOptions } from "../_lib/auth";

const RestaurantList = async () => {
  const session = await getServerSession(authOptions);

  const restaurants = await db.restaurant.findMany({ take: 10 });
  const userFavoritesRestaurants = await db.userFavoriteRestaurant.findMany({
    where: { userId: session?.user?.id },
  });

  return (
    <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurants) => (
        <RestaurantItem
          restaurant={restaurants}
          key={restaurants.id}
          userId={session?.user?.id}
          userFavoritesRestaurants={userFavoritesRestaurants}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
