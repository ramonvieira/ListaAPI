
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
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
  Pagination,
  Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function DataTable({ columns, data, filters, onEdit, onDelete }) {
  const [filterValues, setFilterValues] = useState({});
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleFilterChange = (column) => (event) => {
    setFilterValues({
      ...filterValues,
      [column]: event.target.value.toLowerCase(),
    });
    setPage(1);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const filteredData = data.filter((item) => {
    return filters.every(
      (column) =>
        !filterValues[column] ||
        String(item[column]).toLowerCase().includes(filterValues[column])
    );
  });

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        {filters.map((column) => (
          <TextField
            key={column}
            label={`Filter ${column}`}
            variant="outlined"
            size="small"
            onChange={handleFilterChange(column)}
            value={filterValues[column] || ''}
            fullWidth={isMobile}
          />
        ))}
      </Stack>

      {isMobile ? (
        <Grid container spacing={2}>
          {paginatedData.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Card>
                <CardContent>
                  {columns.map((column) => (
                    <Box key={column} sx={{ mb: 1 }}>
                      <Typography variant="caption" color="textSecondary">
                        {column}:
                      </Typography>
                      <Typography variant="body2">
                        {String(item[column])}
                      </Typography>
                    </Box>
                  ))}
                  {(onEdit || onDelete) && (
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      {onEdit && (
                        <IconButton size="small" onClick={() => onEdit(item)}>
                          <EditIcon />
                        </IconButton>
                      )}
                      {onDelete && (
                        <IconButton size="small" onClick={() => onDelete(item.id)}>
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
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
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {onEdit && (
                          <IconButton size="small" onClick={() => onEdit(item)}>
                            <EditIcon />
                          </IconButton>
                        )}
                        {onDelete && (
                          <IconButton size="small" onClick={() => onDelete(item.id)}>
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={Math.ceil(filteredData.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
}

export default DataTable;
