"use client";

import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header = () => {
  const { data, status } = useSession();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSignOutClick = () => signOut();
  const handleSignInClick = () => signIn();

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
        <SheetContent className="bg-white">
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>
          {status === "authenticated" ? (
            <>
              <div className="flex justify-between pt-6">
                <div className="item-center mt-3 flex gap-3">
                  <Avatar>
                    <AvatarImage src={data?.user?.name as string | undefined} />
                    <AvatarFallback>
                      {data?.user?.name?.split("")[0][0]}
                      {data?.user?.name?.split("")[1][0]}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-semibold">{data?.user?.name}</h3>
                    <span className="block text-xs text-muted-foreground">
                      {data?.user?.email}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="item-center flex justify-between pt-6">
                <h2 className="font-semibold">Olá, faça seu login</h2>
                <Button onClick={handleSignInClick} size="icon">
                  <LogInIcon></LogInIcon>
                </Button>
              </div>
            </>
          )}

          <div className="py-6">
            <Separator />
          </div>

          <div className="space-y-2">
            <Link href="/">
              <Button
                variant="ghost"
                className="w-full justify-start space-x-3 font-normal "
              >
                <HomeIcon size={16} />
                <span className="block">Início</span>
              </Button>
            </Link>

            {data?.user && (
              <>
                <Link href="/my-orders">
                  <Button
                    variant="ghost"
                    className="w-full justify-start space-x-3 font-normal"
                  >
                    <ScrollTextIcon size={16} />
                    <span className="block">Meus Pedidos</span>
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 font-normal"
                  asChild
                >
                  <Link href="/my-favorites-restaurant">
                    <HeartIcon size={16} />
                    <span className="block">Restaurantes Favoritos</span>
                  </Link>
                </Button>
              </>
            )}
          </div>

          <div className="py-6">
            <Separator />

            {data?.user && (
              <Button
                onClick={handleSignOutClick}
                variant="ghost"
                className="w-full justify-start space-x-3 font-normal"
              >
                <LogOutIcon size={16} />
                <span className="block">Sair da conta</span>
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Header;
