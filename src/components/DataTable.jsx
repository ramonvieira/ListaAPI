import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Box } from '@mui/material';

function DataTable({ columns, data, filters }) {
  const [filterValues, setFilterValues] = useState({});

  const handleFilterChange = (column) => (event) => {
    setFilterValues({
      ...filterValues,
      [column]: event.target.value.toLowerCase(),
    });
  };

  const filteredData = data.filter((item) => {
    return filters.every(
      (column) =>
        !filterValues[column] ||
        String(item[column]).toLowerCase().includes(filterValues[column])
    );
  });

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        {filters.map((column) => (
          <TextField
            key={column}
            label={`Filter by ${column}`}
            variant="outlined"
            size="small"
            onChange={handleFilterChange(column)}
            sx={{ mr: 2, mb: 2 }}
          />
        ))}
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column}>
                    {typeof row[column] === 'boolean'
                      ? row[column].toString()
                      : row[column]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default DataTable;