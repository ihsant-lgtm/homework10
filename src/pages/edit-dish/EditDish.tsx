import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress, Grid, Paper, Typography } from '@mui/material';
import type { IDishShort } from '../../types';
import { axiosApi } from '../../axiosApi';
import DishForm from '../../components/dish-form/DishForm';

export const EditDish = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dish, setDish] = useState<IDishShort | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const getDish = async () => {
      if (!id) return;

      try {
        setFetching(true);
        const { data } = await axiosApi.get<IDishShort | null>(`/dishes/${id}.json`);
        setDish(data);
      } catch {
        setDish(null);
      } finally {
        setFetching(false);
      }
    };

    void getDish();
  }, [id]);

  const handleEditDish = async (editDish: IDishShort) => {
    if (!id) return;

    setLoading(true);
    try {
      await axiosApi.put<IDishShort>(`/dishes/${id}.json`, editDish);
      navigate(`/dishes/${id}`);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
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
      <DishForm onSubmit={handleEditDish} dish={dish} loading={loading} />
    </Paper>
  );
};