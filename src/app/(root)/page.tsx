import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { testbooks } from "../../../constants";

export default function Home() {
  return (
    <div>
      <BookOverview
        {...testbooks[0]}
      />
      <BookList title="Popular Books"
        books={testbooks}
        containerClassName="my-28" />
    </div>
  );
}
