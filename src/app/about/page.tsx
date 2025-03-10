"use client"

import { useState } from "react"

const AboutPage = () => {

  const [gerak, setGerak] = useState<boolean>(false)

  return (
    <div className='backdrop-blur-sm'>
      <button onClick={() => setGerak(!gerak)} className='bg-gray-500 hover:bg-gray-600 active:bg-gray-700 px-4 py-1  rounded font-bold ' >Hai gaes</button>
      <p className={`text-center p-10 text-gray-400  my-10 duration-300 w-4/5 mx-auto  ${gerak ? 'animate-bounce shadow-gray-700 shadow-xl' : ''}`}>
      Waroeng Online adalah platform e-commerce yang menyediakan beragam kebutuhan sehari-hari dengan mudah, cepat, dan efisien, sambil mempertahankan kehangatan seperti berbelanja di warung tradisional. Kami mendukung pelaku UMKM lokal dan menggunakan teknologi terkini untuk memberikan pengalaman belanja yang nyaman, aman, dan fleksibel. Dengan layanan pelanggan yang ramah, Waroeng Online siap menjadi mitra belanja terpercaya bagi keluarga Indonesia.
      </p>
    </div>
  )
}

export default AboutPage