import axios from '../module/axios'

class Post {
  list = params => axios.get('/posts', { params }).then(res => res.data)
  getById = id => axios.get(`/posts/${id}`).then(res => res.data)
}

export default new Post()
