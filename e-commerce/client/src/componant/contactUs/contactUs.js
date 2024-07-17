import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Footer/footer'
import Navbar from '../Navbar/navbar'

function ContactUs() {
    return (
        <div style={{fontSize: "15px"}}>

            <Navbar />

            <div class="breadcrumbs" className='mt-5 text-end'>
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <p class="bread"><span><Link to="/home">Home</Link></span> / <span>Contact</span></p>
                        </div>
                    </div>
                </div>
            </div>


            <div id="colorlib-contact" className='mt-3 pt-0'>
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12">
                            <h3>Contact Information</h3>
                            <div class="row contact-info-wrap">
                                <div class="col-md-3">
                                    <p><span><i class="fa fa-map-marker" aria-hidden="true"></i></span> CHARUSAT </p>
                                </div>
                                <div class="col-md-3">
                                    <p><span><i class="fa fa-phone" aria-hidden="true"></i></span> 
                                    <Link to="tel://1234567920" className='text-decoration-none'>
                                     +91 xxxxxxxxxx
                                    </Link></p>
                                </div>
                                <div class="col-md-3">
                                    <p><span><i class="fa fa-paper-plane" aria-hidden="true"></i></span> <Link className='text-decoration-none' to="/">info@ecomm.com</Link></p>
                                </div>
                                <div class="col-md-3">
                                    <p><span><i class="fa fa-globe" aria-hidden="true"></i></span> <Link className='text-decoration-none' to="/">ecomm.com</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="contact-wrap">
                                <h3>Get In Touch</h3>
                                <form action="#" class="contact-form">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="fname">First Name</label>
                                                <input type="text" id="fname" class="form-control" placeholder="Your firstname" />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="lname">Last Name</label>
                                                <input type="text" id="lname" class="form-control" placeholder="Your lastname" />
                                            </div>
                                        </div>
                                        <div class="w-100"></div>
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label for="email">Email</label>
                                                <input type="text" id="email" class="form-control" placeholder="Your email address" />
                                            </div>
                                        </div>
                                        <div class="w-100"></div>
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label for="subject">Subject</label>
                                                <input type="text" id="subject" class="form-control" placeholder="Your subject of this message" />
                                            </div>
                                        </div>
                                        <div class="w-100"></div>
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label for="message">Message</label>
                                                <textarea name="message" id="message" cols="30" rows="10" class="form-control" placeholder="Say something about us"></textarea>
                                            </div>
                                        </div>
                                        <div class="w-100"></div>
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <input type="submit" value="Send Message" class="btn btn-primary" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="col-md-6">
                        <div style={{width: "100%", height:"66rem"}}><iframe width="100%" height="100%" frameborder="0" title="planetware" scrolling="no" marginheight="0" marginwidth="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d471237.2773361228!2d71.01210594177248!3d22.670887463400327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39596b000a1aca13%3A0x8e0c4deb9e5a2449!2sCharusat%20university%20of%20science%20and%20technology!5e0!3m2!1sen!2sin!4v1721211062982!5m2!1sen!2sin"><Link to="https://www.maps.ie/population/">Find Population on Map</Link></iframe></div>
                        </div>
                        
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default ContactUs
