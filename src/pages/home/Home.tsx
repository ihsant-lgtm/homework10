import { useCallback, useEffect, useState } from 'react';
import type { IDishList, IDishShort, IDish } from '../../types.ts';
import { axiosApi } from '../../axiosApi.ts';
import { DishCard } from '../../components/dish-card/DishCard.tsx';
import { Typography } from '@mui/material';
import styles from './styles.module.css'

interface Props {
    addDishToBasket: (dish: IDish) => void
}

export const Home = ({addDishToBasket}:Props) => {
    const [dishes, setDishes] = useState<IDish[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchDishes = useCallback(async () => {
        try {
            setLoading(true);
            const dishesResponse = await axiosApi.get<IDishList | null>('/dishes.json');
            const dishes = dishesResponse.data;

            if (!dishes) {
                return;
            }
            const newDishes: IDish[] = Object.keys(dishes).map(key => {
                const dish = dishes[key];
                return {
                    ...dish,
                    id: key,
                };
            });
            setDishes(newDishes);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchDishes()
    }, [fetchDishes]);

    console.log(dishes)


    return (
        <div>
            <Typography variant='h3' align='center'>
                Dishes list:
            </Typography>
            <div className={styles.wrapper}>
                {
                    dishes.map((dishItem) => (
                        <DishCard dish={dishItem} key={dishItem.id} addDishToBasket={addDishToBasket} />
                    ))
                }
            </div>
        </div>
    );
};

