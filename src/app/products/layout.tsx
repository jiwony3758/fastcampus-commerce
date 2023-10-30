import { Metadata } from "next"

export const metadata: Metadata = {
  openGraph: {
    url: "",
    type: "website",
    description: "",
    images: "",
  },
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main>{children}</main>
}
