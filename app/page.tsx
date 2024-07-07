import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";

const Home = () => {
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
    </>
  );
};

export default Home;
