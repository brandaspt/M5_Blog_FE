import React, { Component } from "react"
import "react-quill/dist/quill.snow.css"
import ReactQuill from "react-quill"
import { Container, Form, Button, Spinner } from "react-bootstrap"
import "./styles.css"
import backend from "../../client"
import { createRef } from "react"
export default class NewBlogPost extends Component {
  postId = this.props.match.params.id

  state = {
    payload: {
      title: "",
      category: "News",
      cover: "",
      authorId: "",
      content: "",
    },
    authors: [],
    selectedFile: "",
    isLoading: false,
  }
  fileInputRef = createRef()

  componentDidMount = () => {
    if (this.postId) this.fetchPost()
    this.fetchAuthors()
  }

  fetchAuthors = async () => {
    const response = await backend.get("/authors")
    const data = response.data
    this.setState({
      authors: data,
      payload: { ...this.state.payload, authorId: this.state.payload.authorId || data[0]._id },
    })
  }
  fetchPost = async () => {
    const response = await backend.get(`blogPosts/${this.postId}`)
    const data = response.data
    this.setState({
      payload: {
        title: data.title,
        category: data.category,
        cover: data.cover,
        content: data.content,
        authorId: data.authorId,
      },
    })
  }

  handleChooseFile = () => {
    this.fileInputRef.current.click()
  }

  submitPost = async e => {
    e.preventDefault()
    this.setState({ isLoading: true })
    const formData = new FormData()
    formData.append("postCover", this.state.selectedFile)
    let newPost
    if (this.postId) {
      newPost = await backend.put(`/blogPosts/${this.postId}`, this.state.payload)
    } else {
      newPost = await backend.post("/blogPosts", this.state.payload)
    }
    this.state.selectedFile && (await backend.post(`/blogPosts/${newPost.data._id}/uploadCover`, formData))
    this.setState({ isLoading: false })
    this.props.history.push("/")
  }

  render() {
    return (
      <Container className="new-blog-container">
        <Form className="mt-5" onSubmit={this.submitPost}>
          <Form.Group className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              size="lg"
              required
              value={this.state.payload.title}
              onChange={e => this.setState({ payload: { ...this.state.payload, title: e.currentTarget.value } })}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              size="lg"
              as="select"
              value={this.state.payload.category}
              onChange={e => this.setState({ payload: { ...this.state.payload, category: e.currentTarget.value } })}
            >
              <option>News</option>
              <option>Students Stories</option>
              <option>Events</option>
              <option>Tips and Tricks</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Control
              type="file"
              hidden
              ref={this.fileInputRef}
              onChange={e => this.setState({ selectedFile: e.currentTarget.files[0] })}
            />
            <Button variant="dark" className="me-2" onClick={this.handleChooseFile}>
              Upload Cover
            </Button>
            <Button variant="warning" onClick={() => this.setState({ selectedFile: "" })}>
              Clear
            </Button>
            <img
              src={
                this.state.selectedFile
                  ? URL.createObjectURL(this.state.selectedFile)
                  : this.state.payload.cover || "https://via.placeholder.com/200?text=Preview"
              }
              height="200px"
              alt="cover"
              className="d-block mt-2"
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              size="lg"
              as="select"
              value={this.state.payload.authorId}
              onChange={e => this.setState({ payload: { ...this.state.payload, authorId: e.currentTarget.value } })}
            >
              {this.state.authors.map(author => (
                <option value={author._id} key={author._id}>
                  {author.name} {author.surname}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Blog Content</Form.Label>
            <ReactQuill
              value={this.state.payload.content}
              onChange={value => this.setState({ payload: { ...this.state.payload, content: value } })}
              className="new-blog-content"
            />
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button type="submit" size="lg" variant="dark" className="d-flex align-items-center">
              Submit
              {this.state.isLoading && <Spinner animation="border" variant="warning" className="ms-2" />}
            </Button>
          </Form.Group>
        </Form>
      </Container>
    )
  }
}
