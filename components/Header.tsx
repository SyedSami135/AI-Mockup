"use client";
import { NavItemType } from "@/lib/types";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { IconMenu2, IconSquareRoundedX } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

const Header = () => {
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const navItems: NavItemType[] = [
    { name: "Dashboard", path: "/dashboard" },
   
    { name: "Upgrade", path: "/upgrade" },
    { name: "How it Works?", path: "/how-it-works" },
  ];
  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox:
        "md:w-14 md:h-14 w-10 h-10  border-4 border-primary  border-spacing-2 ", // Custom width and height
      userButtonPopoverCard: "", // Custom background for the popover card
      // Custom text color for action buttons
    },
  };
  return (
    <>
      <header className="flex justify-between bg-secondary p-4 items-center  ">
        <div className=" lg:flex lg:ml-6 w-32 md:w-48">
          <Image src="/logo.svg" alt="logo" width={180} height={100} />
        </div>
        <nav className="hidden md:flex ">
          <ul className="flex lg:space-x-6 space-x-4">
            {navItems.map((item) => (
              <NavItem key={item.name} {...item} />
            ))}
          </ul>
        </nav>

        <div className=" flex space-x-4 items-center  ">
          <IconMenu2
            onClick={() => setMobileMenuActive(true)}
            className={`block text-primary md:hidden ${
              mobileMenuActive && "hidden"
            } `}
          />

          <SignedIn>
            <UserButton appearance={userButtonAppearance} />
          </SignedIn>
          <div className="hidden md:block ">
            <SignedOut>
              <div className="flex space-x-4">
                <Button className="rounded-full ">
                  <SignInButton />
                </Button>
                <Button
                  className="rounded-full  border-primary bg-secondary"
                  variant={"outline"}
                >
                  <SignUpButton />
                </Button>
              </div>
            </SignedOut>
          </div>
        </div>
      </header>
      <nav
        className={` w-screen    p-4 bg-secondary ${
          mobileMenuActive ? "block transition-all" : "hidden"
        }  `}
      >
        <ul className="flex flex-col space-y-4  justify-center items-center">
          {navItems.map((item) => (
            <div key={item.name} onClick={() => setMobileMenuActive(false)}>
              <NavItem
                key={item.name}
                {...item}
                onClick={() => setMobileMenuActive(false)}
              />
            </div>
          ))}
        </ul>
        <div className="flex justify-center">
          <IconSquareRoundedX
            onClick={() => setMobileMenuActive(false)}
            className="mt-6"
            color="red"
            size={24}
          />
        </div>
      </nav>
    </>
  );
};

export default Header;

const NavItem = ({ name, path, onClick }: NavItemType) => {
  const activePath = usePathname();
  return (
    <li key={name} onClick={onClick}>
      <Link
        href={path}
        className={`text-lg md:text-base hover:text-primary hover:font-bold  lg:text-lg transition-all ${
          activePath === path ? "text-primary font-bold   " : "text-black "
        }`}
      >
        {name}
      </Link>
    </li>
  );
};
