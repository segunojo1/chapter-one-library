import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import { db } from "../../../database/drizzle";
import { books, usersTable } from "../../../database/schema";
import { auth } from "../../../auth";
import { desc } from "drizzle-orm";

export default async function Home() {

  const session = await auth();

  const latestBooks = (await db.select().from(books).limit(10).orderBy(desc(books.createdAt))) as Book[]

  const result = await db.select().from(usersTable);
  console.log(JSON.stringify(result, null, 2));
  
  return (
    <div>
      <BookOverview
        {...latestBooks[0]} userId={session?.user?.id as string}
      />
      <BookList title="Popular Books"
        books={latestBooks.slice(1)}
        containerClassName="my-28" />
    </div>
  );
}
