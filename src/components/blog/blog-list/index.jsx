import React, { Component } from "react"
import { Row, Col, Spinner } from "react-bootstrap"

import BlogItem from "../blog-item"
import backend from "../../../client/index.js"
export default class BlogList extends Component {
  state = {
    posts: [],
    isLoading: false,
  }
  componentDidMount = () => {
    this.fetchData()
  }
  fetchData = async () => {
    this.setState({ isLoading: true })
    const response = await backend.get("/blogPosts")
    this.setState({ posts: response.data, isLoading: false })
  }
  render() {
    return this.state.isLoading ? (
      <div className="text-center">
        <Spinner animation="border" variant="warning" />
      </div>
    ) : (
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
