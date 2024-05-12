import { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './components/message'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user,setUser] = useState(null)
  const [message,setMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes-a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedJSON){
      const user = JSON.parse(loggedJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const blogFormRef = useRef()


  const handleLogin = async (credential) => {
    try{
      const user = await loginService.login(credential)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser',JSON.stringify(user))
      setUser(user)

    }
    catch(exception){
      handleMessage('wrong username or password')
    }
  }

  const handlelogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken(null)
  }

  const addBlog = async(blog) => {
    const newBlog = await blogService.create(blog)
    blogFormRef.current.toggleVisibility()
    setBlogs(blogs.concat(newBlog))
    handleMessage(`a new blog ${blog.title} by ${blog.author} added`)
  }

  const handleMessage = (msg) => {
    setMessage(msg)
    setTimeout(() => {
      setMessage('')
    },5000)
  }


  const loginForm = () => {
    return(
      <Togglable buttonLable = 'login'>
        <LoginForm
          handleCredential = {handleLogin}
          message = {message}/>
      </Togglable>
    )
  }

  const blogForm = () => {
    return(
      <Togglable buttonLable = 'new blog' ref = {blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
    )
  }

  const likeUpdate = async(blog) => {
    const update = await blogService.updateBlog(blog.id,blog)
    setBlogs(blogs.map(b => b.id===update.id?update:b).sort((a,b) => b.likes-a.likes))
  }

  const deleteBlog = async(blog) => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`)&&blogService.deleteBlog(blog.id)
    setBlogs(blogs.filter(b => b.id!==blog.id))
  }


  return (
    <div>
      {
        user === null?
          loginForm():
          <div>
            {message!==''&&<Message msg = {message}/>}
            <p>
              {user.username} is logged-in
              <button onClick = {handlelogout}>log out</button>
            </p>
            <br/>
            <div>
              {blogForm()}
            </div>
          </div>
      }
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          likeUpdate = {likeUpdate}
          deleteUpdate = {deleteBlog}
          loggedUserName={user?user.name:null}
        />
      )}
    </div>

  )
}

export default App