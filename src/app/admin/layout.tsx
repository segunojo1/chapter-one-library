import React, { ReactNode } from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

import "@/styles/admin.css";
import Sidebar from "@/components/admin/Sidebar";
import { db } from "../../../database/drizzle";
import { eq } from "drizzle-orm";
import { usersTable } from "../../../database/schema";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user?.id) redirect("sign-in");

  const isAdmin = await db
    .select({ isAdmin: usersTable.role })
    .from(usersTable)
    .where(eq(usersTable.id, session.user.id))
    .limit(1)
    .then((res) => res[0]?.isAdmin === "ADMIN");

    if(!isAdmin) redirect('/')

  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar session={session} />
      <div className="admin-container">
        <p>Header</p>
        {children}
      </div>
    </main>
  );
};

export default Layout;
