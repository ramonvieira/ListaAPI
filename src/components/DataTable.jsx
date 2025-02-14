
import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, TextField, Box, TableSortLabel
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function DataTable({ columns, data, onEdit, onDelete, filters }) {
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [filterValues, setFilterValues] = useState({});

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterChange = (column, value) => {
    setFilterValues(prev => ({ ...prev, [column]: value }));
  };

  const filteredData = data.filter(row => {
    return Object.entries(filterValues).every(([column, value]) => {
      if (!value) return true;
      return String(row[column]).toLowerCase().includes(value.toLowerCase());
    });
  });

  const sortedData = orderBy
    ? [...filteredData].sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (order === 'asc') {
          return aValue > bValue ? 1 : -1;
        }
        return aValue < bValue ? 1 : -1;
      })
    : filteredData;

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        {filters.map(column => (
          <TextField
            key={column}
            label={`Filter by ${column}`}
            value={filterValues[column] || ''}
            onChange={(e) => handleFilterChange(column, e.target.value)}
            size="small"
          />
        ))}
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column}>
                  <TableSortLabel
                    active={orderBy === column}
                    direction={orderBy === column ? order : 'asc'}
                    onClick={() => handleSort(column)}
                  >
                    {column}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row) => (
              <TableRow key={row.id}>
                {columns.map(column => (
                  <TableCell key={column}>{row[column]}</TableCell>
                ))}
                <TableCell>
                  <IconButton onClick={() => onEdit(row)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default DataTable;
