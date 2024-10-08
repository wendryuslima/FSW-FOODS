"use client";

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurant } from "../_actions/search";
import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";

interface RestaurantsProps {
  userFavoritesRestaurants: UserFavoriteRestaurant[];
}

const Restaurants = ({ userFavoritesRestaurants }: RestaurantsProps) => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const searchFor = searchParams.get("search");
  useEffect(() => {
    const fecthRestaurants = async () => {
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurant(searchFor);
      setRestaurants(foundRestaurants);
    };

    fecthRestaurants();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h2 className="mb-6  text-lg font-semibold">
          Restaurantes Encontrados
        </h2>
        <div className="flex w-full flex-col gap-6 px-5">
          {restaurants.map((restaurants) => (
            <RestaurantItem
              restaurant={restaurants}
              key={restaurants.id}
              className="min-w-full max-w-full"
              userFavoritesRestaurants={userFavoritesRestaurants}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
