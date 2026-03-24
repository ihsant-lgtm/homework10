import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import type { IDish } from '../../types';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';


interface Props {
    dish: IDish
    addDishToBasket: (dish: IDish) => void
}

export const DishCard = ({dish, addDishToBasket}:Props) => {
    const navigate = useNavigate()

    const goToDishPage = (id: string) => {
        navigate(`/dish/${id}`)
    }

    const handleAddDishToBasket = (dish: IDish) => {
        addDishToBasket(dish)
    }

    return(
        <Card>
            <CardContent>
                <Typography variant='body1'>
                    {dish.name}
                </Typography>
                <Typography variant='body2'>
                    Price: {dish.price} $
                </Typography>
                <CardActions>
                    <Button onClick={() => handleAddDishToBasket(dish)} endIcon={<AddShoppingCartIcon/>}>
                        Add to basket
                    </Button>
                    <Button onClick={() => goToDishPage(dish.id)}>
                        Show more
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}