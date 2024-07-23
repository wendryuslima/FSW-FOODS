import { BikeIcon, TimerIcon } from "lucide-react";
import { Card } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Restaurant } from "@prisma/client";

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTimeMinutes">;
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (
    <Card className="mt-6 flex justify-around p-4">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-muted-foreground">
          <BikeIcon size={14} />
          <span className="text-xs">Entrega</span>
        </div>

        {Number(restaurant.deliveryFee) > 0 ? (
          <p className="text-xs font-semibold">
            {formatCurrency(Number(restaurant.deliveryFee))}
          </p>
        ) : (
          <p className="text-sm font-semibold">Grátis</p>
        )}
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-muted-foreground">
          <TimerIcon size={14} />
          <span className="text-xs">Tempo de entrega</span>
        </div>

        <p>{restaurant.deliveryTimeMinutes} min</p>
      </div>
    </Card>
  );
};

export default DeliveryInfo;
