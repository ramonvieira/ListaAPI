
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TextField, 
  Box,
  TablePagination 
} from '@mui/material';

function DataTable({ columns, data, filters, onEdit, onDelete }) {
  const [filterValues, setFilterValues] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleFilterChange = (column) => (event) => {
    setFilterValues({
      ...filterValues,
      [column]: event.target.value.toLowerCase(),
    });
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = data.filter((item) => {
    return filters.every(
      (column) =>
        !filterValues[column] ||
        String(item[column]).toLowerCase().includes(filterValues[column])
    );
  });

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        {filters.map((column) => (
          <TextField
            key={column}
            label={`Filter ${column}`}
            variant="outlined"
            size="small"
            onChange={handleFilterChange(column)}
            value={filterValues[column] || ''}
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
              {(onEdit || onDelete) && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id}>
                {columns.map((column) => (
                  <TableCell key={column}>{item[column]}</TableCell>
                ))}
                {(onEdit || onDelete) && (
                  <TableCell>
                    {onEdit && <Button onClick={() => onEdit(item)}>Edit</Button>}
                    {onDelete && <Button onClick={() => onDelete(item.id)}>Delete</Button>}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}

export default DataTable;
