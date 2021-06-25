import React, { Component } from "react"
import { Row, Col } from "react-bootstrap"
import BlogItem from "../blog-item"
import backend from "../../../client/index.js"
export default class BlogList extends Component {
  state = {
    posts: [],
  }
  componentDidMount = () => {
    this.fetchData()
  }
  fetchData = async () => {
    const response = await backend.get("/blogPosts")
    this.setState({ posts: response.data })
  }
  render() {
    return (
      <Row>
        {this.state.posts.map(post => (
          <Col key={post._id} md={6} lg={4} style={{ marginBottom: 50 }}>
            <BlogItem {...post} />
          </Col>
        ))}
      </Row>
    )
  }
}
