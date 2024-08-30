// src/client/components/blog/blogdetails/index.jsx
import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import config from "../../../../config"
import Header from "../../header.jsx"
import Footer from "../../home/EyeCareHome/FooterHome6.jsx"
import blogImage from "../../../assets/images/blog-05.jpg"
import "./blogdetails.css"
import BlogSeries from "../blogseries"
import ListArticlesOfSeries from "../listarticlesofseries"

const BlogDetails = () => {
    const [blogPost, setBlogPost] = useState(null)
    const [loading, setLoading] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        fetchBlogPost()
    }, [id])

    const fetchBlogPost = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${config.API_URL}/blog/blogposts/${id}`)
            setBlogPost(response.data)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching blog post:", error)
            alert("Failed to fetch blog post")
            setLoading(false)
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (!blogPost) {
        return <div>Blog post not found</div>
    }

    return (
        <div>
            <Header />
            <div className="breadcrumb-bar-two">
                <div className="container">
                    <div className="row align-items-center inner-banner">
                        <div className="col-md-12 col-12 text-center">
                            <h2 className="breadcrumb-title">Blog Titian Bakat</h2>
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/index-6">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to="/blog">Blog</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        {blogPost.title}
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
                                <div className="blog-single-post">
                                    <div className="blog-image">
                                        {blogPost.image_url ? (
                                            <img
                                                className="img-fluid"
                                                src={blogPost.image_url}
                                                alt={blogPost.title}
                                                onError={e => {
                                                    e.target.onerror = null
                                                    e.target.src = blogImage
                                                }}
                                            />
                                        ) : (
                                            <img className="img-fluid" src={blogImage} alt="Placeholder" />
                                        )}
                                    </div>
                                    <br></br>
                                    <h3 className="blog-title">{blogPost.title}</h3>
                                    <div className="blog-info clearfix">
                                        <div className="post-left">
                                            <ul>
                                                <li>
                                                    <i className="far fa-clock"></i>
                                                    {new Date(blogPost.created_at).toLocaleDateString()}
                                                </li>
                                                <li>
                                                    <i className="fa fa-tags"></i>
                                                    {blogPost.category}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="blog-content" dangerouslySetInnerHTML={{ __html: blogPost.content }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12 sidebar-right theiaStickySidebar">
                            <ListArticlesOfSeries seriesName={blogPost.series_name} />
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

export default BlogDetails
