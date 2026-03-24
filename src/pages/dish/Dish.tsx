import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { axiosApi } from "../../axiosApi";
import type { IDishShort } from "../../types";
import { Button } from "@mui/material";

export const Dish = () => {
    const { id } = useParams();
    const [dish, setDish] = useState<IDishShort | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadDish = async () => {
            if (!id) return;
            const { data } = await axiosApi.get<IDishShort>(`/dishes/${id}.json`);
            setDish(data);
        };
        loadDish();
    }, [id])

    const goToEditDish = () => {
        navigate(`/dish/edit/${id}`)
    }

    const handleDelete = async () => {
        if (!id) return;
        await axiosApi.delete(`/dishes/${id}.json`);
        navigate("/dishes");
    }

    if (!dish) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{dish.name}</h2>
            <p>{dish.description}</p>
            <p>Price: {dish.price} €</p>
            <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
            <Button variant="contained" color="success" onClick={goToEditDish}>Edit Dish</Button>
        </div>
    )
}