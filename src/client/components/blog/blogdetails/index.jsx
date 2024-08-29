// src/client/components/blog/blogdetails/index.jsx
import React from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import StickyBox from "react-sticky-box"
//images
import { IMG01, IMG04, IMG05, IMG06, IMG07 } from "./img.jsx"
//components
import BlogPost from "../blogpost"
import { getPostById } from "../../../data/blogData"
import LastestBlog from "../lastestblog"
import CategoryWidget from "../categoryWidget"
import Header from "../../header.jsx"
import Footer from "../../footer.jsx"

const BlogDetails = props => {
    const { id } = useParams()
    const blogPostData = getPostById(id)

    if (!blogPostData) {
        return <div>Blog post not found</div>
    }
    return (
        <div>
            <Header {...props} />
            <div className="breadcrumb-bar-two">
                <div className="container">
                    <div className="row align-items-center inner-banner">
                        <div className="col-md-12 col-12 text-center">
                            <h2 className="breadcrumb-title">Blog Details</h2>
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/index-2">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item" aria-current="page">
                                        Blog Details
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
                            <div className="blog-view">
                                <BlogPost {...blogPostData} />

                                <div className="card blog-share clearfix">
                                    <div className="card-header">
                                        <h4 className="card-title">Share the post</h4>
                                    </div>
                                    <div className="card-body">
                                        <ul className="social-share">
                                            <li>
                                                <Link to="#0" title="Facebook">
                                                    <i className="fab fa-facebook"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#0" title="Twitter">
                                                    <i className="fab fa-twitter"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#0" title="Linkedin">
                                                    <i className="fab fa-linkedin"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <StickyBox offsetTop={20} offsetBottom={20}>
                                <LastestBlog />
                                <CategoryWidget />
                            </StickyBox>
                        </div>
                    </div>
                </div>
            </div>
            <Footer {...props} />
        </div>
    )
}

export default BlogDetails
