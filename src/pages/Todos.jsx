
import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, TextField, Button } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axios from 'axios';

const columns = {
  backlog: {
    title: 'Backlog',
    items: [],
    color: '#e3f2fd'
  },
  todo: {
    title: 'To Do',
    items: [],
    color: '#fff3e0'
  },
  inProgress: {
    title: 'In Progress',
    items: [],
    color: '#e8f5e9'
  },
  review: {
    title: 'In Review',
    items: [],
    color: '#f3e5f5'
  },
  testing: {
    title: 'Testing',
    items: [],
    color: '#fce4ec'
  },
  done: {
    title: 'Done',
    items: [],
    color: '#e0f2f1'
  }
};

function Todos() {
  const [boards, setBoards] = useState(columns);
  const [newTask, setNewTask] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [newStatusTitle, setNewStatusTitle] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      const initialBoards = { ...columns };
      const data = response.data.slice(0, 30);
      
      data.forEach((todo, index) => {
        const position = index % 6;
        const board = Object.keys(initialBoards)[position];
        initialBoards[board].items.push(todo);
      });

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
      backlog: {
        ...boards.backlog,
        items: [task, ...boards.backlog.items]
      }
    });
    setNewTask('');
  };

  const addNewStatus = () => {
    if (!newStatus || !newStatusTitle) return;
    
    setBoards({
      ...boards,
      [newStatus]: {
        title: newStatusTitle,
        items: [],
        color: '#f5f5f5'
      }
    });
    
    setNewStatus('');
    setNewStatusTitle('');
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

      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          placeholder="Status Key (no spaces)"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value.replace(/\s/g, ''))}
          size="small"
        />
        <TextField
          placeholder="Status Title"
          value={newStatusTitle}
          onChange={(e) => setNewStatusTitle(e.target.value)}
          size="small"
        />
        <Button variant="outlined" onClick={addNewStatus}>
          Add Status
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
                            sx={{
                              p: 2,
                              mb: 2,
                              bgcolor: board.color,
                              borderRadius: 2,
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                              '&:hover': {
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                transform: 'translateY(-2px)',
                              },
                              transition: 'all 0.2s ease-in-out'
                            }}
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
