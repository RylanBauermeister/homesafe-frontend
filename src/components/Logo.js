import React from 'react'

const Logo = () => {
  return <div className="top-logo">
    <img src={process.env.PUBLIC_URL+"/HomeSafe_White.png"} alt="Logo"/>
  </div>;
}

export {Logo}
