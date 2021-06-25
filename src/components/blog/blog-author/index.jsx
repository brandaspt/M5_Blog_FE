import React, { Component } from "react"
import { Row, Col, Image } from "react-bootstrap"
import backend from "../../../client"
import "./styles.css"
export default class BlogAuthor extends Component {
  state = {
    author: {},
  }

  componentDidMount = () => {
    this.fetchAuthor()
  }

  fetchAuthor = async () => {
    const response = await backend.get(`/authors/${this.props.authorId}`)
    this.setState({ author: response.data })
  }

  render() {
    return (
      <Row>
        <Col xs={2}>
          <Image className="blog-author" src={this.state.author.avatar} roundedCircle />
        </Col>
        <Col>
          <div>by</div>
          <h6>{this.state.author.name}</h6>
        </Col>
      </Row>
    )
  }
}
