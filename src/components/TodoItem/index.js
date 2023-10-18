import {RiDeleteBinLine} from 'react-icons/ri'
import {MdOutlineEditNote} from 'react-icons/md'

import './index.css'

const TodoItem = props => {
  const {todoDetails, onChangeBoxElement, onDeleteTask, onEditTodo} = props
  const {completed, id, title} = todoDetails

  const onClickCheckBox = () => {
    onChangeBoxElement(id)
  }

  const onClickDelete = () => {
    onDeleteTask(id)
  }

  const onClickEdit = () => {
    onEditTodo(id)
  }

  return (
    <li className="list-item">
      <div className="check-box-card">
        <input
          type="checkbox"
          id="checkBox"
          checked={completed}
          onChange={onClickCheckBox}
        />
        <label
          htmlFor="checkBox"
          className={!completed ? 'check-box-label' : 'check-box-marked'}
        >
          {title}
        </label>
      </div>
      <div className="edit-todo">
        <button type="button" className="button" onClick={onClickEdit}>
          <MdOutlineEditNote className="edit-icon" />
        </button>
        <button type="button" className="button" onClick={onClickDelete}>
          <RiDeleteBinLine className="delete-icon" />
        </button>
      </div>
    </li>
  )
}

export default TodoItem
