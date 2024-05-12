import { useState } from 'react'
const Blog = ({ blog,likeUpdate,deleteUpdate,loggedUserName }) => {
  const [showDetails,setShowDetatils] = useState(false)

  const showWhenView = { display:showDetails?'none':'' }
  const hideWhenHide = { display:showDetails?'':'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const viewDetails = () => {
    setShowDetatils(!showDetails)
  }

  const updateBlog = {
    id:blog.id,
    author:blog.author,
    title:blog.title,
    url:blog.url,
    user:blog.user.id,
    likes:blog.likes+1
  }

  return(
    <div className = 'details'>
      <div className = 'author-title' style = {{ ...blogStyle,...showWhenView }}>
        {blog.title} {blog.author} <button onClick = {viewDetails}>view</button>
      </div>
      <div className = 'full-details' style = {{ ...blogStyle,...hideWhenHide }}>
        {blog.title} {blog.author} <button onClick = {viewDetails}>hide</button><br/>
        <a href = {blog.url} target =  '_blank'>{blog.url}</a><br/>
        <span className = 'LiKe'>{blog.likes}</span> <button onClick = {() => likeUpdate(updateBlog)}>like</button><br/>
        {blog.user.name}<br/>
        {blog.user.name===loggedUserName &&<button onClick={() => deleteUpdate(updateBlog)}>remove</button>}
      </div>
    </div>
  )
}
export default Blog