import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function getProducts() {
  try {
    const response = await prisma.products.findMany()
    console.log(response)
    return response
  } catch (e) {
    console.error(e)
  }
}

export async function GET() {
  try {
    const products = await getProducts()
    return NextResponse.json({
      items: products,
    })
  } catch (e) {
    return NextResponse.json("Failed", {
      status: 400,
    })
  }
}
