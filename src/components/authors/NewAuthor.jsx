import React, { Component } from "react"
import { Form, Button } from "react-bootstrap"
import { TiPlus } from "react-icons/ti"
import backend from "../../client"
import "./styles.css"

class NewAuthor extends Component {
  state = { adding: false, newAuthor: { name: "", surname: "", email: "", dob: "" } }
  handleNewAuthor = async e => {
    e.preventDefault()
    await backend.post("/authors", this.state.newAuthor)
    this.resetForm()
    this.props.refresh()
  }
  resetForm = () => {
    this.setState({ newAuthor: { name: "", surname: "", email: "", dob: "" }, adding: false })
  }
  handleInput = (e, field) => this.setState({ newAuthor: { ...this.state.newAuthor, [field]: e.currentTarget.value } })

  render() {
    return (
      <>
        {!this.state.adding ? (
          <TiPlus className="new-author-btn" onClick={() => this.setState({ adding: true })} />
        ) : (
          <Form className="new-author-form d-flex flex-column justify-content-between h-100" onSubmit={this.handleNewAuthor}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter name"
                required
                value={this.state.newAuthor.name}
                onChange={e => this.handleInput(e, "name")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Enter surname"
                required
                value={this.state.newAuthor.surname}
                onChange={e => this.handleInput(e, "surname")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                value={this.state.newAuthor.email}
                onChange={e => this.handleInput(e, "email")}
              />
            </Form.Group>

            <Form.Group className="d-flex justify-content-between align-items-center">
              <Form.Label className="my-0 me-1">DoB:</Form.Label>
              <Form.Control type="date" required value={this.state.newAuthor.dob} onChange={e => this.handleInput(e, "dob")} />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button variant="dark" onClick={this.resetForm}>
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </>
    )
  }
}

export default NewAuthor
