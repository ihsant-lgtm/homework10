import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import type { IDishShort } from "../../types"
import { axiosApi } from "../../axiosApi"
import DishForm from "../../components/dish-form/DishForm"

export const EditDish = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [dish, setDish] = useState<IDishShort | null>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getDish = async () => {
            try {
                const res = await axiosApi.get(`/dishes/${id}.json`)
                setDish(res.data)
            } catch (e) {
                console.log(e)
            }
        }
        if (id) {
            getDish()
        }
    }, [id])

    const handleEditDish = async (editDish: IDishShort) => {
        setLoading(true)
        try {
            await axiosApi.put(`/dishes/${id}.json`, editDish)
            navigate(`/dish/${id}`)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {
                dish && <DishForm onSubmit={handleEditDish} dish={dish} loading={loading} />
            }
        </div>
    )
}