import Product from '../models/Product'
import ConnectToDatabase from './mongoose'

const addStock = async () => {

    await ConnectToDatabase()

    console.log(Product)
}

addStock()