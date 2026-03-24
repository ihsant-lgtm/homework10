import { Container, Typography } from "@mui/material";
import type { IBasketState } from "../../types";
import { Link } from "react-router";

interface Props {
    basketState: IBasketState
}

export const Basket = ({ basketState }: Props) => {
    const { items, totalCount, totalPrice } = basketState

    if (items.length === 0) {
        return (
            <Container>
                <Typography variant="h5" align="center">
                    Your basket is empty!
                </Typography>
                <Link to={'/'}>
                    <Typography>
                        Go to home page
                    </Typography>
                </Link>
            </Container>
        )
    }

    return (
        <div>
            Basket
        </div>
    )
}