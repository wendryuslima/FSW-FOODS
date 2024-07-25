"use client";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Sheet, SheetContent } from "./ui/sheet";
import { useState } from "react";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCartClick = () => {
    setIsCartOpen(true);
  };
  return (
    <>
      <div className="flex justify-between px-5 pt-6 ">
        <div className="relative h-[30px] w-[100px]">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="FSW-FOODS"
              fill
              className="cursor-pointer object-contain"
            />
          </Link>
        </div>
        <Button
          size="icon"
          variant="outline"
          className="border-none bg-transparent"
        >
          <MenuIcon onClick={handleAddToCartClick} />
        </Button>
      </div>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent>
          <h1>Pedidos</h1>
          <h1>Fale conosco</h1>
          <h1>Sobre nós</h1>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Header;
