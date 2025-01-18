const Header = (props : { title : string }) => {
  return (
    <div className="h-20  static pl-20 shadow-lg top-0 text-white border-gray-700  font-bold text-2xl content-center bg-opacity-50 border-b w-screen">
        {props.title}
    </div>
  )
}

export default Header