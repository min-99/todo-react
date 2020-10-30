import '../css/TodoTemplate.css';
import { useState, useCallback } from 'react';


import TodoItem from './TodoItem';
import PropTypes from 'prop-types';


TodoTemplate.propTypes = {
    title : PropTypes.string,
    // todoList : PropTypes.shape({
    //     isCheck: PropTypes.bool.isRequired,
    //     title: PropTypes.string.isRequired
    // })
}

export default function TodoTemplate({title, todoList, deleteTodoItem, checkUpdateTodoItem, moveTodo}){
 
    const renderTodoItem = (todoList, index) => {
        return (<TodoItem key={todoList.id} index={index} id={todoList.id} title={todoList.title} isCheck={todoList.isCheck} deleteTodoItem={deleteTodoItem} checkUpdateTodoItem={checkUpdateTodoItem} moveTodo={moveTodo}/>);
    };

    return (
        <div className="todoTemplate">
            <div className="todoTemplate__title">
                <p className="title">{title}</p>
                
            </div>
            <div className="todoTemplate__content">
                {todoList && 
                todoList.map((todo, i) => renderTodoItem(todo, i))}
            </div>
        </div>
    );
}



