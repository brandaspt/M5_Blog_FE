import React, { Component } from "react"
import { Container } from "react-bootstrap"
import AuthorList from "../../components/authors/AuthorsList"

class AuthorsView extends Component {
  render() {
    return (
      <Container fluid="sm">
        <h1 className="blog-main-title">Authors</h1>
        <AuthorList />
      </Container>
    )
  }
}

export default AuthorsView
