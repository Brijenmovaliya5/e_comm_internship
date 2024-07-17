import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Footer/footer'
import Navbar from '../Navbar/navbar'

function About() {
  return (
    <div style={{fontSize: "16px"}}>
        <Navbar/>

        <h3 className='text-center p-4 m-auto' style={{background:"#88C8BC"}}><Link to="/" className='text-decoration-none text-dark'>Our biggest sale yet 50% off all summer shoes</Link></h3>

      		<div class="breadcrumbs">
			<div class="container mt-5">
				<div class="row">
					<div class="col">
						<p class="bread"><span><Link to="/home">Home</Link></span> / <span>About</span></p>
					</div>
				</div>
			</div>
		</div>


		<div class="colorlib-about pt-4 mt-5 pb-0 mb-0">
			<div class="container">
				<div class="row row-pb-lg pb-0 mb-0">
					<div class="col-sm-6 pb-0 mb-0">
						<div style={{backgroundImage: "url(images/img_bg_3.jpg)", height: "100%", width: "100%", backgroundRepeat: "round"}}>
						</div>
					</div>
					<div class="col-sm-6 pb-0 mb-0">
						<div class="about-wrap pb-0 mb-0">
							<h1  style={{fontSize: "30px"}}>Footwear the leading eCommerce Store around the Globe</h1>
							<p style={{color:"gray"}}>The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way.</p>
							<p style={{color:"gray"}}>When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way.</p>
						</div>
					</div>
				</div>
			</div>
		</div>

        <Footer/>
    </div>
  )
}

export default About
