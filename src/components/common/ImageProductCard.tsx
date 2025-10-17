import Image from "next/image"

const ImageProductCard = ({ thumbnail, title } : { thumbnail : string; title : string }) => {
  return (
    <div className="relative aspect-[1/1] w-full">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="50vw"
          className="object-center object-cover"
          />
      </div>
  )
}

export default ImageProductCard