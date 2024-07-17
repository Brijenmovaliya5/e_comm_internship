import React from 'react'
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div>

			<footer id="colorlib-footer" role="contentinfo">
				<div class="container">
					<div class="row row-pb-md">
						<div class="col footer-col colorlib-widget">
							<h4>About ecomm</h4>
							<p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life</p>
							<p>
								<ul class="colorlib-social-icons">
									<li><Link to="/"><i class="icon-twitter"></i></Link></li>
									<li><Link to="/"><i class="icon-facebook"></i></Link></li>
									<li><Link to="/"><i class="icon-linkedin"></i></Link></li>
									<li><Link to="/"><i class="icon-dribbble"></i></Link></li>
								</ul>
							</p>
						</div>
						<div class="col footer-col colorlib-widget">
							<h4>Customer Care</h4>
							<p>
								<ul class="colorlib-footer-links">
									<li><Link to="/">Contact</Link></li>
									<li><Link to="/">Returns/Exchange</Link></li>
									<li><Link to="/">Gift Voucher</Link></li>
									<li><Link to="/">Wishlist</Link></li>
									<li><Link to="/">Special</Link></li>
									<li><Link to="/">Customer Services</Link></li>
									<li><Link to="/">Site maps</Link></li>
								</ul>
							</p>
						</div>
						<div class="col footer-col colorlib-widget">
							<h4>Information</h4>
							<p>
								<ul class="colorlib-footer-links">
									<li><Link to="/">About us</Link></li>
									<li><Link to="/">Delivery Information</Link></li>
									<li><Link to="/">Privacy Policy</Link></li>
									<li><Link to="/">Support</Link></li>
									<li><Link to="/">Order Tracking</Link></li>
								</ul>
							</p>
						</div>

						<div class="col footer-col">
							<h4>News</h4>
							<ul class="colorlib-footer-links">
								<li><Link to="blog.html">Blog</Link></li>
								<li><Link to="/">Press</Link></li>
								<li><Link to="/">Exhibitions</Link></li>
							</ul>
						</div>

						<div class="col footer-col">
							<h4>Contact Information</h4>
							<ul class="colorlib-footer-links">
								<li>xyz</li>
								<li><Link to="tel://1234567920">+ 1235 2355 98</Link></li>
								<li><Link to="mailto:info@yoursite.com">info@ecomm.com</Link></li>
								<li><Link to="/">ecomm.com</Link></li>
							</ul>
						</div>
					</div>
				</div>
				<div class="copy">
					<div class="row">
						<div class="col-sm-12 text-center">
							<p>
								<h4 className=''>
									{/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
									Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | By The Planet Wear
									{/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
								</h4>
							</p>
						</div>
					</div>
				</div>
			</footer>

		</div>
	)
}

export default Footer
