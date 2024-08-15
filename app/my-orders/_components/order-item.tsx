"use client";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { formatCurrency } from "@/app/_helpers/price";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

interface OrdemItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurants: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "CANCELED":
      return "Cancelado";
    case "COMPLETED":
      return "Finalizado";
    case "CONFIRMED":
      return "Confirmado";
    case "DELIVERING":
      return "Em Transporte";
    case "PREPARING":
      return "Preparando";
  }
};

const OrdemItem = ({ order }: OrdemItemProps) => {
  return (
    <Card>
      <CardContent className="gap-3 space-x-3 p-5">
        <div
          className={`w-fit rounded-full bg-[#EEEEE] px-2  py-2 text-muted-foreground ${order.status !== "COMPLETED" && "bg-green-400 text-white"}`}
        >
          <span className="block text-sm font-semibold">
            {getOrderStatusLabel(order.status)}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={order.restaurants.imageUrl} />
            </Avatar>

            <span className="text-sm font-semibold">
              {order.restaurants.name}
            </span>
          </div>
          <Button size="icon" variant="link" className="h-5 w-5">
            <Link href={`/restaurants/${order.restaurantId}`}>
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>
        <div className="py-3">
          <Separator />
        </div>

        <div>
          {order.products.map((product) => (
            <div key={product.id} className="flex items-center gap-2">
              <div className=" flex h-5 w-5  items-center justify-center rounded-full bg-muted-foreground">
                <span className="block-xs flex text-white">
                  {product.quantity}
                </span>
              </div>

              <span className="flex text-xs text-muted-foreground">
                {product.product.name}
              </span>
            </div>
          ))}
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="flex justify-between">
          <span className="text-xs">
            R$
            {formatCurrency(Number(order.totalPrice))}
          </span>

          <Button
            variant="ghost"
            className="text-primary"
            disabled={order.status !== "COMPLETED"}
          >
            Adicionar a sacola
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrdemItem;
