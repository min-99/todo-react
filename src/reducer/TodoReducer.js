export default function TodoReducer(state, action) {
    // action.type에 따라 다른 작업 수행
   switch (action.type) {
       case 'UPDATE_TODO_ITEM_TITLE':
           return { ...state , todoItemTitle: action.text };
       case 'INSERT_TODO_ITEM':
           return { todoItemTitle : '', todoList : state.todoList.concat({ id : (Math.max.apply(Math, state.todoList.map(function(x) { return x.id; })))+1,  title : action.title, isCheck : false}) };
       case 'DELETE_TODO_ITEM':
           return { ...state, todoList : state.todoList.filter(x => x.id !== action.id) };
       case 'UPDATE_TODO_ITEM' :
         return { ...state, todoList : action.todoList };
       case 'UPDATE_TODO_ITEM_CHECK':
           return { ...state, todoList : checkUpdateTodoItem(state.todoList, action.id, action.isCheck) };
       default:
       // 아무것도 해당되지 않을 때 기존 상태 반환
       return state;
   }
}


function checkUpdateTodoItem(todoList, id, isCheck){
    const index = todoList.findIndex(todo => todo.id === id);
    const selected = todoList[index]; // 선택한 객체
    const nextTodos = [...todoList]; // 배열을 복사
    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextTodos[index] = { 
        ...selected, 
        isCheck: isCheck
    };
    
    return nextTodos;
}