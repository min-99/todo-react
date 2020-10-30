import deleteBtnImg from '../img/delete-btn.png';

export default function TodoItem({id, title, isCheck, deleteTodoItem, checkUpdateTodoItem}){
    return (
        <div className="todoItem">
            <div className="todoItem__content"><label><input type="checkbox" defaultChecked={isCheck} onChange={(e) => checkUpdateTodoItem(id, e.target.checked)}/><p className={isCheck? "complete" : ""}>{title}</p></label></div>
            <div className="todoItem__deletebtn" onClick={() => deleteTodoItem(id)}><img src={deleteBtnImg} alt="delte_btn"/></div>
        </div>
    );
}
