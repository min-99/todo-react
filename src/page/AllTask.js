import '../css/AllTask.css';

import TodoTemplate from '../component/TodoTemplate';
import TodoItemFrom from '../component/TodoItemFrom';
import TodoReducer from '../reducer/TodoReducer';

import update from 'immutability-helper';

import { useReducer, useCallback } from 'react';

export default function AllTask(){
    const [state, dispatch] = useReducer(TodoReducer, { todoItemTitle : '',
        todoList : [
            {id : 1, title : "React ToDo App 만들기", isCheck : false},
            {id : 2, title : "점심맛있게 먹기", isCheck : true},
            {id : 3, title : "물 1L 마시기", isCheck : true},
            {id : 4, title : "운동하기", isCheck : false}
        ]
    });

    const moveTodo = (dragIndex, hoverIndex) => {
        const dragTodo = state.todoList[dragIndex];

        dispatch({ type : 'UPDATE_TODO_ITEM', todoList : update(state.todoList, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragTodo],
            ],
        })});
    };

    return (
        <div className="todoApp__div">
            <div className="haeder">
                <p className="haeder__title">All Tasks</p>
            </div>
            <div className="inputFrom">
                <TodoItemFrom 
                todoItemTitle = {state.todoItemTitle}
                changeTodoItemTitle = {(text) => dispatch({type : 'UPDATE_TODO_ITEM_TITLE', text : text})}
                addTodoItem = {(title) => dispatch({type : 'INSERT_TODO_ITEM', title : title})}
                />
            </div>
            <div className="content">
                <TodoTemplate title="Today" todoList={state.todoList} 
                deleteTodoItem = {(id) => dispatch({type : 'DELETE_TODO_ITEM', id : id})}
                checkUpdateTodoItem = {(id, isCheck) => dispatch({type : 'UPDATE_TODO_ITEM_CHECK', id : id, isCheck : isCheck})}
                moveTodo = {(dragIndex, hoverIndex) => moveTodo(dragIndex, hoverIndex)}
                />
            </div>
        </div>
    );
}



