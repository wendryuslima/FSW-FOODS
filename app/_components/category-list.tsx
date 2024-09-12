import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>;

const CategoryList = async () => {
  const categories = await db.category.findMany({});
  return (
    <div className="grid grid-cols-2 gap-3  md:w-[70%] md:justify-center ">
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </div>
  );
};

export default CategoryList;
