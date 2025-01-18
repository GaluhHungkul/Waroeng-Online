import useCategory from "@/app/zustand/useCategory";
import { FormEvent } from "react";
import Sorting from "./Sorting";
import useProducts from "@/app/zustand/useProducts";

interface PropsNavigasi {
    categorys : string[];
}

const Navigasi = (props : PropsNavigasi) => {

    const { setProducts } = useProducts()

    const { userCategory, setCategory } = useCategory()

    const handleCategory = (value:string) => {
        setCategory(value)
    }

    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();  // Mencegah form dari refresh halaman
    
        // Mengakses input dengan nama 'product'
        const productInput = (e.target as HTMLFormElement).elements.namedItem('product') as HTMLInputElement;
    
        if (productInput) {
            const productValue = productInput.value;  // Mengambil nilai dari input
            console.log(productValue);  // Menampilkan nilai dari input dengan nama 'product'
    
            // Melakukan pencarian produk dengan nilai input
            const res = await fetch(`/api/products?search=${encodeURIComponent(productValue)}`);
            const data = await res.json();
            setProducts(data)
           
        } else {
            console.error("Input with name 'product' not found");
        }
    };

  return (
    <div className='text-white h-28 justify-center flex flex-col gap-2  bg-gray-700  backdrop-blur-sm'>
        <div className="flex justify-between items-center px-2 lg:px-10">
            <form className=' flex items-center gap-2 text-sm' onSubmit={handleSearch}>
                <input id="product" type="text" placeholder='Cari Product...' className='px-2 text-black w-40 py-1 rounded'/>
                <button className="bg-gray-800 px-2 py-1 rounded hover:bg-gray-900">Cari!</button>
            </form>
            <Sorting />
        </div>
        <div className='flex items-center justify-center gap-1 w-full'>
            {props.categorys.map((el, index) => (
                <button onClick={() => handleCategory(el)} className={`${userCategory.includes(el) ? 'bg-gray-600' : 'bg-gray-800'} text-[7px] px-2 py-3 rounded-full hover:bg-gray-600 active:bg-gray-500 lg:text-[15px] `} key={index}>{el}</button>
            ))}
        </div>
    </div>
  )
}

export default Navigasi