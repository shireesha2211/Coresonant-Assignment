import {Component} from 'react'
import {BsFilter} from 'react-icons/bs'

import TodoItem from '../TodoItem'
import './index.css'

class TodoApplication extends Component {
  state = {
    todosListData: [],
    taskTitle: '',
    error: '',
    todoItem: '',
    isShow: false,
  }

  componentDidMount() {
    this.getTodo()
  }

  getTodo = async () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/users/1/todos'
    const options = {method: 'GET'}
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    const todo = data.map(each => ({
      completed: each.completed,
      id: each.id,
      title: each.title,
      userId: each.userId,
    }))
    this.setState({todoItem: todo, todosListData: [...todo]})
  }

  onSubmitTask = event => {
    event.preventDefault()
    const {todoItem, todosListData, taskTitle} = this.state
    const previousTodoId = todosListData.length

    if (todoItem !== '') {
      const newTodo = {
        completed: false,
        id: previousTodoId + 1,
        userId: 1,
        title: taskTitle,
      }
      this.setState({todosListData: [...todosListData, newTodo], taskTitle: ''})
    } else {
      this.setState({error: 'Please enter the task'})
    }
  }

  onChangeTitle = event => {
    this.setState({taskTitle: event.target.value})
  }

  onChangeBoxElement = todoId => {
    const {todosListData} = this.state
    const newTodo = todosListData.filter(each => each.id === todoId)
    const {userId, id, title, completed} = newTodo[0]

    const updatedTodo = {
      userId,
      id,
      title,
      completed: !completed,
    }

    todosListData[id - 1] = updatedTodo

    this.setState({
      todosListData: [...todosListData],
    })
  }

  onDeleteTask = todoId => {
    const {todosListData} = this.state
    const filteredTodos = todosListData.filter(
      eachTodo => eachTodo.id !== todoId,
    )
    this.setState({todosListData: filteredTodos})
  }

  onEditTodo = todoId => {
    const {todosListData} = this.state
    const todo = todosListData.filter(eachTodo => eachTodo.id === todoId)

    this.setState({taskTitle: todo[0].title})
  }

  onClickFilter = () => {
    const {isShow} = this.state
    this.setState({isShow: !isShow})
  }

  render() {
    const {todosListData, taskTitle, error, isShow} = this.state

    const filteredData = todosListData.filter(
      eachTodo => eachTodo.completed === true,
    )

    return (
      <div className="container">
        <h1 className="heading">Todo Application</h1>
        <form className="form-card" onSubmit={this.onSubmitTask}>
          <label htmlFor="todo" className="label-element">
            Create Todo
          </label>
          <input
            type="text"
            id="todo"
            className="input-element"
            placeholder="Title"
            value={taskTitle}
            onChange={this.onChangeTitle}
          />
          <p className="error">{error}</p>
          <button type="submit" className="add-button">
            Add
          </button>
        </form>
        <hr className="hr-line" />
        <div className="card">
          <h1 className="card-heading">Todos List</h1>
          <button
            className="filter-card"
            type="button"
            onClick={this.onClickFilter}
          >
            Filter <BsFilter className="filter-icon" />
          </button>
          <ul className="todo-list-items">
            {!isShow
              ? todosListData.map(eachTodo => (
                  <TodoItem
                    key={eachTodo.id}
                    todoDetails={eachTodo}
                    onChangeBoxElement={this.onChangeBoxElement}
                    onDeleteTask={this.onDeleteTask}
                    onEditTodo={this.onEditTodo}
                  />
                ))
              : filteredData.map(eachTodo => (
                  <TodoItem
                    key={eachTodo.id}
                    todoDetails={eachTodo}
                    onChangeBoxElement={this.onChangeBoxElement}
                    onDeleteTask={this.onDeleteTask}
                    onEditTodo={this.onEditTodo}
                  />
                ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default TodoApplication
