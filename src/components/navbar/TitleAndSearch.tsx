import SearchProducts from "../SearchProducts"
import WaroengLogo from "../common/WaroengLogo"

const Navigation = () => {

  return (
     <div className={`lg:backdrop-blur-none gap-4 flex lg:text-lg items-center w-4/5 md:justify-between md:w-3/5 lg:w-1/2`}>
      <WaroengLogo />
      <SearchProducts />
    </div>
  )
}

export default Navigation