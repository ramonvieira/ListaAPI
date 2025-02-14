
import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import DataTable from '../components/DataTable';

function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
      setComments(response.data);
    };
    fetchComments();
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4 }}>Comments</Typography>
      <DataTable
        columns={['id', 'name', 'email', 'body', 'postId']}
        data={comments}
        filters={['name', 'email', 'body']}
      />
    </Container>
  );
}

export default Comments;
