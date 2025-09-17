import Header from "@/components/Header";
import React, { ReactNode } from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "../../../database/drizzle";
import { usersTable } from "../../../database/schema";
import { eq } from "drizzle-orm";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) redirect("/sign-in");
  
    const isAdmin = await db
      .select({ isAdmin: usersTable.role })
      .from(usersTable)
      .where(eq(usersTable.id, session.user.id))
      .limit(1)
      .then((res) => res[0]?.isAdmin === "ADMIN");

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between w-full">
        <Header />
          <Button asChild className={`${!isAdmin && "hidden"}`}>
            <Link href="/admin/books/new">Go to Admin dashboard</Link>
          </Button>
        </div>
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
