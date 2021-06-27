import React, { Component } from "react"
import { Container, Image, Button } from "react-bootstrap"
import { withRouter } from "react-router"
import { Link } from "react-router-dom"
import backend from "../../client"
import BlogAuthor from "../../components/blog/blog-author"
import "./styles.css"
class Blog extends Component {
  state = {
    blog: {},
    loading: true,
  }
  componentDidMount = async () => {
    const { id } = this.props.match.params
    const response = await backend.get(`/blogPosts/${id}`)
    this.setState({ blog: response.data, loading: false })
  }

  handleDelete = async () => {
    await backend.delete(`/blogPosts/${this.state.blog._id}`)
    this.props.history.push("/")
  }

  render() {
    const { loading, blog } = this.state
    if (loading) {
      return <div>loading</div>
    } else {
      return (
        <div className="blog-details-root">
          <Container>
            <Image className="blog-details-cover" src={blog.cover} fluid />
            <h1 className="blog-details-title my-3">{blog.title}</h1>
            <div className="d-flex justify-content-start mb-3">
              <Button as={Link} to={`/blog/${this.state.blog._id}/edit`} variant="dark" className="me-2 btn-sm">
                Edit
              </Button>
              <Button variant="danger" className="btn-sm" onClick={this.handleDelete}>
                Delete
              </Button>
            </div>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor authorId={blog.authorId} />
              </div>
              <div className="blog-details-info">
                <div>{new Date(blog.createdAt).toDateString()}</div>
                <div>{blog.readTime}</div>
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          </Container>
        </div>
      )
    }
  }
}

export default withRouter(Blog)
