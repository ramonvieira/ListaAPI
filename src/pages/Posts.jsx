
import React, { useState, useEffect } from 'react';
import { Container, Typography, Dialog, DialogTitle, DialogContent, 
  DialogActions, Button, TextField } from '@mui/material';
import axios from 'axios';
import DataTable from '../components/DataTable';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setPosts(response.data);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingPost(null);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${editingPost.id}`,
        editingPost
      );
      setPosts(posts.map(post => 
        post.id === editingPost.id ? editingPost : post
      ));
      handleClose();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4 }}>Posts</Typography>
      <DataTable
        columns={['id', 'title', 'body', 'userId']}
        data={posts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        filters={['title', 'body']}
      />
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={editingPost?.title || ''}
            onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
            sx={{ mb: 2, mt: 2 }}
          />
          <TextField
            fullWidth
            label="Body"
            multiline
            rows={4}
            value={editingPost?.body || ''}
            onChange={(e) => setEditingPost({...editingPost, body: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Posts;
