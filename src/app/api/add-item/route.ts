import { NextRequest, NextResponse } from "next/server"
import { Client } from "@notionhq/client"
const notion = new Client({
  auth: process.env.NOTION_SECRET,
})
const databaseId = process.env.NOTION_DATABASE_ID

async function addItem(name: string) {
  try {
    if (typeof databaseId === "string") {
      const response = await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
      })
      console.log(response)
    }
  } catch (e) {
    console.error(JSON.stringify(e))
  }
}
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const name = searchParams.get("name")
  if (name === null) {
    return new Response(null, { status: 404 })
  }
  try {
    await addItem(name)
    return NextResponse.json({
      message: "Success",
    })
  } catch (e) {
    return NextResponse.json(
      {
        message: "Success",
      },
      {
        status: 400,
      },
    )
  }
}
