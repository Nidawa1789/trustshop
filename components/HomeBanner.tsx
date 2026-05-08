import React from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { banner_1 } from "@/images";
import { Title } from './ui/text';

const HomeBanner = () => {
  return (
    <div className="py-16 md:py-0 bg-shop_light_pink rounded-lg px-10 lg:px-24 flex items-center justify-between">
     <div className="space-y-5">
      <Title>Profitez jusqu&apos;à 50% de réduction<br />
      Une Selection de casque audio
      </Title>
      <Link href="/products" className="bg-shop_dark_green/90 text-white/90 px-5 py-2 
      rounded-md font-semibold hover:text-white hover:bg-shop_dark_green hoverEffect"
      >
        Acheter
        </Link>
     </div>
     <div>
      <Image src={banner_1} alt="Home Banner" className="hidden md:inline-flex w-96" />
     </div>
    </div>
  )
}

export default HomeBanner
