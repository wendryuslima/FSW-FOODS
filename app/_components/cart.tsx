import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
  const { products, totalPrice, totalDiscounts, subtotalprice } =
    useContext(CartContext);

  return (
    <div className=" flex h-full flex-col py-5">
      <div className="flex-auto space-y-4">
        {products.map((product) => (
          <CartItem key={product.id} cartProduct={product} />
        ))}
      </div>

      {products.length > 0 ? (
        <>
          <div className="mt-6">
            <Card>
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-xs text-muted-foreground">
                    Subtotal
                  </span>
                  <span>{formatCurrency(subtotalprice)}</span>
                </div>

                <Separator />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-xs text-muted-foreground">Entrega</span>

                  <span>Grátis</span>
                </div>

                <Separator />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-xs text-muted-foreground">
                    Descontos
                  </span>
                  <span>- {formatCurrency(totalDiscounts)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Total</span>
                  <span> {formatCurrency(totalPrice)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button className="mt-6 w-full">Finalizar pedido</Button>
        </>
      ) : (
        <h1 className="text-center font-semibold">
          Não há nenhuma produto na sua sacola.
        </h1>
      )}
    </div>
  );
};

export default Cart;
