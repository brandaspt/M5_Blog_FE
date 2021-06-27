import React from "react"
import NavBar from "./components/navbar"
import Footer from "./components/footer"
import Home from "./views/home"
import Blog from "./views/blog"
import NewBlogPost from "./views/new"
import { BrowserRouter, Route } from "react-router-dom"
import AuthorsView from "./views/authors/AuthorsView"

import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route path="/" exact component={Home} />
      <Route path="/blog/:id" exact component={Blog} />
      <Route path="/blog/:id/edit" exact component={NewBlogPost} />
      <Route path="/new" exact component={NewBlogPost} />
      <Route path="/authors" exact component={AuthorsView} />
      <Footer />
    </BrowserRouter>
  )
}

export default App
