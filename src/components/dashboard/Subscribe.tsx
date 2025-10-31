const Subscribe = () => {
  return (
    <div className="text-center mt-10">
        <h1 className="text-2xl text-gray-600 font-bold lg:text-3xl">Subscribe now & get 20% off</h1>
        <p className="text-gray-500 font-semibold mt-2 lg:text-xl">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo, optio.</p>
        <div className="flex border justify-center mx-auto mt-10  rounded overflow-hidden md:text-xl lg:w-2/3 lg:mt-12"> 
            <input type="text" className="flex-[2] px-2 outline-none" placeholder="Input your email"/>
            <button style={{ background : "#ff6b00" }} className="text-white flex-1 py-2 md:py-4 font-bold">Subscribe</button>
        </div>
    </div>
  )
}

export default Subscribe