
import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import DataTable from '../components/DataTable';

function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setTodos(response.data);
    };
    fetchTodos();
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4 }}>Todos</Typography>
      <DataTable
        columns={['id', 'title', 'completed', 'userId']}
        data={todos}
        filters={['title']}
      />
    </Container>
  );
}

export default Todos;
