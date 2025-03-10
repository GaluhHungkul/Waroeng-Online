// const products = [
//     { _id: 1, name: 'Samsung Galaxy S23', price: 12000000, description: 'Smartphone flagship dengan layar AMOLED', img: 'samsung-galaxy-s23.jpg', rate: { value: 4.5, count: 500 }, category: 'Electronics', qty: 20 },
//     { _id: 2, name: 'Apple iPhone 14', price: 15000000, description: 'iPhone terbaru dengan chip A15 Bionic', img: 'iphone-14.jpg', rate: { value: 4.7, count: 600 }, category: 'Electronics', qty: 25 },
//     { _id: 3, name: 'Xiaomi Redmi Note 11', price: 3500000, description: 'Smartphone budget dengan performa tinggi', img: 'xiaomi-redmi-note-11.jpg', rate: { value: 4.2, count: 400 }, category: 'Electronics', qty: 30 },
//     { _id: 4, name: 'Sony WH-1000XM4', price: 6000000, description: 'Headphone noise-cancelling dengan suara jernih', img: 'sony-wh-1000xm4.jpg', rate: { value: 4.8, count: 450 }, category: 'Electronics', qty: 15 },
//     { _id: 5, name: 'Bose QuietComfort 35 II', price: 5500000, description: 'Headphone dengan teknologi pembatal suara terbaik', img: 'bose-quietcomfort-35-ii.jpg', rate: { value: 4.7, count: 350 }, category: 'Electronics', qty: 18 },
//     { _id: 6, name: 'MacBook Pro 14"', price: 30000000, description: 'Laptop premium dengan chip M1 Pro untuk kinerja tinggi', img: 'macbook-pro-14.jpg', rate: { value: 4.9, count: 700 }, category: 'Electronics', qty: 10 },
//     { _id: 7, name: 'Dell XPS 13', price: 20000000, description: 'Laptop premium dengan layar InfinityEdge dan desain tipis', img: 'dell-xps-13.jpg', rate: { value: 4.5, count: 300 }, category: 'Electronics', qty: 12 },
//     { _id: 8, name: 'Samsung QLED TV 55"', price: 15000000, description: 'TV pintar dengan kualitas gambar luar biasa', img: 'samsung-qled-tv-55.jpg', rate: { value: 4.6, count: 200 }, category: 'Electronics', qty: 8 },
//     { _id: 9, name: 'LG OLED TV 65"', price: 25000000, description: 'TV OLED 4K dengan kualitas gambar terbaik', img: 'lg-oled-tv-65.jpg', rate: { value: 4.8, count: 150 }, category: 'Electronics', qty: 7 },
//     { _id: 10, name: 'Amazon Echo Dot 4th Gen', price: 1000000, description: 'Smart speaker dengan Alexa untuk rumah pintar', img: 'amazon-echo-dot.jpg', rate: { value: 4.3, count: 600 }, category: 'Electronics', qty: 40 },
  
//     { _id: 11, name: 'Nike Air Max 90', price: 1500000, description: 'Sepatu olahraga dengan desain klasik dan kenyamanan tinggi', img: 'nike-air-max-90.jpg', rate: { value: 4.4, count: 500 }, category: 'Fashion', qty: 25 },
//     { _id: 12, name: 'Adidas Ultra Boost', price: 2000000, description: 'Sepatu lari dengan teknologi bantalan Boost', img: 'adidas-ultra-boost.jpg', rate: { value: 4.7, count: 400 }, category: 'Fashion', qty: 30 },
//     { _id: 13, name: 'Puma RS-X3', price: 1200000, description: 'Sepatu stylish dengan desain modern dan kenyamanan ekstra', img: 'puma-rs-x3.jpg', rate: { value: 4.3, count: 250 }, category: 'Fashion', qty: 20 },
//     { _id: 14, name: 'Levi\'s 501 Original Fit', price: 800000, description: 'Jeans klasik dengan potongan original', img: 'levis-501.jpg', rate: { value: 4.6, count: 550 }, category: 'Fashion', qty: 15 },
//     { _id: 15, name: 'Zara Men\'s Shirt', price: 500000, description: 'Kemeja pria dengan desain stylish untuk acara formal', img: 'zara-shirt.jpg', rate: { value: 4.4, count: 350 }, category: 'Fashion', qty: 25 },
//     { _id: 16, name: 'H&M Slim Fit Jeans', price: 400000, description: 'Jeans slim fit untuk penampilan kasual dan trendy', img: 'hm-slim-fit-jeans.jpg', rate: { value: 4.2, count: 200 }, category: 'Fashion', qty: 18 },
//     { _id: 17, name: 'Gucci GG Marmont Bag', price: 25000000, description: 'Tas mewah dengan logo Gucci klasik', img: 'gucci-gg-marmont-bag.jpg', rate: { value: 4.9, count: 150 }, category: 'Fashion', qty: 10 },
//     { _id: 18, name: 'Rolex Submariner Watch', price: 80000000, description: 'Jam tangan mewah dengan desain elegan dan tahan air', img: 'rolex-submariner.jpg', rate: { value: 5, count: 50 }, category: 'Fashion', qty: 5 },
//     { _id: 19, name: 'Ray-Ban Aviator Sunglasses', price: 2500000, description: 'Kacamata hitam dengan desain ikonik dari Ray-Ban', img: 'rayban-aviator.jpg', rate: { value: 4.7, count: 300 }, category: 'Fashion', qty: 30 },
  
//     { _id: 20, name: 'Nike Training T-Shirt', price: 600000, description: 'Kaos olahraga nyaman untuk latihan', img: 'nike-training-tshirt.jpg', rate: { value: 4.3, count: 250 }, category: 'Fashion', qty: 35 },
    
//     { _id: 21, name: 'HP LaserJet Pro MFP M428fdw', price: 4500000, description: 'Printer multifungsi dengan fitur wireless', img: 'hp-laserjet.jpg', rate: { value: 4.5, count: 350 }, category: 'Office Supplies', qty: 10 },
//     { _id: 22, name: 'Canon EOS 5D Mark IV', price: 50000000, description: 'Kamera DSLR profesional dengan kualitas gambar tinggi', img: 'canon-eos-5d.jpg', rate: { value: 4.9, count: 100 }, category: 'Electronics', qty: 5 },
//     { _id: 23, name: 'Apple iPad Pro 12.9"', price: 24000000, description: 'Tablet premium dengan performa dan layar cemerlang', img: 'ipad-pro.jpg', rate: { value: 4.8, count: 400 }, category: 'Electronics', qty: 15 },
//     { _id: 24, name: 'Wacom Cintiq Pro 24', price: 34000000, description: 'Tablet grafis untuk desainer profesional', img: 'wacom-cintiq-pro.jpg', rate: { value: 4.7, count: 250 }, category: 'Electronics', qty: 7 },
//     { _id: 25, name: 'Microsoft Surface Laptop 4', price: 22000000, description: 'Laptop Windows 10 dengan desain tipis dan layar sentuh', img: 'surface-laptop.jpg', rate: { value: 4.6, count: 500 }, category: 'Electronics', qty: 10 },
  
//     { _id: 26, name: 'GoPro HERO10', price: 7500000, description: 'Kamera aksi dengan kemampuan 5K', img: 'gopro-hero10.jpg', rate: { value: 4.8, count: 300 }, category: 'Electronics', qty: 8 },
//     { _id: 27, name: 'Sony PlayStation 5', price: 9500000, description: 'Konsol game terbaru dengan grafis 4K', img: 'ps5.jpg', rate: { value: 4.9, count: 600 }, category: 'Electronics', qty: 12 },
//     { _id: 28, name: 'Microsoft Xbox Series X', price: 9500000, description: 'Konsol game dengan performa luar biasa dan kompatibilitas 4K', img: 'xbox-series-x.jpg', rate: { value: 4.8, count: 500 }, category: 'Electronics', qty: 14 },
//     { _id: 29, name: 'Razer Blade 15', price: 22000000, description: 'Laptop gaming dengan desain tipis dan performa tinggi', img: 'razer-blade-15.jpg', rate: { value: 4.7, count: 350 }, category: 'Electronics', qty: 6 },
//     { _id: 30, name: 'Apple AirPods Pro 2', price: 3500000, description: 'Earbuds nirkabel dengan kualitas suara premium', img: 'airpods-pro.jpg', rate: { value: 4.8, count: 600 }, category: 'Electronics', qty: 25 },
  
//     { _id: 31, name: 'Amazon Kindle Paperwhite', price: 2500000, description: 'E-reader dengan layar anti-silau dan baterai tahan lama', img: 'kindle-paperwhite.jpg', rate: { value: 4.5, count: 200 }, category: 'Electronics', qty: 12 },
//     { _id: 32, name: 'Apple Mac Mini M1', price: 15000000, description: 'Mini PC dengan chip M1 untuk performa luar biasa', img: 'mac-mini-m1.jpg', rate: { value: 4.7, count: 400 }, category: 'Electronics', qty: 10 },
//     { _id: 33, name: 'Lenovo ThinkPad X1 Carbon', price: 22000000, description: 'Laptop ringan dan tahan lama dengan performa tinggi', img: 'lenovo-thinkpad-x1.jpg', rate: { value: 4.6, count: 300 }, category: 'Electronics', qty: 8 },
//     { _id: 34, name: 'iRobot Roomba i7+', price: 15000000, description: 'Robot penyedot debu dengan teknologi pemetaan rumah', img: 'irobot-roomba-i7.jpg', rate: { value: 4.7, count: 250 }, category: 'Electronics', qty: 5 },
//     { _id: 35, name: 'DJI Mavic Air 2', price: 20000000, description: 'Drone dengan kamera 4K dan durasi terbang lama', img: 'dji-mavic-air2.jpg', rate: { value: 4.8, count: 200 }, category: 'Electronics', qty: 7 },
  
//     { _id: 36, name: 'Harman Kardon Onyx Studio 6', price: 3000000, description: 'Speaker Bluetooth dengan suara jernih dan bass kuat', img: 'harman-kardon-onyx.jpg', rate: { value: 4.5, count: 350 }, category: 'Electronics', qty: 6 },
//     { _id: 37, name: 'Xiaomi Mi Band 7', price: 800000, description: 'Fitness tracker dengan berbagai fitur kesehatan', img: 'xiaomi-mi-band-7.jpg', rate: { value: 4.4, count: 450 }, category: 'Electronics', qty: 25 },
//     { _id: 38, name: 'Oculus Quest 2', price: 8000000, description: 'VR headset dengan performa tinggi dan game VR seru', img: 'oculus-quest-2.jpg', rate: { value: 4.7, count: 350 }, category: 'Electronics', qty: 8 },
//     { _id: 39, name: 'Google Nest Hub Max', price: 4500000, description: 'Smart display dengan Google Assistant dan kamera', img: 'google-nest-hub-max.jpg', rate: { value: 4.6, count: 200 }, category: 'Electronics', qty: 10 },
//     { _id: 40, name: 'Samsung Galaxy Watch 5', price: 4000000, description: 'Smartwatch dengan fitur kesehatan dan performa tinggi', img: 'samsung-galaxy-watch5.jpg', rate: { value: 4.7, count: 300 }, category: 'Electronics', qty: 15 }
//   ]


// const productsNoId = products.map(({ _id, qty, ...rest }) => rest)




for (let index = 0; index < 40; index++) {
  // let array = []
  productsNoId[index].img = `https://placehold.co/200x200.png?text=${index + 1}`
  // if(array.length == 40) {console.log(array) }
  if(index == 39) console.log(productsNoId)
}

let aray = [
  {
    name: 'Samsung Galaxy S23',
    price: 12000000,
    description: 'Smartphone flagship dengan layar AMOLED',
    img: 'https://placehold.co/200x200.png?text=1',
    rate: { value: 4.5, count: 500 },
    category: 'Electronics'
  },
  {
    name: 'Apple iPhone 14',
    price: 15000000,
    description: 'iPhone terbaru dengan chip A15 Bionic',
    img: 'https://placehold.co/200x200.png?text=2',
    rate: { value: 4.7, count: 600 },
    category: 'Electronics'
  },
  {
    name: 'Xiaomi Redmi Note 11',
    price: 3500000,
    description: 'Smartphone budget dengan performa tinggi',
    img: 'https://placehold.co/200x200.png?text=3',
    rate: { value: 4.2, count: 400 },
    category: 'Electronics'
  },
  {
    name: 'Sony WH-1000XM4',
    price: 6000000,
    description: 'Headphone noise-cancelling dengan suara jernih',
    img: 'https://placehold.co/200x200.png?text=4',
    rate: { value: 4.8, count: 450 },
    category: 'Electronics'
  },
  {
    name: 'Bose QuietComfort 35 II',
    price: 5500000,
    description: 'Headphone dengan teknologi pembatal suara terbaik',
    img: 'https://placehold.co/200x200.png?text=5',
    rate: { value: 4.7, count: 350 },
    category: 'Electronics'
  },
  {
    name: 'MacBook Pro 14"',
    price: 30000000,
    description: 'Laptop premium dengan chip M1 Pro untuk kinerja tinggi',
    img: 'https://placehold.co/200x200.png?text=6',
    rate: { value: 4.9, count: 700 },
    category: 'Electronics'
  },
  {
    name: 'Dell XPS 13',
    price: 20000000,
    description: 'Laptop premium dengan layar InfinityEdge dan desain tipis',
    img: 'https://placehold.co/200x200.png?text=7',
    rate: { value: 4.5, count: 300 },
    category: 'Electronics'
  },
  {
    name: 'Samsung QLED TV 55"',
    price: 15000000,
    description: 'TV pintar dengan kualitas gambar luar biasa',
    img: 'https://placehold.co/200x200.png?text=8',
    rate: { value: 4.6, count: 200 },
    category: 'Electronics'
  },
  {
    name: 'LG OLED TV 65"',
    price: 25000000,
    description: 'TV OLED 4K dengan kualitas gambar terbaik',
    img: 'https://placehold.co/200x200.png?text=9',
    rate: { value: 4.8, count: 150 },
    category: 'Electronics'
  },
  {
    name: 'Amazon Echo Dot 4th Gen',
    price: 1000000,
    description: 'Smart speaker dengan Alexa untuk rumah pintar',
    img: 'https://placehold.co/200x200.png?text=10',
    rate: { value: 4.3, count: 600 },
    category: 'Electronics'
  },
  {
    name: 'Nike Air Max 90',
    price: 1500000,
    description: 'Sepatu olahraga dengan desain klasik dan kenyamanan tinggi',
    img: 'https://placehold.co/200x200.png?text=11',
    rate: { value: 4.4, count: 500 },
    category: 'Fashion'
  },
  {
    name: 'Adidas Ultra Boost',
    price: 2000000,
    description: 'Sepatu lari dengan teknologi bantalan Boost',
    img: 'https://placehold.co/200x200.png?text=12',
    rate: { value: 4.7, count: 400 },
    category: 'Fashion'
  },
  {
    name: 'Puma RS-X3',
    price: 1200000,
    description: 'Sepatu stylish dengan desain modern dan kenyamanan ekstra',
    img: 'https://placehold.co/200x200.png?text=13',
    rate: { value: 4.3, count: 250 },
    category: 'Fashion'
  },
  {
    name: "Levi's 501 Original Fit",
    price: 800000,
    description: 'Jeans klasik dengan potongan original',
    img: 'https://placehold.co/200x200.png?text=14',
    rate: { value: 4.6, count: 550 },
    category: 'Fashion'
  },
  {
    name: "Zara Men's Shirt",
    price: 500000,
    description: 'Kemeja pria dengan desain stylish untuk acara formal',
    img: 'https://placehold.co/200x200.png?text=15',
    rate: { value: 4.4, count: 350 },
    category: 'Fashion'
  },
  {
    name: 'H&M Slim Fit Jeans',
    price: 400000,
    description: 'Jeans slim fit untuk penampilan kasual dan trendy',
    img: 'https://placehold.co/200x200.png?text=16',
    rate: { value: 4.2, count: 200 },
    category: 'Fashion'
  },
  {
    name: 'Gucci GG Marmont Bag',
    price: 25000000,
    description: 'Tas mewah dengan logo Gucci klasik',
    img: 'https://placehold.co/200x200.png?text=17',
    rate: { value: 4.9, count: 150 },
    category: 'Fashion'
  },
  {
    name: 'Rolex Submariner Watch',
    price: 80000000,
    description: 'Jam tangan mewah dengan desain elegan dan tahan air',
    img: 'https://placehold.co/200x200.png?text=18',
    rate: { value: 5, count: 50 },
    category: 'Fashion'
  },
  {
    name: 'Ray-Ban Aviator Sunglasses',
    price: 2500000,
    description: 'Kacamata hitam dengan desain ikonik dari Ray-Ban',
    img: 'https://placehold.co/200x200.png?text=19',
    rate: { value: 4.7, count: 300 },
    category: 'Fashion'
  },
  {
    name: 'Nike Training T-Shirt',
    price: 600000,
    description: 'Kaos olahraga nyaman untuk latihan',
    img: 'https://placehold.co/200x200.png?text=20',
    rate: { value: 4.3, count: 250 },
    category: 'Fashion'
  },
  {
    name: 'HP LaserJet Pro MFP M428fdw',
    price: 4500000,
    description: 'Printer multifungsi dengan fitur wireless',
    img: 'https://placehold.co/200x200.png?text=21',
    rate: { value: 4.5, count: 350 },
    category: 'Office Supplies'
  },
  {
    name: 'Canon EOS 5D Mark IV',
    price: 50000000,
    description: 'Kamera DSLR profesional dengan kualitas gambar tinggi',
    img: 'https://placehold.co/200x200.png?text=22',
    rate: { value: 4.9, count: 100 },
    category: 'Electronics'
  },
  {
    name: 'Apple iPad Pro 12.9"',
    price: 24000000,
    description: 'Tablet premium dengan performa dan layar cemerlang',
    img: 'https://placehold.co/200x200.png?text=23',
    rate: { value: 4.8, count: 400 },
    category: 'Electronics'
  },
  {
    name: 'Wacom Cintiq Pro 24',
    price: 34000000,
    description: 'Tablet grafis untuk desainer profesional',
    img: 'https://placehold.co/200x200.png?text=24',
    rate: { value: 4.7, count: 250 },
    category: 'Electronics'
  },
  {
    name: 'Microsoft Surface Laptop 4',
    price: 22000000,
    description: 'Laptop Windows 10 dengan desain tipis dan layar sentuh',
    img: 'https://placehold.co/200x200.png?text=25',
    rate: { value: 4.6, count: 500 },
    category: 'Electronics'
  },
  {
    name: 'GoPro HERO10',
    price: 7500000,
    description: 'Kamera aksi dengan kemampuan 5K',
    img: 'https://placehold.co/200x200.png?text=26',
    rate: { value: 4.8, count: 300 },
    category: 'Electronics'
  },
  {
    name: 'Sony PlayStation 5',
    price: 9500000,
    description: 'Konsol game terbaru dengan grafis 4K',
    img: 'https://placehold.co/200x200.png?text=27',
    rate: { value: 4.9, count: 600 },
    category: 'Electronics'
  },
  {
    name: 'Microsoft Xbox Series X',
    price: 9500000,
    description: 'Konsol game dengan performa luar biasa dan kompatibilitas 4K',
    img: 'https://placehold.co/200x200.png?text=28',
    rate: { value: 4.8, count: 500 },
    category: 'Electronics'
  },
  {
    name: 'Razer Blade 15',
    price: 22000000,
    description: 'Laptop gaming dengan desain tipis dan performa tinggi',
    img: 'https://placehold.co/200x200.png?text=29',
    rate: { value: 4.7, count: 350 },
    category: 'Electronics'
  },
  {
    name: 'Apple AirPods Pro 2',
    price: 3500000,
    description: 'Earbuds nirkabel dengan kualitas suara premium',
    img: 'https://placehold.co/200x200.png?text=30',
    rate: { value: 4.8, count: 600 },
    category: 'Electronics'
  },
  {
    name: 'Amazon Kindle Paperwhite',
    price: 2500000,
    description: 'E-reader dengan layar anti-silau dan baterai tahan lama',
    img: 'https://placehold.co/200x200.png?text=31',
    rate: { value: 4.5, count: 200 },
    category: 'Electronics'
  },
  {
    name: 'Apple Mac Mini M1',
    price: 15000000,
    description: 'Mini PC dengan chip M1 untuk performa luar biasa',
    img: 'https://placehold.co/200x200.png?text=32',
    rate: { value: 4.7, count: 400 },
    category: 'Electronics'
  },
  {
    name: 'Lenovo ThinkPad X1 Carbon',
    price: 22000000,
    description: 'Laptop ringan dan tahan lama dengan performa tinggi',
    img: 'https://placehold.co/200x200.png?text=33',
    rate: { value: 4.6, count: 300 },
    category: 'Electronics'
  },
  {
    name: 'iRobot Roomba i7+',
    price: 15000000,
    description: 'Robot penyedot debu dengan teknologi pemetaan rumah',
    img: 'https://placehold.co/200x200.png?text=34',
    rate: { value: 4.7, count: 250 },
    category: 'Electronics'
  },
  {
    name: 'DJI Mavic Air 2',
    price: 20000000,
    description: 'Drone dengan kamera 4K dan durasi terbang lama',
    img: 'https://placehold.co/200x200.png?text=35',
    rate: { value: 4.8, count: 200 },
    category: 'Electronics'
  },
  {
    name: 'Harman Kardon Onyx Studio 6',
    price: 3000000,
    description: 'Speaker Bluetooth dengan suara jernih dan bass kuat',
    img: 'https://placehold.co/200x200.png?text=36',
    rate: { value: 4.5, count: 350 },
    category: 'Electronics'
  },
  {
    name: 'Xiaomi Mi Band 7',
    price: 800000,
    description: 'Fitness tracker dengan berbagai fitur kesehatan',
    img: 'https://placehold.co/200x200.png?text=37',
    rate: { value: 4.4, count: 450 },
    category: 'Electronics'
  },
  {
    name: 'Oculus Quest 2',
    price: 8000000,
    description: 'VR headset dengan performa tinggi dan game VR seru',
    img: 'https://placehold.co/200x200.png?text=38',
    rate: { value: 4.7, count: 350 },
    category: 'Electronics'
  },
  {
    name: 'Google Nest Hub Max',
    price: 4500000,
    description: 'Smart display dengan Google Assistant dan kamera',
    img: 'https://placehold.co/200x200.png?text=39',
    rate: { value: 4.6, count: 200 },
    category: 'Electronics'
  },
  {
    name: 'Samsung Galaxy Watch 5',
    price: 4000000,
    description: 'Smartwatch dengan fitur kesehatan dan performa tinggi',
    img: 'https://placehold.co/200x200.png?text=40',
    rate: { value: 4.7, count: 300 },
    category: 'Electronics',
    description: 'Smartwatch dengan fitur kesehatan dan performa tinggi',
    img: 'https://placehold.co/200x200.png?text=40',
    rate: { value: 4.7, count: 300 },
    category: 'Electronics'
  }
]

console.log(aray.length)

