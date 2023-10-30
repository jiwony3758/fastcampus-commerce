"use client"

import CustomEditor from "@/app/components/Editor"
import { EditorState, convertFromRaw } from "draft-js"
import Image from "next/image"
import Carousel from "nuka-carousel"
import { useEffect, useState } from "react"

// import ImageGallery from "react-image-gallery";

export const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
  {
    original: "https://picsum.photos/id/1020/1000/600/",
    thumbnail: "https://picsum.photos/id/1020/250/150/",
  },
  {
    original: "https://picsum.photos/id/1016/1000/600/",
    thumbnail: "https://picsum.photos/id/1016/250/150/",
  },
  {
    original: "https://picsum.photos/id/1014/1000/600/",
    thumbnail: "https://picsum.photos/id/1014/250/150/",
  },
]

export default function Page({ params }: { params: { id: number } }) {
  // const [index, setIndex] = useState(0);
  const { id: productId } = params
  const [editorState, setEditorState] = useState<EditorState | undefined>(
    undefined,
  )
  useEffect(() => {
    if (productId !== null) {
      fetch(`http://localhost:3000/api/get-product?id=${productId}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.items.contents) {
            setEditorState(
              EditorState.createWithContent(
                convertFromRaw(JSON.parse(data.items.contents)),
              ),
            )
          } else {
            setEditorState(EditorState.createEmpty())
          }
        })
    }
  }, [])

  return (
    <>
      {/* <ImageGallery items={images}/> */}
      <Carousel animation="zoom" withoutControls={true} speed={10}>
        {images.map((item) => (
          <Image
            key={item.original}
            src={item.original}
            alt="image"
            width={1000}
            height={600}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        ))}
      </Carousel>
      {editorState != null && (
        <CustomEditor editorState={editorState} readOnly />
      )}
    </>
  )
}
