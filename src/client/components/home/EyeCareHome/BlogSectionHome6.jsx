import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import config from "../../../../config"
import OwlCarousel from "react-owl-carousel"
import "owl.carousel/dist/assets/owl.carousel.css"
import "owl.carousel/dist/assets/owl.theme.default.css"
import { eye_icon } from "../../imagepath"

function BlogSectionHome6() {
    const [seriesPosts, setSeriesPosts] = useState([])

    useEffect(() => {
        fetchSeriesPosts()
    }, [])

    const fetchSeriesPosts = async () => {
        try {
            const response = await axios.get(`${config.API_URL}/blog/first-series-posts`)
            setSeriesPosts(response.data)
        } catch (error) {
            console.error("Error fetching series posts:", error)
        }
    }

    const doctersettings = {
        items: 4,
        loop: true,
        margin: 15,
        dots: true,
        nav: true,
        navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
        autoplay: false,
        infinite: "true",
        slidestoscroll: 1,
        rtl: "true",
        rows: 1,
        responsive: {
            0: {
                items: 1,
            },
            500: {
                items: 1,
            },
            575: {
                items: 2,
            },
            768: {
                items: 2,
            },
            1000: {
                items: 4,
            },
            1300: {
                items: 5,
            },
        },
    }

    return (
        <section className="our-blog-section eye-blog">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 aos" data-aos="fade-up">
                        <div className="section-heading text-center sec-heading-eye">
                            <img src={eye_icon} alt="" className="img-fluid" />
                            <h2>
                                <span>Serial</span> Artikel
                            </h2>
                            <p>Manajemen Talenta - Manajemen Karir - Pembelajaran - Produktivitas</p>
                        </div>
                    </div>
                </div>
                <div className="eye-blogslider owl-them aos" data-aos="fade-up">
                    <OwlCarousel {...doctersettings}>
                        {seriesPosts.map(post => (
                            <div key={post._id.$oid} className="item">
                                <div className="our-blogs">
                                    <div className="blogs-img">
                                        <Link to={`/blog/${post._id.$oid}`}>
                                            <img src={post.image_url || "/path/to/default-image.jpg"} alt={post.title} className="img-fluid blog-inner-img" />
                                        </Link>
                                        <div className="blogs-overlay">
                                            <span className="blog-cat">{post.category}</span>
                                        </div>
                                    </div>
                                    <div className="blogs-info">
                                        <h4>
                                            <Link to={`/blog/${post._id.$oid}`}>{post.series_name}</Link>
                                        </h4>
                                        <p>{post.title}</p>
                                        <Link to={`/blog/${post._id.$oid}`} className="blogs-btn">
                                            Lihat Serial Artikel
                                            <i className="fa-solid fa-chevron-right" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </OwlCarousel>
                </div>
            </div>
        </section>
    )
}

export default BlogSectionHome6
