import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import DataTable from '../components/DataTable';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4 }}>Users</Typography>
      <DataTable
        columns={['id', 'name', 'email', 'username', 'phone', 'website']}
        data={users}
        filters={['name', 'email', 'username']}
      />
    </Container>
  );
}

export default Users;