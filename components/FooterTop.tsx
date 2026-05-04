import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

interface ContactItemData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const data:ContactItemData[] = [
  {
    title: 'Visitez-nous',
    subtitle: 'Lundi - Vendredi: 9:00 - 18:00',
    icon: <MapPin className='h-6 w-6 text-gray-600 group-hover:text-primary transition-colors'/>
  },
  {
    title: 'Contactez-nous',
    subtitle: '+223 6 99 99 99 99',
    icon: <Phone className='h-6 w-6 text-gray-600 group-hover:text-primary transition-colors'/>
  },
  {
    title: 'Jours de travail',
    subtitle: 'Lundi - Vendredi: 9:00 - 18:00',
    icon: <Clock className='h-6 w-6 text-gray-600 group-hover:text-primary transition-colors'/>
  },
  {
    title: 'Envoyez-nous un email',
    subtitle: 'trustshop@outlook.com',
    icon: <Mail className='h-6 w-6 text-gray-600 group-hover:text-primary transition-colors'/>
  },
]

const FooterTop = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b">
     {data.map((item, index) => (
     <div key={index} className='flex items-center gap-3 group hover:bg-gray-50 transition-colors hoverEffect'>{item.icon} 
     <div className="space-y-1">
      <h3 className='font-semibold text-gray-900 group-hover:text-black hoverEffect'>{item.title}</h3>
      <p className='text-gray-600 text-sm mt-1 group-hover:text-gray-900 hoverEffect'>{item.subtitle}</p>
     </div>
  </div>
     ))}
    </div>
  )
}
export default FooterTop
