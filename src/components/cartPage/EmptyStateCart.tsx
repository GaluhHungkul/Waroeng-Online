import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const EmptyStateCart = () => {
  return (
    <div>
        <Image className="mt-20" src={"/assets/img/empty_state.png"} alt="Your Cart is Empty" width={500} height={500}/>
        <h1 className="text-center mt-4 font-bold text-xl text-gray-400">Your Cart is Empty</h1>
        <Link href={"/products"} className="flex justify-center text-lg items-center gap-2 mt-4 font-semibold text-gray-700 hover:underline">
            <ArrowLeft />
            <p>Get some products</p>
        </Link>
    </div>
  )
}

export default EmptyStateCart