
import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, TextField, Button } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axios from 'axios';

const columns = {
  todo: {
    title: 'To Do',
    items: []
  },
  inProgress: {
    title: 'In Progress',
    items: []
  },
  done: {
    title: 'Done',
    items: []
  }
};

function Todos() {
  const [boards, setBoards] = useState(columns);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      const initialBoards = {
        todo: {
          title: 'To Do',
          items: response.data.filter(todo => !todo.completed).slice(0, 5)
        },
        inProgress: {
          title: 'In Progress',
          items: response.data.filter(todo => !todo.completed).slice(5, 10)
        },
        done: {
          title: 'Done',
          items: response.data.filter(todo => todo.completed).slice(0, 5)
        }
      };
      setBoards(initialBoards);
    };
    fetchTodos();
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    const sourceBoard = boards[source.droppableId];
    const destBoard = boards[destination.droppableId];
    const sourceItems = [...sourceBoard.items];
    const destItems = source.droppableId === destination.droppableId 
      ? sourceItems 
      : [...destBoard.items];

    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setBoards({
      ...boards,
      [source.droppableId]: {
        ...sourceBoard,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destBoard,
        items: destItems
      }
    });
  };

  const addNewTask = () => {
    if (!newTask.trim()) return;
    
    const task = {
      id: Date.now(),
      title: newTask,
      completed: false,
      userId: 1
    };

    setBoards({
      ...boards,
      todo: {
        ...boards.todo,
        items: [task, ...boards.todo.items]
      }
    });
    setNewTask('');
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4 }}>Task Manager</Typography>
      
      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Add new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addNewTask()}
        />
        <Button variant="contained" onClick={addNewTask}>
          Add Task
        </Button>
      </Box>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
          {Object.entries(boards).map(([boardId, board]) => (
            <Box
              key={boardId}
              sx={{
                minWidth: 300,
                bgcolor: 'background.default',
                borderRadius: 1,
                p: 2
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>{board.title}</Typography>
              <Droppable droppableId={boardId}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{ minHeight: 500 }}
                  >
                    {board.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <Paper
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{ p: 2, mb: 2, bgcolor: 'background.paper' }}
                          >
                            <Typography>{item.title}</Typography>
                          </Paper>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Box>
          ))}
        </Box>
      </DragDropContext>
    </Container>
  );
}

export default Todos;
