import {} from "@/app/_helpers/price";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/produt-image";
import ProductInfo from "./_components/product-info";
import CartBanner from "@/app/restaurants/[id]/_components/cart-banner";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }
  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  });
  return (
    <div>
      {/* {imagem} */}
      <ProductImage product={product} />

      <ProductInfo product={product} complementrayProducts={juices} />

      <CartBanner restaurant={product} />
    </div>
  );
};

export default ProductPage;
