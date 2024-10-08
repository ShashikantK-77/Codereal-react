import React from 'react'

const HeadKyc = ({ title }) => {
  return (
    <div>
     <div className="items-center mt-10">
      <span className="text-lg  font-semibold">{title}</span>
      </div>
      <hr className='my-4 '/>
    </div>
  )
}

export default HeadKyc