import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";

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

      <PromoBanner src={"/promo-banner-01.png"} alt="Promo-banner" />

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

      <div className="py-5 pt-6">
        <PromoBanner src={"/promo-banner-02.png"} alt="Promo-banner" />
      </div>

      <div className="space-y-4 px-4 py-10 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurante Recomendados</h2>
          <Link href="/restaurants/recomended">
            <Button
              variant="ghost"
              className="h-fit text-primary hover:bg-transparent"
            >
              Ver todos
              <ChevronRightIcon />
            </Button>
          </Link>
        </div>
        <RestaurantList />
      </div>
    </>
  );
};

export default Home;
