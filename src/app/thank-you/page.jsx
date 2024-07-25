import React from 'react'
import Link from 'next/link'
export default function page
() {
  return (

    <div className='justify-center'>
             <h1 className="text-5xl font-bold">Thank you for your order!</h1>
             <button className="btn btn-info p-4 m-16 "><Link href="/orders">View Orders</Link></button>
    </div>
  )
}
