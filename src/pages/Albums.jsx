
import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import DataTable from '../components/DataTable';

function Albums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
      setAlbums(response.data);
    };
    fetchAlbums();
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4 }}>Albums</Typography>
      <DataTable
        columns={['id', 'title', 'userId']}
        data={albums}
        filters={['title']}
      />
    </Container>
  );
}

export default Albums;
