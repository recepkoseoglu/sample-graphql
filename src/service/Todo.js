import axios from '../module/axios'

class Todo {
  list = params => axios.get('/todos', { params }).then(res => res.data)
  getById = id => axios.get(`/todos/${id}`).then(res => res.data)
}

export default new Todo()
