import '../css/TodoTemplate.css';

import TodoItem from './TodoItem';
import PropTypes from 'prop-types';


TodoTemplate.propTypes = {
    title : PropTypes.string,
    // todoList : PropTypes.shape({
    //     isCheck: PropTypes.bool.isRequired,
    //     title: PropTypes.string.isRequired
    // })
}

export default function TodoTemplate({title, todoList, deleteTodoItem, checkUpdateTodoItem}){
    return (
        <div className="todoTemplate">
            <div className="todoTemplate__title">
                <p className="title">{title}<p className="title_count">{todoList.length}개중 {(todoList.filter(x => x.isCheck === true)).length}개 완료</p></p>
                
            </div>
            <div className="todoTemplate__content">
                {todoList && todoList.map(x =><TodoItem 
                key={x.id} 
                id={x.id} 
                title={x.title} 
                isCheck={x.isCheck} 
                deleteTodoItem={deleteTodoItem}
                checkUpdateTodoItem={checkUpdateTodoItem}
                />)}
            </div>
        </div>
    );
}



