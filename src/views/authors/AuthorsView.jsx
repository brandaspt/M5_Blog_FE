import React, { Component } from "react"
import { Container, Button } from "react-bootstrap"
import AuthorList from "../../components/authors/AuthorsList"
import { BACKEND_URL } from "../../const/env"

class AuthorsView extends Component {
  render() {
    return (
      <Container fluid="sm">
        <h1 className="blog-main-title">Authors</h1>
        <Button as="a" className="mb-5" href={`${BACKEND_URL}/authors/download/csv`} variant="info">
          Download CSV
        </Button>
        <AuthorList />
      </Container>
    )
  }
}

export default AuthorsView
