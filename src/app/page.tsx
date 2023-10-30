"use client"

import { useEffect, useRef, useState } from "react"
import { css } from "@emotion/react"
import Button from "./components/Buttons"

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
    <div>
      <button
        css={css`
          background-color: pink;
          padding: 16px;
          border-radius: 8px;
        `}
        onClick={handleClick}
      >
        App Jacket
      </button>
      <Button onClick={handleClick}>AddJacket2</Button>
      <input
        className="placeholder:italic placeholder:text-slate-400 block bg-white w-96 border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-red-500 focus:ring-red-500 focus:ring-1 sm:text-sm"
        ref={inputRef}
        type="text"
        placeholder="name"
      />
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
    </div>
  )
}
