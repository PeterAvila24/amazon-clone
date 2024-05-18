import React from 'react'
import "./Home.css"
import Product from './Product'


function Home() {
  return (
    <div className='home'>
      <div className='home_container'>
        <img className="home_image" src="https://m.media-amazon.com/images/I/61ijBS0fWUL._SX3000_.jpg" alt=""/>

        <div className='home_row'>
          <Product id = "245784" title="Keyboard Lightup" price={29.99} image="https://m.media-amazon.com/images/I/51GBpUxLIcL._MCnd_AC_.jpg" rating={5}/>
          <Product id = "23586789"
          title="BenQ ScreenBar Halo LED Monitor Light/Wireless Controller/Adjustable Brightness" 
          price={179.00} image="https://m.media-amazon.com/images/I/413q+kkeUvL._AC_AA220_.jpg" rating={4}/>
          
        </div>

        <div className='home_row'>
        <Product id = "3123456" title="STARUMENT Portable Hand Vacuum Cleaner Handheld Cordless" price={69.99} image="https://m.media-amazon.com/images/I/61Hc83JjTfL._AC_AA220_.jpg" rating={4}/>
        <Product id = "78963456" title="eufy Security eufyCam S330 (eufyCam 3) 4-Cam Kit, Security Camera Outdoor Wireless" price={769.99} image="https://m.media-amazon.com/images/I/31EX0VLUppL._SS135_.jpg" rating={4}/>
        <Product id = "0963456" title="DOGGYHUT® Premium Large/XL Pet Bike Trailer & Stroller for Large Sized Dog " price={239.99} image="https://m.media-amazon.com/images/I/415p2DfbM1L._SS135_.jpg" rating={5}/>
        
        </div>

        <div className='home_row'>
        <Product id = "0067621" title="Neumann U 87 Ai Set Z | Multi Pattern Condenser Microphone Set" price={3695.00} image="https://m.media-amazon.com/images/I/41crorsS4LL._SS135_.jpg" rating={5}/>
          
        </div>
      </div>
    </div>
  )
}

export default Home
