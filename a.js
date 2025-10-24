const a = async () => {
    const res = await  fetch("https://dummyjson.com/products")
    const data = await res.json()
    console.log(data.products.sort((a,b) => b.discountPercentage - a.discountPercentage).map(p => [p.id, p.discountPercentage]))
}

a()