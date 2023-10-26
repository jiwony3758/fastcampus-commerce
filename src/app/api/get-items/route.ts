import { NextResponse } from "next/server"
import { Client } from "@notionhq/client"
const notion = new Client({
  auth: process.env.NOTION_SECRET,
})
const databaseId = process.env.NOTION_DATABASE_ID
async function getItems() {
  if (databaseId) {
    try {
      const response = await notion.databases.query({
        database_id: databaseId,
        sorts: [
          {
            property: "price",
            direction: "ascending",
          },
        ],
      })
      console.log(response)
      return response
    } catch (e) {
      console.error(JSON.stringify(e))
    }
  }
}

export async function GET() {
  try {
    const response = await getItems()
    return NextResponse.json({
      items: response?.results,
    })
  } catch (e) {
    return NextResponse.json("Failed", {
      status: 400,
    })
  }
}
