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
import BlogListSearch from "../search/search.jsx"
import LastestBlog from "../lastestblog"
import CategoryWidget from "../categoryWidget"
import TagsWidget from "../tagswidget"
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

                                <div className="card blog-comments clearfix">
                                    <div className="card-header">
                                        <h4 className="card-title">Comments (12)</h4>
                                    </div>
                                    <div className="card-body pb-0">
                                        <ul className="comments-list">
                                            <li>
                                                <div className="comment">
                                                    <div className="comment-author">
                                                        <img className="avatar" alt="" src={IMG04} />
                                                    </div>
                                                    <div className="comment-block">
                                                        <span className="comment-by">
                                                            <span className="blog-author-name">Michelle Fairfax</span>
                                                        </span>
                                                        <p>
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius
                                                            vitae, gravida pellentesque urna varius vitae. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                        </p>
                                                        <p className="blog-date">Dec 6, 2017</p>
                                                        <Link to="#0" className="comment-btn">
                                                            <i className="fas fa-reply"></i> Reply
                                                        </Link>
                                                    </div>
                                                </div>
                                                <ul className="comments-list reply">
                                                    <li>
                                                        <div className="comment">
                                                            <div className="comment-author">
                                                                <img className="avatar" alt="" src={IMG05} />
                                                            </div>
                                                            <div className="comment-block">
                                                                <span className="comment-by">
                                                                    <span className="blog-author-name">Gina Moore</span>
                                                                </span>
                                                                <p>
                                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna
                                                                    varius vitae, gravida pellentesque urna varius vitae.
                                                                </p>
                                                                <p className="blog-date">Dec 6, 2017</p>
                                                                <Link to="#0" className="comment-btn">
                                                                    <i className="fas fa-reply"></i> Reply
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="comment">
                                                            <div className="comment-author">
                                                                <img className="avatar" alt="" src={IMG06} />
                                                            </div>
                                                            <div className="comment-block">
                                                                <span className="comment-by">
                                                                    <span className="blog-author-name">Carl Kelly</span>
                                                                </span>
                                                                <p>
                                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna
                                                                    varius vitae, gravida pellentesque urna varius vitae.
                                                                </p>
                                                                <p className="blog-date">December 7, 2017</p>
                                                                <Link to="#0" className="comment-btn">
                                                                    <i className="fas fa-reply"></i> Reply
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <div className="comment">
                                                    <div className="comment-author">
                                                        <img className="avatar" alt="" src={IMG06} />
                                                    </div>
                                                    <div className="comment-block">
                                                        <span className="comment-by">
                                                            <span className="blog-author-name">Elsie Gilley</span>
                                                        </span>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                        <p className="blog-date">December 11, 2017</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="comment">
                                                    <div className="comment-author">
                                                        <img className="avatar" alt="" src={IMG07} />
                                                    </div>
                                                    <div className="comment-block">
                                                        <span className="comment-by">
                                                            <span className="blog-author-name">Joan Gardner</span>
                                                        </span>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                        <p className="blog-date">December 13, 2017</p>
                                                        <Link to="#0" className="comment-btn">
                                                            <i className="fas fa-reply"></i> Reply
                                                        </Link>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="card new-comment clearfix">
                                    <div className="card-header">
                                        <h4 className="card-title">Leave Comment</h4>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group">
                                                <label>
                                                    Name <span className="text-danger">*</span>
                                                </label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label>
                                                    Your Email Address <span className="text-danger">*</span>
                                                </label>
                                                <input type="email" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label>Comments</label>
                                                <textarea rows="4" className="form-control"></textarea>
                                            </div>
                                            <div className="submit-section">
                                                <button className="btn btn-primary submit-btn" type="submit">
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <StickyBox offsetTop={20} offsetBottom={20}>
                                <BlogListSearch />
                                <LastestBlog />
                                <CategoryWidget />
                                <TagsWidget />
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
