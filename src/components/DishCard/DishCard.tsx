import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { IDish } from '../../types';

interface Props {
  dish: IDish;
}

export const DishCard = ({ dish }: Props) => {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(`/dishes/${dish.id}`);
  };

  return (
    <Card>
      <CardActionArea onClick={handleOpen}>
        <CardContent>
          <Typography variant="h6">{dish.name}</Typography>
          <Typography variant="body2">Price: {dish.price}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
