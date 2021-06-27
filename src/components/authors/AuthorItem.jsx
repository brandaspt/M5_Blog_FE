import React, { Component, createRef } from "react"
import { Card, Button } from "react-bootstrap"
import { FiEdit } from "react-icons/fi"
import { withRouter } from "react-router-dom"
import backend from "../../client"

import "./styles.css"

class AuthorItem extends Component {
  inputFileRef = createRef()
  handleFileClick = () => {
    this.inputFileRef.current.click()
  }
  handleFileChange = async e => {
    const formData = new FormData()
    formData.append("authorAvatar", e.currentTarget.files[0])
    await backend.post(`/authors/${this.props._id}/uploadAvatar`, formData)
    this.props.refresh()
  }
  handleAuthorUpdate = async (e, field) => {
    const body = { [field]: e.currentTarget.value }
    await backend.put(`/authors/${this.props._id}`, body)
    this.props.refresh()
  }
  handleDeleteAuthor = async () => {
    const response = await backend.delete(`/authors/${this.props._id}`)
    console.log(response)
    this.props.refresh()
  }

  render() {
    const { name, surname, avatar, email, dob } = this.props
    return (
      <Card className="author-card border-0 text-center">
        <Card.Img variant="top" src={avatar} className="author-avatar mx-auto rounded-circle" />

        <Card.Body>
          <Card.Title as="div" className="d-inline-block">
            <input
              type="text"
              defaultValue={name}
              size={name.length + 1}
              onChange={e => (e.currentTarget.style.width = e.currentTarget.value.length + 1 + "ch")}
              onBlur={e => {
                this.handleAuthorUpdate(e, "name")
              }}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  e.currentTarget.blur()
                }
              }}
              className="me-1"
            />
          </Card.Title>
          <Card.Title as="div" className="d-inline-block">
            <input
              type="text"
              defaultValue={surname}
              size={surname.length + 1}
              onChange={e => (e.currentTarget.style.width = e.currentTarget.value.length + 2 + "ch")}
              onBlur={e => {
                this.handleAuthorUpdate(e, "surname")
              }}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  e.currentTarget.blur()
                }
              }}
            />
          </Card.Title>
          <Card.Text as="div" className="m-0">
            <input
              type="email"
              defaultValue={email}
              onChange={e => (e.currentTarget.style.width = e.currentTarget.value.length + 2 + "ch")}
              onBlur={e => {
                this.handleAuthorUpdate(e, "email")
              }}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  e.currentTarget.blur()
                }
              }}
            />
          </Card.Text>
          <Card.Text as="div" className="m-0">
            <span>DoB:</span>
            <input
              type="text"
              className="d-inline-block ms-1"
              defaultValue={dob}
              size={dob.length + 1}
              onChange={e => (e.currentTarget.style.width = e.currentTarget.value.length + 2 + "ch")}
              onBlur={e => {
                this.handleAuthorUpdate(e, "dob")
              }}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  e.currentTarget.blur()
                }
              }}
            />
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="danger" className="btn-sm" onClick={this.handleDeleteAuthor}>
            Delete
          </Button>
        </Card.Footer>
        <input type="file" onChange={this.handleFileChange} hidden ref={this.inputFileRef} />
        <FiEdit className="edit-pic-btn" onClick={this.handleFileClick} />
      </Card>
    )
  }
}

export default withRouter(AuthorItem)
