import React, { Component } from "react"
import { Row, Col } from "react-bootstrap"
import AuthorItem from "./AuthorItem.jsx"
import NewAuthor from "./NewAuthor.jsx"
import backend from "../../client/index.js"

export default class AuthorList extends Component {
  state = {
    authors: [],
  }
  componentDidMount = () => {
    this.fetchData()
  }
  fetchData = async () => {
    const response = await backend.get("/authors")
    this.setState({ authors: response.data })
  }

  render() {
    return (
      <Row>
        {this.state.authors.map(author => (
          <Col key={author._id} md={4} lg={3} style={{ marginBottom: 50 }}>
            <AuthorItem {...author} refresh={this.fetchData} />
          </Col>
        ))}
        <Col md={4} lg={3} className="text-center" style={{ marginBottom: 50 }}>
          <NewAuthor refresh={this.fetchData} />
        </Col>
      </Row>
    )
  }
}
