"use server";

import { eq } from "drizzle-orm";
import { db } from "../../../database/drizzle";
import { usersTable } from "../../../database/schema";
import { hash } from "bcryptjs";
import { signIn } from "../../../auth";

export const signInWithCredentials = async (params: Pick<AuthCredentials, "email" | "password">) => {
    const {email, password} = params;
    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false
        });

        if (result?.error) {
            return { success: false, message: result.error };
        }

        return { success: true, message: "Signed in successfully" };
    } catch (error) {
        console.log(error, "Signin error");
        return { success: false, message: "Signin error" };
    }

}

export const signUp = async (params: AuthCredentials) => {
    const { fullName, email, password, universityId, universityCard } = params;

    const existingUser = await db
    .select()
    .from (usersTable)
    .where(eq(usersTable.email, email))
    .limit(1)

    if (existingUser.length > 0) {
        return { success: false, message: "User with this email already exists." };
    }

    const hashedPassword = await hash(password, 10)

    try {
        await db.insert(usersTable).values({
            fullName,
            email,
            universityId,
            password: hashedPassword,
            universityCard
        });

        // await signInWithCredentials({user, password})

        return { success: true, message: "User created successfully" };
        
    } catch (error) {
        console.log(error, "Signup error");
        return { success: false, message: "Signup error" };
    }
};