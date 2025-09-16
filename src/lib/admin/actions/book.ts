"use server";

import { db } from "../../../../database/drizzle";

const createBook = async (params: BookParams) => {
    try{
        const newBook = await db.insert(books)
    } catch(error){
        console.log(error);
        return {
            success: false,
            message: "Error while creating book"
        }
        
    }
}