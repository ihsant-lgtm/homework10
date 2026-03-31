import styles from './style.module.css'
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import type { IDishShort } from '../../types';

const INITIAL_FORM_STATE: IDishShort = {
    name: '',
    description: '',
    price: 0
}

interface Props {
    onSubmit: (dish: IDishShort) => void
    loading: boolean
    dish?: IDishShort
}

const DishForm = ({ onSubmit, loading, dish}: Props) => {
    const [formState, setFormState] = useState<IDishShort>(dish || INITIAL_FORM_STATE)

    useEffect(() => {
        setFormState(dish || INITIAL_FORM_STATE);
    }, [dish]);

    const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: name === 'price' ? Number(value) : value,
        }));
    };

    const onFormSubmit = (event: FormEvent) => {
        event.preventDefault()
        onSubmit(formState)
    }




    return (
        <form className={styles.form} onSubmit={onFormSubmit}>
            <TextField
                label={'Dish name'}
                value={formState.name}
                name={'name'}
                onChange={inputChangeHandler}
            />
            <TextField
                label={'Description'}
                value={formState.description}
                name={'description'}
                onChange={inputChangeHandler}
            />
            <TextField
                label={'Price'}
                value={formState.price}
                name={'price'}
                type={'number'}
                onChange={inputChangeHandler}
            />
            <LoadingButton
                type={'submit'}
                variant={'contained'}
                loading={loading}
            >
                {dish ? 'Edit Dish' : 'Add Dish'}
            </LoadingButton>
        </form>
    );
};

export default DishForm;
