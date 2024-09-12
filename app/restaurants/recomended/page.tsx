import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>;

const RecomendedRestaurants = async () => {
  const restaurants = await db.restaurant.findMany({});
  const session = await getServerSession(authOptions);
  const userFavoritesRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <>
      <Header />

      <div className="px-5 py-6 md:flex md:flex-col md:items-center md:justify-center">
        <h2 className="mb-6  text-lg font-semibold">
          Restaurantes recomendados
        </h2>
        <div className="flex w-full flex-col gap-6 px-5 md:flex md:w-[70%]  md:flex-col md:items-center md:justify-center">
          {restaurants.map((restaurants) => (
            <RestaurantItem
              restaurant={restaurants}
              key={restaurants.id}
              className="min-w-full max-w-full"
              userFavoritesRestaurants={userFavoritesRestaurants}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecomendedRestaurants;
