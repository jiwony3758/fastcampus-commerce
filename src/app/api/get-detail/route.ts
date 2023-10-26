import { NextRequest, NextResponse } from "next/server"
import { Client } from "@notionhq/client"
const notion = new Client({
  auth: process.env.NOTION_SECRET,
})
const databaseId = process.env.NOTION_DATABASE_ID

async function getDetail(pageId: string, propertyId: string) {
  if (databaseId) {
    try {
      const response = await notion.pages.properties.retrieve({
        page_id: pageId,
        property_id: propertyId,
      })
      console.log(response)
      return response
    } catch (e) {
      console.error(JSON.stringify(e))
    }
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const pageId = searchParams.get("pageId")
  const propertyId = searchParams.get("propertyId")
  if (pageId && propertyId) {
    try {
      const response = await getDetail(pageId, propertyId)
      return NextResponse.json({
        detail: response,
      })
    } catch (e) {
      return NextResponse.json("Failed", {
        status: 400,
      })
    }
  }
}
