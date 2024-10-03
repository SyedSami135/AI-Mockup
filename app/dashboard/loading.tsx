import { IconLoader2 } from '@tabler/icons-react'
import React from 'react'

const loader = () => {
  return (
    <div className='flex h-screen w-screen justify-center items-center'>
      
    
      <IconLoader2 className="animate-spin h-5 w-5 border-b-2 border-blue-500 rounded-full"/>
  
    </div>
 
  )
}

export default loader