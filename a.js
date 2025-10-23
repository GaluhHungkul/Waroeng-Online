const a = async () => {
    const res = await  fetch("https://dummyjson.com/products")
    const data = await res.json()
    console.log(data.products.map(p => p.tags))
}

a()