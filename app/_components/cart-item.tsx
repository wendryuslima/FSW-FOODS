import Image from "next/image";
import { CartContext, CartProduct } from "../_context/cart";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductsFromCart,
  } = useContext(CartContext);
  const handleincreaseProductQuantity = () =>
    increaseProductQuantity(cartProduct.id);
  const handleDecreaseQuantityClick = () =>
    decreaseProductQuantity(cartProduct.id);

  const handleRemoveToCart = () => removeProductsFromCart(cartProduct.id);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 ">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            className="rounded-lg object-cover"
            fill
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-xs">{cartProduct.name}</h3>
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-muted-foregroung text-xs line-through">
                {formatCurrency(Number(cartProduct.price))}
              </span>
            )}
          </div>

          <div className="item center flex">
            <div className="flex items-center gap-3 text-center">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 border border-solid border-muted-foreground"
              >
                <ChevronLeftIcon
                  size={18}
                  onClick={handleDecreaseQuantityClick}
                />
              </Button>
              <span className=" text-sm">{cartProduct.quantity}</span>
              <Button size="icon" className="h-8 w-8">
                <ChevronRightIcon
                  onClick={handleincreaseProductQuantity}
                  size={18}
                />
              </Button>
            </div>
          </div>
        </div>
        <Button
          size="icon"
          className="ml-14 h-8 w-8 border border-solid border-muted-foreground"
          variant="ghost"
          onClick={handleRemoveToCart}
        >
          <TrashIcon size={18} />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
