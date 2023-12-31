"use client"

import { products } from "@prisma/client"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"

// import ImageGallery from "react-image-gallery";

const TAKE = 9

export default function Products() {
  const [skip, setSkip] = useState(0)
  const [products, setProducts] = useState<products[]>([])

  useEffect(() => {
    fetch(`http://localhost:3000/api/get-products?skip=0&take=${TAKE}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setProducts(data.items))
  }, [])

  const getProducts = useCallback(() => {
    const next = skip + TAKE

    fetch(`http://localhost:3000/api/get-products?skip=${skip}&take=${TAKE}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const list = products.concat(data.items)
        setProducts(list)
      })
    setSkip(next)
  }, [skip, products])

  return (
    <div className="px-36 mt-36 mb-36">
      {products && (
        <div className="grid grid-cols-3 gap-5">
          {products.map((item) => (
            <div key={item.id}>
              <Image
                className="rounded"
                alt={item.name}
                src={item.image_url ?? ""}
                width={300}
                height={200}
              />
              <div className="flex">
                <span>{item.name}</span>
                <span className="ml-auto">
                  {item.price.toLocaleString("ko-KR")}
                </span>
              </div>
              <span className="text-zinc-400">
                {item.category_id === 1 && "의류"}
              </span>
            </div>
          ))}
        </div>
      )}
      <button
        className="w-full rounded mt-20 bg-zinc-200 p-4"
        onClick={getProducts}
      >
        더보기
      </button>
    </div>
  )
}
