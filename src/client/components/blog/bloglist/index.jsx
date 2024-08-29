// src/client/components/blog/bloglist/index.jsx
import React from "react"
import { Link } from "react-router-dom"
//images
import { IMG01, IMG02, IMG_th01, IMG_th02, IMG_th03 } from "./img.jsx"
//components
import Header from "../../header.jsx"
import Footer from "../../home/EyeCareHome/FooterHome6.jsx"

const BlogList = props => {
    return (
        <div>
            <Header {...props} />
            <div className="breadcrumb-bar-two">
                <div className="container">
                    <div className="row align-items-center inner-banner">
                        <div className="col-md-12 col-12 text-center">
                            <h2 className="breadcrumb-title">Blog List</h2>
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/index-6">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item" aria-current="page">
                                        Blog List
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="blog">
                                <div className="blog-image">
                                    <Link to="blog-details">
                                        <img className="img-fluid" src={IMG01} alt="Post" />
                                    </Link>
                                </div>
                                <h3 className="blog-title">
                                    <Link to="blog-details">Doccure – Making your clinic painless visit?</Link>
                                </h3>
                                <div className="blog-info clearfix">
                                    <div className="post-left">
                                        <ul>
                                            <li>
                                                <i className="far fa-clock"></i>4 Dec 2019
                                            </li>
                                            <li>
                                                <i className="fa fa-tags"></i>Health Tips
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="blog-content">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco sit laboris ullamco laborisut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                    <Link to="/blog/blog-details" className="read-more">
                                        Read More
                                    </Link>
                                </div>
                            </div>
                            <div className="blog">
                                <div className="blog-image">
                                    <Link to="/blog/blog-details">
                                        <img className="img-fluid" src={IMG02} alt="" />
                                    </Link>
                                </div>
                                <h3 className="blog-title">
                                    <Link to="/blog/blog-details">What are the benefits of Online Doctor Booking?</Link>
                                </h3>
                                <div className="blog-info clearfix">
                                    <div className="post-left">
                                        <ul>
                                            <li>
                                                <i className="far fa-clock"></i>3 Dec 2019
                                            </li>
                                            <li>
                                                <i className="fa fa-tags"></i>Cardiology
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="blog-content">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco sit laboris ullamco laborisut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                    <Link to="/blog/blog-details" className="read-more">
                                        Read More
                                    </Link>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="blog-pagination">
                                        <nav>
                                            <ul className="pagination justify-content-center">
                                                <li className="page-item disabled">
                                                    <Link to="#0" className="page-link" tabIndex="-1">
                                                        <i className="fas fa-angle-double-left"></i>
                                                    </Link>
                                                </li>
                                                <li className="page-item">
                                                    <Link to="#0" className="page-link">
                                                        1
                                                    </Link>
                                                </li>
                                                <li className="page-item active">
                                                    <Link className="page-link" to="#0">
                                                        2 <span className="sr-only">(current)</span>
                                                    </Link>
                                                </li>
                                                <li className="page-item">
                                                    <Link className="page-link" to="#0">
                                                        3
                                                    </Link>
                                                </li>
                                                <li className="page-item">
                                                    <Link to="#0" className="page-link">
                                                        <i className="fas fa-angle-double-right"></i>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12 sidebar-right theiaStickySidebar"></div>
                    </div>
                </div>
            </div>
            <Footer {...props} />
        </div>
    )
}

export default BlogList
