import Link from "next/link"
import { unstable_ViewTransition as ViewTransition } from "react"

const PageSatu = () => {
  return (
    <div>
      <ViewTransition name="main">
        <div className="size-40 bg-blue-500 fixed rounded-full">
        </div>
        <Link href={"/page2"} className="fixed bottom-0 right-0">page1</Link>
      </ViewTransition>
    </div>
  )
}

export default PageSatu