// src/client/components/blog/bloglist/index.jsx
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import config from "../../../../config"
import Header from "../../header.jsx"
import Footer from "../../home/EyeCareHome/FooterHome6.jsx"
import blogImage from "../../../assets/images/blog-05.jpg"
import BlogSeries from "../blogseries"

const BlogList = () => {
    const [blogPosts, setBlogPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(false)
    const postsPerPage = 7

    useEffect(() => {
        fetchBlogPosts()
    }, [currentPage])

    const fetchBlogPosts = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${config.API_URL}/blog/blogposts/?skip=${(currentPage - 1) * postsPerPage}&limit=${postsPerPage}`)
            setBlogPosts(response.data.posts)
            setTotalPages(Math.ceil(response.data.total / postsPerPage))
            setLoading(false)
        } catch (error) {
            console.error("Error fetching blog posts:", error)
            alert("Failed to fetch blog posts")
            setLoading(false)
        }
    }

    const handlePageChange = newPage => {
        setCurrentPage(newPage)
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Header />
            <div className="breadcrumb-bar-two">
                <div className="container">
                    <div className="row align-items-center inner-banner">
                        <div className="col-md-12 col-12 text-center">
                            <h2 className="breadcrumb-title">Artikel</h2>
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/index-6">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item" aria-current="page">
                                        Artikel
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
                            {blogPosts.map(post => (
                                <div key={post._id} className="blog">
                                    <div className="blog-image">
                                        <Link to={`/blog/${post._id}`}>
                                            {post.image_url ? (
                                                <img
                                                    className="img-fluid"
                                                    src={post.image_url}
                                                    alt={post.title}
                                                    onError={e => {
                                                        e.target.onerror = null
                                                        e.target.src = blogImage
                                                    }}
                                                />
                                            ) : (
                                                <img className="img-fluid" src={blogImage} alt="Placeholder" />
                                            )}
                                        </Link>
                                    </div>
                                    <h3 className="blog-title">
                                        <Link to={`/blog/${post._id}`}>{post.title}</Link>
                                    </h3>
                                    <div className="blog-info clearfix">
                                        <div className="post-left">
                                            <ul>
                                                <li>
                                                    <i className="far fa-calendar"></i>
                                                    {new Date(post.created_at).toLocaleDateString()}
                                                </li>
                                                <li>
                                                    <i className="fa fa-tags"></i>
                                                    {post.category}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="blog-content">
                                        {/* <p>{post.content.substring(0, 200)}...</p> */}

                                        <Link to={`/blog/${post._id}`} className="read-more">
                                            Read More
                                        </Link>
                                    </div>
                                </div>
                            ))}

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="blog-pagination">
                                        <nav>
                                            <ul className="pagination justify-content-center">
                                                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                                    <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>
                                                        <i className="fas fa-angle-double-left"></i>
                                                    </a>
                                                </li>
                                                {[...Array(totalPages)].map((_, i) => (
                                                    <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                                                        <a className="page-link" href="#" onClick={() => handlePageChange(i + 1)}>
                                                            {i + 1}
                                                        </a>
                                                    </li>
                                                ))}
                                                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                                    <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>
                                                        <i className="fas fa-angle-double-right"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 sidebar-right theiaStickySidebar">
                            <BlogSeries />
                            {/* You can add sidebar widgets here if needed */}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default BlogList
