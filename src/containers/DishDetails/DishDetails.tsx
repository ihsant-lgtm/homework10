import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material';
import { axiosApi } from '../../axiosApi';
import type { IDishShort } from '../../types';

export const DishDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dish, setDish] = useState<IDishShort | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchDish = async () => {
      if (!id) {
        setDish(null);
        return;
      }

      try {
        setLoading(true);
        const { data } = await axiosApi.get<IDishShort | null>(`/dishes/${id}.json`);
        setDish(data);
      } catch {
        setDish(null);
      } finally {
        setLoading(false);
      }
    };

    void fetchDish();
  }, [id]);

  const handleDelete = async () => {
    if (!id || deleting) return;

    try {
      setDeleting(true);
      await axiosApi.delete(`/dishes/${id}.json`);
      navigate('/');
    } catch {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <Grid container justifyContent="center" sx={{ py: 6 }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (!dish) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">Dish not found</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {dish.name}
      </Typography>
      <Typography sx={{ mb: 1 }}>{dish.description}</Typography>
      <Typography variant="h6">Price: {dish.price}</Typography>
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          disabled={deleting}
        >
          Delete
        </Button>
      </Stack>
    </Paper>
  );
};
