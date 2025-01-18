'use client'

import {  useEffect } from 'react'
import ListProducts from '../Components/products/ListProducts'
import Navigasi from '../Components/products/Navigasi'
import useCategory from '../zustand/useCategory'
import { Products } from '@/types/products'
import useProducts from '../zustand/useProducts'


const ProductsPage:React.FC = () => {

  const { products, setProducts } = useProducts()

  const { userCategory } = useCategory()


  const categorys:string[] = ['Electronics', 'Office Supplie', 'Fashion']
 
    useEffect(() => {
      const fetchProducts = async () => {
        const response = await fetch("/api/products")
        const result = await response.json()
        if(!userCategory.length) return setProducts(result)
        setProducts(result.filter((item:Products) => userCategory.includes(item.category)))
      } 
      fetchProducts()
    },[userCategory])

   
  return (
    <div>
      <Navigasi categorys={categorys} />
      <ListProducts products={products}/>
    </div>
  )
}

export default ProductsPage