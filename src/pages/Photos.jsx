
import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import DataTable from '../components/DataTable';

function Photos() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
      setPhotos(response.data);
    };
    fetchPhotos();
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4 }}>Photos</Typography>
      <DataTable
        columns={['id', 'title', 'url', 'thumbnailUrl', 'albumId']}
        data={photos}
        filters={['title']}
      />
    </Container>
  );
}

export default Photos;
