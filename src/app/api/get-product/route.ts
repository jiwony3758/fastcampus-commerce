import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function getProduct(id: number) {
  try {
    const response = await prisma.products.findUnique({
      where: {
        id: id,
      },
    })
    console.log(response)
    return response
  } catch (e) {
    console.error(e)
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const productId = searchParams.get("id")
  if (productId === null) {
    return NextResponse.json(
      { message: "no id" },
      {
        status: 400,
      },
    )
  }
  try {
    const products = await getProduct(Number(productId))
    return NextResponse.json({
      items: products,
    })
  } catch (e) {
    return NextResponse.json("Failed", {
      status: 400,
    })
  }
}
