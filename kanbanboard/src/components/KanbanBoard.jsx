import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import Column from './Column';

export default function KanbanBoard() {
    const [completed, setCompleted] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response) => response.json())
        .then((json) => {
            setCompleted(json.filter((task) => task.completed));
            setIncomplete(json.filter((task) => !task.completed));
        })
    }, []);
  
    const handleDragEnd = (result) => {
        const {destination, source, draggableId} = result;

        if(source.droppableId == destination.droppableId) return;

        //remove item from source array

        if(source.droppableId == 2){
            setCompleted(removeItemById(draggableId, completed));
        } else{
            setIncomplete(removeItemById(draggableId, incomplete));
        }

        //get the item

        const task = findItemById(draggableId, [...incomplete, ...completed]);
        //add item

        if(destination.droppableId == 2) {
            setCompleted([{ ...task, completed: !task.completed}, ...completed]);
        } else {
            setIncomplete([{ ...task, completed: !task.completed}, ...incomplete]);
        }
    };

    function findItemById(id, array) {
        return array.find((item) => item.id == id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.id != id);
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <h2 style={{textAlign: "center"}}>PROGRESS BOARD</h2>

            <div 
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                }}
            >
                <Column title = {"No priority"} tasks = {incomplete} id={"1"}/>
                <Column title = {"Urgent"} tasks={incomplete} id={'2'}/>
                <Column title={"High"} tasks={incomplete} id={'3'}/>
                <Column title={"Medium"} tasks={incomplete} id={'4'}/>
                <Column title={"Low"} tasks={incomplete} id={'5'}/>
            </div>
        </DragDropContext>
    );
}
