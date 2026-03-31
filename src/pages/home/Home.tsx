import { useEffect, useState } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { axiosApi } from '../../axiosApi';
import type { IDish, IDishShort } from '../../types';
import { DishCard } from '../../components/DishCard/DishCard';

type DishesResponse = { [key: string]: IDishShort };

export const Home = () => {
  const [dishes, setDishes] = useState<IDish[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        setLoading(true);
        const { data } = await axiosApi.get<DishesResponse | null>('/dishes.json');

        if (!data) {
          setDishes([]);
          return;
        }

        const list: IDish[] = Object.entries(data).map(([id, dish]) => ({
          ...dish,
          id,
        }));

        setDishes(list);
      } catch {
        setDishes([]);
      } finally {
        setLoading(false);
      }
    };

    void fetchDishes();
  }, []);

  return (
    <>
      <Typography variant="h3" align="center" sx={{ mb: 3 }}>
        Dishes list
      </Typography>

      {loading ? (
        <Grid container justifyContent="center" sx={{ py: 6 }}>
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {dishes.map((dish) => (
            <Grid key={dish.id} item xs={12} sm={6} md={4}>
              <DishCard dish={dish} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

