import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const Logo = ({className, spanDesign}: {className?: string, spanDesign?: string}) => {
  return (
    <Link href={"/"} className="inline-flex">
      <h2 className={cn("text-2xl text-shop_dark_green  uppercase tracking-wider hover:text-shop_light_green transition-colors duration-300 font-black hoverEffect group font-sans", className)}>Trustsho
        <span className={cn("text-shop_light_green group-hover:text-shop_dark_green transition-colors duration-300", spanDesign)}>p</span></h2>
    </Link>
  )
}

export default Logo
