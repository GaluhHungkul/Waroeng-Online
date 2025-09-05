import SearchProducts from "../SearchProducts"
import WaroengLogo from "../common/WaroengLogo"

const Navigation = () => {

  return (
     <div className={`z-[99] hidden  bg-primary backdrop-blur-xl  lg:backdrop-blur-none pt-16 h-screen top-0 gap-4 flex-col lg:flex lg:flex-row lg:pr-0  lg:w-max duration-300  py-2  items-end pr-5 lg:text-lg lg:gap-10 lg:static w-1/2 lg:bg-transparent lg:h-max lg:items-center lg:py-0`}>
      <WaroengLogo />
      <SearchProducts />
    </div>
  )
}

export default Navigation