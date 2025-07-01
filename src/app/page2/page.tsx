import Link from "next/link"
import { unstable_ViewTransition as ViewTransition } from "react"

const PageDua = () => {
  return (
    <div>
      <ViewTransition name="main">
        <div className="size-40 bg-blue-500 fixed rounded-full right-0">
        </div>
        <Link href={"/page1"} className="fixed bottom-0 right-0">page1</Link>
      </ViewTransition>
    </div>
  )
}

export default PageDua