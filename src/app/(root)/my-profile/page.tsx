import React from "react";
import BookList from "@/components/BookList";
import { books, borrowRecords } from "../../../../database/schema";
import { db } from "../../../../database/drizzle";
import { desc, eq } from "drizzle-orm";

const Page = async () => {


const borrowedBooks = await db
  .select({
    id: borrowRecords.id,
    userId: borrowRecords.userId,
    bookId: borrowRecords.bookId,
    borrowDate: borrowRecords.borrowDate,
    dueDate: borrowRecords.dueDate,
    returnDate: borrowRecords.returnDate,
    status: borrowRecords.status,
    createdAt: borrowRecords.createdAt,
    // 👇 include book details
    title: books.title,
    author: books.author,
    coverUrl: books.coverUrl,
    coverColor: books.coverColor,
    genre: books.genre,
    rating: books.rating,
    totalCopies: books.totalCopies,
    description: books.description,
    videoUrl: books.videoUrl,
    availableCopies: books.availableCopies,
    summary: books.summary
  })
  .from(borrowRecords)
  .leftJoin(books, eq(borrowRecords.bookId, books.id))
  .orderBy(desc(borrowRecords.createdAt));
  console.log(borrowRecords); 
  
  return (
    <>
    <h1>Borrowed books</h1>
      <BookList title="Borrowed Books" books={borrowedBooks} />
    </>
  );
};

export default Page;
