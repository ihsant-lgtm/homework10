import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router";
import type { IBasketState } from "../../types";
import { BasketItem } from "../../components/Basket/BasketItem";
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
  const { items } = basketState;
  const totalPrice = items.reduce((sum, item) => {
    return sum + item.dish.price * item.count;
  }, 0);

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
        <Box flex={1}>
          {items.map((item, index) => (
            <BasketItem
              key={item.dish.id}
              item={item}
              index={index}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          ))}
        </Box>

        <OrderForm
          totalPrice={totalPrice}
          onSubmit={onOrder}
        />
      </Box>
    </Container>
  );
};