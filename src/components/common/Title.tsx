import { ReactNode } from "react"

const Title = ({ children, className } : { children : ReactNode, className? : string }) => {
  return (
    <h1  className={`font-bold mb-10 text-xl  text-black after:border-primary-orange before:border-blue-500 before:-bottom-2 after:-bottom-4 md:text-2xl lg:mb-20 w-max  before:absolute before:w-3/5 before:left-2 before:border-b-[5px] after:border-b-[5px]  before:rounded-full lg:before:-bottom-2 before:h-1 after:h-1   after:absolute   after:w-3/5 after:right-2 lg:after:-bottom-4  after:rounded-full ${className}`}>- {children}</h1>
  )
}

export default Title