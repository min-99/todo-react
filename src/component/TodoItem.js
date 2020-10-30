import deleteBtnImg from '../img/delete-btn.png';

import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

export default function TodoItem({id, title, isCheck, deleteTodoItem, checkUpdateTodoItem, index, moveTodo}){
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: 'card',
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveTodo(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        item: { type: 'card', id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    // return (<div ref={ref} style={{ opacity }}>
    //     {title}
    // </div>);

    return (
        <div className="todoItem" ref={ref} style={{ opacity }}>
            <div className="todoItem__content"><label><input type="checkbox" defaultChecked={isCheck} onChange={(e) => checkUpdateTodoItem(id, e.target.checked)}/><p className={isCheck? "complete" : ""}>{title}</p></label></div>
            <div className="todoItem__deletebtn" onClick={() => deleteTodoItem(id)}><img src={deleteBtnImg} alt="delte_btn"/></div>
        </div>
    );
}
