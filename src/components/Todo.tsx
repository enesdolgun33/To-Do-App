import { CiCircleRemove } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import '../css/Todo.css'
import type { TodoType } from "../types/Types";
import { useDispatch } from "react-redux";
import { removeTodoById, updateTodo } from "../redux/todoSlice";
import { useState } from "react";

interface TodoProps {
    todoProps: TodoType
}

function Todo({ todoProps }: TodoProps) {
    const { id, content } = todoProps;

    const dispatch = useDispatch();

    const [editable, setEditable] = useState<boolean>(false);
    const [newTodo, setNewTodo] = useState<string>(content);

    const handleRemoveTodo = () => {
        dispatch(removeTodoById(id))
    }

    const handleUpdateTodo = () => {
        const payload: TodoType = {
            id: id,
            content: newTodo
        }
        dispatch(updateTodo(payload))
        setEditable(false)
    }

    return (
        <div className="todo-div">
            <div>
                {editable ? <input type="text" style={{ width: '400px', border: 'none', borderBottom: '1px solid white', outline: 'none', backgroundColor: '#06a7e1be' }}
                    value={newTodo}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)} /> : <div>{content}</div>}
            </div>
            <div>
                <CiCircleRemove onClick={handleRemoveTodo} className="icons" />
                {editable ? <FaCheck className="icons" onClick={handleUpdateTodo} /> : <CiEdit onClick={() => setEditable(true)} className="icons" />}
            </div>
        </div>
    )
}

export default Todo