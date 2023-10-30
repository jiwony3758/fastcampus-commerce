import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function updateProduct(id: number, contents: string) {
  try {
    const response = await prisma.products.update({
      where: {
        id,
      },
      data: {
        contents,
      },
    })
    console.log(response)
    return response
  } catch (e) {
    console.error(e)
  }
}

export async function POST(request: NextRequest) {
  const { id, contents } = await request.json()
  if (id === null || contents === null) {
    return NextResponse.json(
      { message: "no contents or id" },
      {
        status: 400,
      },
    )
  }
  try {
    const products = await updateProduct(Number(id), contents)
    return NextResponse.json({
      items: products,
    })
  } catch (e) {
    return NextResponse.json("Failed", {
      status: 400,
    })
  }
}
