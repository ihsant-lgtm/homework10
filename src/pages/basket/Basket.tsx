import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router";
import type { IBasketState } from "../../types";
import { BasketItems } from "../../components/basket-items/BasketItems";
import { OrderForm } from "../../components/order-form/OrderForm";

interface Props {
  basketState: IBasketState;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onOrder: (data: any) => void;
}

export const Basket = ({
  basketState,
  onIncrease,
  onDecrease,
  onOrder
}: Props) => {
  const { items, totalPrice } = basketState;

  if (items.length === 0) {
    return (
      <Container>
        <Typography variant="h5" textAlign="center">
          Корзина пустая
        </Typography>

        <Link to="/">
          <Typography>На главную</Typography>
        </Link>
      </Container>
    );
  }

  return (
    <Container>
      <Box display="flex" gap={4}>
        <BasketItems
          items={items}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />

        <OrderForm
          totalPrice={totalPrice}
          onSubmit={onOrder}
        />
      </Box>
    </Container>
  );
};