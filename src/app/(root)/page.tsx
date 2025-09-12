import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";

export default function Home() {
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
