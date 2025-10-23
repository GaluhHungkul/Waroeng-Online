import { FC } from 'react'
import ClientDetailProductPage from '@/components/detailProductPage/ClientDetailProductPage'

type Props = {
  params : Promise<{
    id : string
  }>
}

const DetailProductPage : FC<Props> = async (props) => {

  const { id } = await props.params

  return <ClientDetailProductPage id={id}/>
}

export default DetailProductPage