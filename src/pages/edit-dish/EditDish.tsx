import { useEffect, useState } from "react"
import { useParams } from "react-router"
import type { IDishShort } from "../../types"
import { axiosApi } from "../../axiosApi"

export const EditDish = () => {
    const {id} = useParams<{id: string}>()
    const [dish, setDish] = useState<IDishShort>()

    useEffect(() => {
        const getDish = async() => {
            const res = await axiosApi.get(`/dishes/${id}.json`)
        }
    },[])

    return(
        <div>
            id: {id}
        </div>
    )
}