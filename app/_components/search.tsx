"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!search) {
      return;
    }
    router.push(`/restaurants?search=${search}`);
  };

  return (
    <form className="flex w-[70%] gap-2" onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Buscar restaurante"
        className="border-none"
        onChange={handleChange}
        value={search}
      />
      <Button>
        <SearchIcon size={18} />
      </Button>
    </form>
  );
};

export default Search;
