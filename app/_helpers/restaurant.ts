import { UserFavoriteRestaurant } from "@prisma/client";

export const isRestaurantFavorite = (
  restaurantId: string,
  userFavoriteRestaurants: UserFavoriteRestaurant[],
) => userFavoriteRestaurants?.some((fav) => fav.restaurantId === restaurantId);
