import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";

interface RestaurantItemProps {
  restaurant: Restaurant;
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  return (
    <div className="min-w-[266px] max-w-[266px] space-y-3">
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

        <Button
          size="icon"
          className=" absolute right-2 top-2 h-7 w-7 items-center rounded-full bg-gray-700"
        >
          <HeartIcon fill="white" size={16} />
        </Button>
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
  );
};

export default RestaurantItem;
