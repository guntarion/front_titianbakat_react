// src/client/components/blog/listarticlesofseries/index.jsx

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import config from "../../../../config"
import PropTypes from "prop-types"

const ListArticlesOfSeries = ({ seriesName }) => {
    const [seriesArticles, setSeriesArticles] = useState([])

    useEffect(() => {
        if (seriesName) {
            fetchSeriesArticles()
        }
    }, [seriesName])

    const fetchSeriesArticles = async () => {
        try {
            const response = await axios.get(`${config.API_URL}/blog/series-articles/${encodeURIComponent(seriesName)}`)
            setSeriesArticles(response.data)
        } catch (error) {
            console.error("Error fetching series articles:", error)
        }
    }

    if (!seriesName || seriesArticles.length === 0) {
        return null
    }

    return (
        <div className="card post-widget">
            <div className="card-header">
                <h4 className="card-title">Artikel dalam Seri: {seriesName}</h4>
            </div>
            <div className="card-body">
                <ul className="latest-posts">
                    {seriesArticles.map(article => (
                        <li key={article._id.$oid}>
                            <div className="post-thumb">
                                <Link to={`/blog/${article._id.$oid}`}>
                                    <img className="img-fluid" src={article.image_url || "/path/to/default-image.jpg"} alt={article.title} />
                                </Link>
                            </div>
                            <div className="post-info">
                                <h4>
                                    <Link to={`/blog/${article._id.$oid}`}>{article.title}</Link>
                                </h4>
                                <p>Bagian {article.series_number}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

ListArticlesOfSeries.propTypes = {
    seriesName: PropTypes.string.isRequired,
}

export default ListArticlesOfSeries
