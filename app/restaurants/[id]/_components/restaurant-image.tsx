"use client";

import { Button } from "@/app/_components/ui/button";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { Pick } from "@prisma/client/runtime/library";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useFavoritesRestaurants from "@/app/_hooks/user-favorites-restaurants";
import { useSession } from "next-auth/react";
import { isRestaurantFavorite } from "@/app/_helpers/restaurant";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "name" | "id" | "imageUrl">;
  userId?: string;
  className?: string;
  userFavoritesRestaurants: UserFavoriteRestaurant[];
}

const RestaurantImage = ({
  restaurant,
  userFavoritesRestaurants,
}: RestaurantImageProps) => {
  const router = useRouter();
  const { data } = useSession();

  const isFavorite = isRestaurantFavorite(
    restaurant.id,
    userFavoritesRestaurants,
  );

  const { handleFavoriteClick } = useFavoritesRestaurants({
    restaurantId: restaurant.id,
    userId: data?.user.id,
    restaurantIsFavorite: isFavorite,
  });

  const handleBackClick = () => router.back();

  return (
    <div className="relative h-[215px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant?.name}
        fill
        className="object-cover"
        quality={100}
      />
      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        size="icon"
        className={`absolute right-4 top-4 rounded-full bg-gray-700 ${isFavorite && "bg-primary hover:bg-gray-700"}`}
        onClick={handleFavoriteClick}
      >
        <HeartIcon fill="white" size={16} />
      </Button>

      {/* {TItulo e preço} */}
    </div>
  );
};

export default RestaurantImage;
