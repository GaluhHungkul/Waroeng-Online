import Image from "next/image"

const ProductImage = ({ img, name } : { img : string; name : string }) => {
  return (
    <section className="relative bg-gray-200 rounded aspect-[1/1] w-1/2 md:w-72 lg:w-96">
        <Image src={img} fill alt={name}/>
    </section>
  )
}

export default ProductImage