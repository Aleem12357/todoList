import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-slate-900 text-white py-2'>
        <div className="Logo">
            <span className='font-bold text-xl mx-8'>iTask</span>
        </div>
        <ul className="flex gap-8 mx-8">
            <li className='cursor-pointer hover:font-semibold transition-all duration-75'>Home</li>
            <li className='cursor-pointer hover:font-semibold transition-all duration-75'>Your Task</li>
        </ul>
    </nav>
  )
}

export default Navbar
