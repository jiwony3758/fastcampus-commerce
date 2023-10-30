import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function getProducts(skip: number, take: number) {
  try {
    const response = await prisma.products.findMany({
      skip: skip,
      take: take,
    })
    console.log(response)
    return response
  } catch (e) {
    console.error(e)
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const skip = searchParams.get("skip")
  const take = searchParams.get("take")
  if (skip === null || take === null) {
    return NextResponse.json(
      {
        message: "no skip, take",
      },
      {
        status: 400,
      },
    )
  } else {
    try {
      const products = await getProducts(Number(skip), Number(take))
      return NextResponse.json({
        items: products,
      })
    } catch (e) {
      return NextResponse.json("Failed", {
        status: 400,
      })
    }
  }
}
