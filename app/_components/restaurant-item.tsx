"use client";

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { toggleFavoriteRestaurant } from "../_action/restaurant";
import Link from "next/link";
import { cn } from "../_lib/utils";
import { Button } from "./ui/button";
import { toast } from "sonner";
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>;

interface RestaurantItemProps {
  userId?: string;
  restaurant: Restaurant;
  className?: string;
  userFavoritesRestaurants: UserFavoriteRestaurant[];
}

const RestaurantItem = ({
  restaurant,
  className,
  userId,
  userFavoritesRestaurants,
}: RestaurantItemProps) => {
  const isFavorite = userFavoritesRestaurants.some(
    (fav) => fav.restaurantId === restaurant.id,
  );
  const handleFavoriteClick = async () => {
    if (!userId) return;

    try {
      await toggleFavoriteRestaurant(userId, restaurant.id);
      toast.success(
        isFavorite
          ? "Restauranter removido dos favoritos"
          : "Restaurante adicionado aos favoritos",
      );
    } catch (error) {
      toast.error("Erro ao favoritar restaurante");
    }
  };
  return (
    <Link
      className={cn("min-w-[266px] max-w-[266px]", className)}
      href={`/restaurants/${restaurant.id}`}
    >
      <div className="w-full flex-col items-center justify-center space-y-3 md:flex  md:flex-col md:items-center md:justify-center">
        <div className=" relative h-[136px] w-full">
          <Image
            src={restaurant.imageUrl}
            alt="Resturantes"
            fill
            className="rounded-lg object-cover"
          />

          <div className=" absolute left-1 top-1 flex items-center rounded-full bg-primary bg-white px-2 py-[2px]">
            <StarIcon className="fill-yellow-500 text-yellow-500" size={12} />
            <span className=" text-xs font-semibold">5.0</span>
          </div>

          {userId && (
            <Button
              size="icon"
              className="absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700"
              onClick={handleFavoriteClick}
            >
              <HeartIcon size={16} className="fill-white"></HeartIcon>
            </Button>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold">{restaurant.name}</h3>

          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <BikeIcon className="text-primary" size={12} />
              <span className=" text-xs text-muted-foreground">
                {Number(restaurant.deliveryFee) === 0
                  ? "Entrega Gratis"
                  : formatCurrency(Number(restaurant.deliveryFee))}
              </span>
            </div>

            {/* {tempo de enthrega} */}

            <div className="flex items-center gap-1">
              <TimerIcon className="text-primary" size={14} />
              <span className=" text-xs text-muted-foreground">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantItem;
