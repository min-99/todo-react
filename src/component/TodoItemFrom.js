import '../css/TodoItemFrom.css'

export default function TodoItemFrom({todoItemTitle, addTodoItem, changeTodoItemTitle}){
    
    function handleKeyPree(e){
        if(e.key === 'Enter') {
            addTodoItem(todoItemTitle);
        }
    }
    return (
        <div className="todoItemFrom">
            <input type="text" value={todoItemTitle} onChange={(e) => changeTodoItemTitle(e.target.value)} onKeyPress={(e) => handleKeyPree(e)}/>
            <button type="button" onClick={() => addTodoItem(todoItemTitle)}>추가</button>
        </div>
    );
}