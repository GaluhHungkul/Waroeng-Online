import { FC } from 'react'
import ClientDetailProductPage from '@/components/detailProductPage/ClientDetailProductPage'

type Props = {
  params : Promise<{
    id : string
  }>
}

export async function generateMetadata(props : { 
  params : Promise<{ id : string }>
}) {
  
  const { id } = await props.params

  return {
    title : `Detail product for ID : ${id}`,
    description : `Detail product dengan ID : ${id}`
  }
}

const DetailProductPage : FC<Props> = async (props) => {

  const { id } = await props.params

  return <ClientDetailProductPage id={id}/>
}

export default DetailProductPage