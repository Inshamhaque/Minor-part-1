import { NextResponse } from "next/server";
import client from "@/prisma"; // Adjust the import path based on your setup

export async function GET(req: Request) {
    try {
        // Fetch contacts from the database
        const contacts = await client.user.findMany({
            select: {
                id: true, // Fetch the user ID
                name: true, // Fetch the username (or replace with the field name from your schema)
                facultyId: true, // Include the faculty ID
            },
        });

        // Return the fetched data as JSON
        return NextResponse.json({
            contactList: contacts,
        });
    } catch (error) {
        console.error("Error fetching contacts:", error);

        // Return an error response
        return NextResponse.json(
            { error: "Internal server error." },
            { status: 500 }
        );
    }
}
