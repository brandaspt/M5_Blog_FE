import React, { Component } from "react"
import { Card } from "react-bootstrap"
import BlogAuthor from "../blog-author"
import { Link } from "react-router-dom"
import "./styles.css"
export default class BlogItem extends Component {
  render() {
    const { title, cover, author, _id, readTime } = this.props
    return (
      <Link to={`/blog/${_id}`} className="blog-link">
        <Card className="blog-card">
          <Card.Img variant="top" src={cover} className="blog-cover" />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text className="text-end">{readTime}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <BlogAuthor authorId={author} />
          </Card.Footer>
        </Card>
      </Link>
    )
  }
}
