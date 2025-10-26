import { FC } from 'react'
import ClientDetailProductPage from '@/components/detailProductPage/ClientDetailProductPage'
import axios from 'axios'

type Props = {
  params : Promise<{
    id : string
  }>
}

export async function generateMetadata(props : { 
  params : Promise<{ id : string }>
}) {
  
  const { id } = await props.params
  const res = await axios.get(`${process.env.NEXT_PUBLIC_DUMMY_JSON_PRODUCT_API}/${id}`)
  if(res.status !== 200) return {
    title : `Error : ${res.status}`,
    description : "Failed get detail product"
  }
  return {
    title : `${res.data.title}`,
    description : `Detail product ${res.data.title}`
  }
}

const DetailProductPage : FC<Props> = async (props) => {

  const { id } = await props.params

  return <ClientDetailProductPage id={id} />
}

export default DetailProductPage