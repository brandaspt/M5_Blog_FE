import React, { Component } from "react"
import "react-quill/dist/quill.snow.css"
import ReactQuill from "react-quill"
import { Container, Form, Button } from "react-bootstrap"
import "./styles.css"
import backend from "../../client"
export default class NewBlogPost extends Component {
  state = {
    newPostPayload: {
      title: "",
      category: "News",
      cover: "",
      readTime: {
        value: 1,
        unit: "min",
      },
      authorId: "",
      content: "",
    },
    authors: [],
    selectedFile: "",
  }

  componentDidMount = () => {
    this.fetchAuthors()
  }

  fetchAuthors = async () => {
    const response = await backend.get("/authors")
    const data = response.data
    this.setState({
      authors: data,
      newPostPayload: { ...this.state.newPostPayload, author: { name: `${data[0].name} ${data[0].surname}`, avatar: data[0].avatar } },
    })
  }

  handleChangeAuthor = e => {
    const authorId = e.target.selectedOptions[0].id
    const authorObj = this.state.authors.find(author => author._id === authorId)

    this.setState({
      newPostPayload: {
        ...this.state.newPostPayload,
        authorId: authorObj._id,
      },
    })
  }

  submitPost = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("postCover", this.state.selectedFile)
    const newPost = await backend.post("/blogPosts", this.state.newPostPayload)
    console.log(newPost)
    await backend.post(`/blogPosts/${newPost.data._id}/uploadCover`, formData)
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
              value={this.state.newPostPayload.title}
              onChange={e => this.setState({ newPostPayload: { ...this.state.newPostPayload, title: e.currentTarget.value } })}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              size="lg"
              as="select"
              value={this.state.newPostPayload.category}
              onChange={e => this.setState({ newPostPayload: { ...this.state.newPostPayload, category: e.currentTarget.value } })}
            >
              <option>News</option>
              <option>Students Stories</option>
              <option>Events</option>
              <option>Tips and Tricks</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label className="d-block">Cover</Form.Label>
            <Form.Control type="file" required onChange={e => this.setState({ selectedFile: e.currentTarget.files[0] })} />
          </Form.Group>
          <Form.Group className="d-inline-block mt-3">
            <Form.Label>Read Time</Form.Label>
            <Form.Control
              size="lg"
              required
              type="number"
              min={1}
              value={this.state.newPostPayload.readTime.value}
              onChange={e =>
                this.setState({
                  newPostPayload: {
                    ...this.state.newPostPayload,
                    readTime: { ...this.state.newPostPayload.readTime, value: e.currentTarget.value },
                  },
                })
              }
            />
          </Form.Group>
          <Form.Group className="d-inline-block">
            <Form.Control
              size="lg"
              as="select"
              value={this.state.newPostPayload.readTime.unit}
              onChange={e =>
                this.setState({
                  newPostPayload: {
                    ...this.state.newPostPayload,
                    readTime: { ...this.state.newPostPayload.readTime, unit: e.currentTarget.value },
                  },
                })
              }
            >
              <option>Min</option>
              <option>Sec</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Author</Form.Label>
            <Form.Control size="lg" as="select" onChange={this.handleChangeAuthor}>
              {this.state.authors.map(author => (
                <option id={author._id} key={author._id}>
                  {author.name} {author.surname}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Blog Content</Form.Label>
            <ReactQuill
              value={this.state.newPostPayload.content}
              onChange={value => this.setState({ newPostPayload: { ...this.state.newPostPayload, content: value } })}
              className="new-blog-content"
            />
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button type="reset" size="lg" variant="outline-dark">
              Reset
            </Button>
            <Button type="submit" size="lg" variant="dark" style={{ marginLeft: "1em" }}>
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    )
  }
}
