import { Restaurant } from "@prisma/client";
import { BikeIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";

import Link from "next/link";
import { cn } from "../_lib/utils";

interface RestaurantItemProps {
  restaurant: Restaurant;
  className?: string;
}

const RestaurantItem = ({ restaurant, className }: RestaurantItemProps) => {
  return (
    <Link
      className={cn("min-w-[266px] max-w-[266px]", className)}
      href={`/restaurants/${restaurant.id}`}
    >
      <div className="w-full space-y-3">
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
                {restaurant.deliveryTimeMinutesMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantItem;
