import React from 'react'
import { UserButton } from '@/components/auth/userButton'

const Navbar = () => {
  return (
   <div className="bg-secondary flex justify-between items-center p-4 rounded-xl max-w-[500px] w-[500px] shadow-md">
     <div className="">Authentication</div>
     <UserButton />
   </div>
  )
}

export default Navbar