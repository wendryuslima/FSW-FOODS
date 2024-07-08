import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },

    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="p-x5 pt-6">
        <CategoryList />
      </div>

      <Image
        src={"/promo-banner-01.png"}
        alt="Promo-banner"
        height={0}
        width={0}
        className="h-auto w-full p-3"
        sizes="100vw"
        quality={100}
      />

      <div className="space-y-4 px-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon />
          </Button>
        </div>
        <ProductList products={products} />
      </div>
    </>
  );
};

export default Home;
