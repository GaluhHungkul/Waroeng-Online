import Image from "next/image"
import { FC, useState } from "react"

type Props = {
    images : string[]
    title : string
}

const ThumbnailAndImagesProduct : FC<Props> = ({ images, title }) => {

     const [currentImage, setCurrentImage] = useState(images[0])

  return (
    <>
        <section className='relative aspect-[1/1] w-full lg:flex-1 bg-gray-200 mb-2 rounded'>
            <Image src={currentImage || 'https://placehold.co/200x200.png'} alt={title ?? ""} fill sizes='90vw' className='object-center object-cover rounded'/>
        </section>
        <section className='flex gap-2.5 rounded'>
            {images.slice(0,4).map(img => (
                <Image onClick={() => setCurrentImage(img)} src={img} className={`object-cover object-center aspect-[1/1] w-20 cursor-pointer rounded bg-gray-200 duration-200  ${currentImage === img ? " -translate-y-4 bg-primary-orange shadow-md shadow-black" : ""}`} alt={title} key={img} width={700} height={700}/>
            ))}
        </section>
    </>
  )
}

export default ThumbnailAndImagesProduct