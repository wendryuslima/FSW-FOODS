"use server";

import { db } from "@/app/_lib/prisma";

export const searchForRestaurant = async (search: string) => {
  const restaurnts = await db.restaurant.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });
  return restaurnts;
};
