import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import { db } from "../../../database/drizzle";
import { usersTable } from "../../../database/schema";

export default async function Home() {

  const result = await db.select().from(usersTable);
  console.log(JSON.stringify(result, null, 2));
  
  return (
    <div>
      <BookOverview
        {...sampleBooks[0]}
      />
      <BookList title="Popular Books"
        books={sampleBooks}
        containerClassName="my-28" />
    </div>
  );
}
