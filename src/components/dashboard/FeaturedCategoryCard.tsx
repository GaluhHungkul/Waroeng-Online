import { ExternalLink } from "lucide-react";
import Image from "next/image"
import Link from "next/link";
import { FC } from "react";

type Props = {
    item : {
      id : number;
      title : string;
      image : string;
      description : string;
      href : string;
    }
}

const FeaturedCategoryCard : FC<Props> = ({ item }) => {
  return (
    <div
      key={item.id}
      className="group shadow-sm overflow-hidden h-max hover:shadow-lg transition-all relative"
    >
      <div className="relative w-full h-[450px] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="70vw"
          className="object-cover object-center duration-300 group-hover:brightness-75"
        />
      </div>
      <div className="p-6 absolute bottom-0 text-white group-hover:-translate-y-4 duration-300">
        <h3 className="text-2xl font-semibold mb-2">
          {item.title}
        </h3>
        <p className="text- font-semibold mb-4">
          {item.description}
        </p>
        <Link href={item.href} style={{ background : "#ff6b00" }} className="rounded font-bold px-4 w-max py-2 text-white flex  gap-4">Buy Now <ExternalLink className="relative bottom-0.5"/></Link>
      </div>
    </div>
  )
}

export default FeaturedCategoryCard