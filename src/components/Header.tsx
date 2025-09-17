
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "../../auth";

const Header = () => {
 
  return (
    <header className="my-10 flex justify-between gap-5 h-fit">
      <Link href={"/"} className="h-fit">
        <Image
          src="/icons/logo.svg"
          alt="Chapter One Logo"
          width={40}
          height={40}
          className=""
        />
      </Link>
      <ul className="flex items-center gap-8">
        
        <li className="h-fit">
          <form
            action={async () => {
              "use server";

              await signOut();
            }}
            className="mb-10"
          >
            <Button>Logout</Button>
          </form>

        </li>
      </ul>
    </header>
  );
};

export default Header;
