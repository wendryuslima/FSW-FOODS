"use client";

import Cart from "@/app/_components/cart";
import DeliveryInfo from "@/app/_components/delivery-info";
import DiscountBadge from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";

import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addProductToCart, products } = useContext(CartContext);
  const [isConfirmationDialogOpen, SetIsConfirmationDialogOpen] =
    useState(false);

  const addToCart = ({ emptyCart = false }: { emptyCart?: boolean }) => {
    addProductToCart({
      product: { ...product, quantity },
      emptyCart,
    });
    setIsCartOpen(true);
  };

  console.log(products);

  const handleAddToCartClick = () => {
    //Verificar se ha algum produto de outro restaurante no carrinho
    const hasDifferentRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId,
    );

    //Se houver, abrir um aviso

    if (hasDifferentRestaurantProduct) {
      return SetIsConfirmationDialogOpen(true);
    }

    addToCart({
      emptyCart: false,
    });
  };

  const handleIncriseQuantity = () =>
    setQuantity((currentSate) => currentSate + 1);
  const handleDecreaseQuantity = () =>
    setQuantity((currentSate) => {
      if (currentSate == 1) return 1;

      return currentSate - 1;
    });
  return (
    <>
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
        <div className="px-5">
          <DeliveryInfo restaurant={product.restaurant} />
        </div>

        <div className="mt-6 space-y-3 py-6">
          <h3 className="font-semibold">Sobre</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        <div className="mt-6 space-y-3 py-6">
          <h3 className="font-semibold">Sucos</h3>
          <ProductList products={complementrayProducts} />
        </div>

        <div className=" mt-6 px-5 ">
          <Button
            onClick={handleAddToCartClick}
            className="w-full font-semibold"
          >
            Adicionar a sacola
          </Button>
        </div>
      </div>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[70vw]">
          <SheetTitle>Sacola</SheetTitle>
          <Cart setIsOpen={setIsCartOpen} />
        </SheetContent>
      </Sheet>
      <AlertDialog
        open={isConfirmationDialogOpen}
        onOpenChange={SetIsConfirmationDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você só pode adicionar itens de um restaurante por vez
            </AlertDialogTitle>
            <AlertDialogDescription>
              Deseja mesmo adicionar esse produto? Isso limpará sua sacola
              atual.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>
              Esvaziar sacola e adicionar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductInfo;
