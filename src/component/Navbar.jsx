import React from 'react'

function Navbar() {
  return (
    <nav className='bg-slate-900 flex justify-between items-center px-40 h-14 text-white'>
      <div className="logo font-bold text-xl">
        <span className=' text-green-700'>&lt;</span>
        <span>Pass</span>
        <span className=' text-green-700'>op/&gt;</span>

        </div>
    </nav>
  )
}

export default Navbar
