import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";

const MyFavoriteRestaurants = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const userFavoritesRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <>
      <Header />

      <div className="flex w-full flex-col items-center justify-center px-5 py-6">
        <h2 className="mb-6  text-lg font-semibold">Restaurantes favoritos</h2>
        <div className="flex w-[70%] flex-col items-center justify-center gap-6 px-5">
          {userFavoritesRestaurants.length > 0 ? (
            userFavoritesRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                className="min-w-full max-w-full"
                userFavoritesRestaurants={userFavoritesRestaurants}
              />
            ))
          ) : (
            <h3 className="font-medium">
              Você ainda não marcou nenhum restaurante como favorito.
            </h3>
          )}
        </div>
      </div>
    </>
  );
};
export default MyFavoriteRestaurants;
