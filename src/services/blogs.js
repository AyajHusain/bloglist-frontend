import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog) => {
  const config = { headers:{ 'Authorization':token } }
  const response = await axios.post(baseUrl,blog,config)
  return response.data
}

const deleteBlog = async(id) => {
  const config = { headers:{ 'Authorization':token } }
  await axios.delete(`${baseUrl}/${id}`,config)
}

const updateBlog = async(id,blogObj) => {
  const response = await axios.put(`${baseUrl}/${id}`,blogObj)
  return response.data
}

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}
export default { getAll,setToken,create,deleteBlog,updateBlog }