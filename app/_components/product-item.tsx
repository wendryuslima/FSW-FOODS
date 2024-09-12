"use client";

import { Prisma } from "@prisma/client";

import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { ArrowDownIcon } from "lucide-react";

import Link from "next/link";
import { cn } from "../_lib/utils";

interface ProdutcItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;

  className?: string;
}

const ProductItem = ({ product, className }: ProdutcItemProps) => {
  return (
    <Link
      className={cn("w-[150px] min-w-[150px]", className)}
      href={`/products/${product.id}`}
    >
      <div className=" w-full space-y-2">
        <div className="relative aspect-square w-full">
          <Image
            src={product.imageUrl}
            alt="Produto"
            fill
            className="rounded-lg object-cover shadow-md"
          />

          {product.discountPercentage && (
            <div className=" absolute left-1 top-1 flex items-center rounded-full bg-primary px-2 py-[2px] text-white">
              <ArrowDownIcon size={12} />
              <span className=" text-xs font-semibold">
                {product.discountPercentage}%
              </span>
            </div>
          )}
        </div>

        <span className=" text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>

        <h2 className="truncate text-sm">{product.name}</h2>
        <div className="flex items-center gap-1">
          <h3 className="font-semibold">
            R${formatCurrency(calculateProductTotalPrice(product))}
          </h3>
          {product.discountPercentage > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              RS
              {Intl.NumberFormat("pt-BR", {
                currency: "BRL",
                minimumFractionDigits: 2,
              }).format(Number(product.price))}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
