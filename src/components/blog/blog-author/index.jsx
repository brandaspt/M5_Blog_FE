import React, { Component } from "react"
import { Row, Col, Image, Spinner } from "react-bootstrap"
import backend from "../../../client"
import "./styles.css"
export default class BlogAuthor extends Component {
  state = {
    author: {},
    isLoading: false,
  }

  componentDidMount = () => {
    this.fetchAuthor()
  }

  fetchAuthor = async () => {
    this.setState({ isLoading: true })
    const response = await backend.get(`/authors/${this.props.authorId}`)
    this.setState({ author: response.data, isLoading: false })
  }

  render() {
    return this.state.isLoading ? (
      <div className="text-center">
        <Spinner animation="border" variant="warning" />
      </div>
    ) : (
      <Row>
        <Col xs={2}>
          <Image className="blog-author" src={this.state.author.avatar} roundedCircle />
        </Col>
        <Col>
          <div>by</div>
          <h6>
            {this.state.author.name} {this.state.author.surname}
          </h6>
        </Col>
      </Row>
    )
  }
}
