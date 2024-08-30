import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import config from "../../../../config"

const BlogSeries = () => {
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

    return (
        <div className="card post-widget">
            <div className="card-header">
                <h4 className="card-title">Seri Artikel</h4>
            </div>
            <div className="card-body">
                <ul className="latest-posts">
                    {seriesPosts.map(post => (
                        <li key={post._id.$oid}>
                            <div className="post-thumb">
                                <Link to={`/blog/${post._id.$oid}`}>
                                    <img className="img-fluid" src={post.image_url || "/path/to/default-image.jpg"} alt={post.title} />
                                </Link>
                            </div>
                            <div className="post-info">
                                <h4>
                                    <Link to={`/blog/${post._id.$oid}`}>{post.series_name}</Link>
                                </h4>
                                <p>{post.title}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default BlogSeries
