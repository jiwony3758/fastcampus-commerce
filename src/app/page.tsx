"use client"

import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [products, setProducts] = useState<
    { id: string; name: string; createdAt: string }[]
  >([])
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    fetch("http://localhost:3000/api/get-products", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setProducts(data.items))
  }, [])
  const handleClick = () => {
    if (inputRef.current === null || inputRef.current.value === "") {
      alert("name을 넣어주세요.")
      return
    } else {
      fetch(
        `http://localhost:3000/api/add-item?name=${inputRef.current.value}`,
        {
          method: "GET",
        },
      )
        .then((res) => res.json())
        .then((data) => alert(data.message))
    }
  }
  return (
    <main>
      <button onClick={handleClick}>App Jacket</button>
      <input ref={inputRef} type="text" placeholder="name" />
      <p>Product List</p>
      {products &&
        products.map((item) => (
          <div key={item.id}>
            {item.name}
            <span>{item.createdAt}</span>
          </div>
        ))}
      {/* {products &&
        products.map((item, index) => (
          <div key={index}>
            {JSON.stringify(item)}
            {item.properties &&
              Object.entries(item.properties).map(([key, value]) => (
                <button
                  style={{
                    width: 200,
                    height: 60,
                  }}
                  key={key}
                  onClick={() => {
                    fetch(
                      `http://localhost:3000/api/get-detail?pageId=${item.id}&propertyId=${value.id}`,
                      {
                        method: "GET",
                      },
                    )
                      .then((res) => res.json())
                      .then((data) => alert(JSON.stringify(data.detail)))
                  }}
                >
                  {key}
                </button>
              ))}
            <br />
            <br />
          </div>
        ))} */}
    </main>
  )
}
