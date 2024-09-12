import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";
import CartBanner from "./_components/cart-banner";
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>;

import { authOptions } from "@/app/_lib/auth";
import { getServerSession } from "next-auth";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantsPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id: id,
    },
    include: {
      categories: {
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  const session = await getServerSession(authOptions);
  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <div className="">
      <RestaurantImage
        restaurant={restaurant}
        userFavoritesRestaurants={userFavoriteRestaurants}
      />

      <div className="relative z-50 mt-[-1.5rem] flex items-center justify-between rounded-tl-3xl rounded-tr-3xl bg-white px-5 pt-5">
        {/* {titulo} */}
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt="restaurent"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>

        <div className=" flex items-center rounded-full bg-foreground px-2 py-[2px] text-white">
          <StarIcon className="fill-yellow-500 text-yellow-500" size={12} />
          <span className=" text-xs font-semibold">5.0</span>
        </div>
      </div>

      <div className=" px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>

      <div className="mt-6 flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div
            className="roudened-lg min-w-[167px] bg-[#F4F4F4] text-center"
            key={category.id}
          >
            <span className="text-xs text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <h2 className="t-6 gap-2 space-y-3 px-5 font-semibold md:flex md:flex-col md:items-center  md:justify-center md:p-5">
          Mais pedidos
        </h2>
        <ProductList products={restaurant.products} />
      </div>

      <div className=" mt-6 px-5 "></div>

      {restaurant.categories.map((category) => (
        <div
          className="t-6 gap-2  space-y-4 md:flex md:flex-col md:items-center  md:justify-center md:p-5"
          key={category.id}
        >
          {/* TODO: mostrar produtos mais pedidos quando implementarmos realização de pedido */}
          <h2 className="mb-5 mt-7 gap-2 space-y-3 px-7 font-semibold md:flex md:justify-center">
            {category.name}
          </h2>
          <ProductList products={category.products} />
        </div>
      ))}
      <CartBanner restaurant={restaurant} />
    </div>
  );
};

export default RestaurantsPage;
