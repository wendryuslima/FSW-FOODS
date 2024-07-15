"use client";

import DiscountBadge from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductInfoProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementrayProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductInfo = ({ product, complementrayProducts }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncriseQuantity = () =>
    setQuantity((currentSate) => currentSate + 1);
  const handleDecreaseQuantity = () =>
    setQuantity((currentSate) => {
      if (currentSate == 1) return 1;

      return currentSate - 1;
    });
  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white p-5">
      {/* {Nome do resturante} */}
      <div className="flex items-center gap-[0.375rem]">
        <div className="relative h-6 w-6">
          <Image
            className="rounded-full object-cover"
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
          />
        </div>
        <span className="text-xs text-muted-foreground ">
          {product.restaurant.name}
        </span>
      </div>

      {/* {Nome do produto} */}
      <h1 className="mb-3 mt-1 text-xl font-semibold">{product.name}</h1>

      {/* {Preço e quantidade} */}
      <div className="flex justify-between ">
        {/* {Preço com desconto} */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              R${formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            {product.discountPercentage > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>

          {/* {Preço original} */}
          {product.discountPercentage > 0 && (
            <p className="text-sm text-muted-foreground">
              De :R$
              {formatCurrency(Number(product.price))}
            </p>
          )}
        </div>

        {/* {Quantidade} */}

        <div className="flex items-center gap-3 text-center">
          <Button
            onClick={handleDecreaseQuantity}
            size="icon"
            variant="ghost"
            className="border border-solid border-muted-foreground"
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-3">{quantity}</span>
          <Button onClick={handleIncriseQuantity} size="icon">
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      {/* {Dados da entrega} */}
      <Card className="mt-6 flex justify-around p-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <BikeIcon size={14} />
            <span className="text-xs">Entrega</span>
          </div>

          {Number(product.restaurant.deliveryFee) > 0 ? (
            <p className="text-xs font-semibold">
              {formatCurrency(Number(product.restaurant.deliveryFee))}
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

          <p>{product.restaurant.deliveryTimeMinutes} min</p>
        </div>
      </Card>

      <div className="mt-6 space-y-3 py-6">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <div className="mt-6 space-y-3 py-6">
        <h3 className="font-semibold">Sucos</h3>
        <ProductList products={complementrayProducts} />
      </div>
    </div>
  );
};

export default ProductInfo;
