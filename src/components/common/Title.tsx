import { ReactNode } from "react"

const Title = ({ children, className } : { children : ReactNode, className? : string }) => {
  return (
    <h1  className={`font-bold mb-10 text-xl before:border-black before:-bottom-2 after:-bottom-4 lg:text-2xl lg:mb-20 w-max  before:absolute before:w-7/12 before:left-2 before:border-b-6 before:rounded-full lg:before:-bottom-2 before:h-1 after:h-1 after:bg-black before:bg-black after:absolute after:border-black after:w-7/12 after:right-2 lg:after:-bottom-4  after:rounded-full ${className}`}>{children}</h1>
  )
}

export default Title