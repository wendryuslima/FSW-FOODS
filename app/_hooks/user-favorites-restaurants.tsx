import { toast } from "sonner";
import { toggleFavoriteRestaurant } from "../_action/restaurant";
import { UserFavoriteRestaurant } from "@prisma/client";
import { useRouter } from "next/navigation";

interface useFavoritesRestaurantsProps {
  userId?: string;
  restaurantId: string;
  userFavoritesRestaurants?: UserFavoriteRestaurant[];
  restaurantIsFavorite?: boolean;
}

const useFavoritesRestaurants = ({
  userId,
  restaurantId,
  restaurantIsFavorite,
}: useFavoritesRestaurantsProps) => {
  const router = useRouter();
  const handleFavoriteClick = async () => {
    if (!userId) return;

    try {
      await toggleFavoriteRestaurant(userId, restaurantId);

      toast(
        restaurantIsFavorite
          ? "Restauranter removido dos favoritos"
          : "Restaurante favoritado",
        {
          action: {
            label: "Ver favoritos",
            onClick: () => router.push("/my-favorites-restaurant"),
          },
        },
      );
    } catch (error) {
      toast.error("Erro ao favoritar restaurante");
    }
  };
  return { handleFavoriteClick };
};

export default useFavoritesRestaurants;
