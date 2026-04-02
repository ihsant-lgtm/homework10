import { Box, Container, Typography } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";
import { Link } from "react-router";
import type { IBasketState } from "../../types";
import { BasketItem } from "../../components/Basket/BasketItem";
import { OrderForm } from "../../components/order-form/OrderForm";

const recalc = (items: IBasketState["items"]) => {
  const totalCount = items.reduce((sum, i) => sum + i.count, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.count * i.dish.price, 0);
  return { totalCount, totalPrice };
};

interface Props {
  basketState: IBasketState;
  setBasket: Dispatch<SetStateAction<IBasketState>>;
  onOrder: (data: any) => void;
}

export const Basket = ({
  basketState,
  setBasket,
  onOrder
}: Props) => {
  const { items } = basketState;
  const totalPrice = items.reduce((sum, item) => {
    return sum + item.dish.price * item.count;
  }, 0);

  const handleIncrease = (id: string) => {
    setBasket((prev) => {
      const nextItems = prev.items.map((item) =>
        item.dish.id === id ? { ...item, count: item.count + 1 } : item,
      );
      return {
        items: nextItems,
        ...recalc(nextItems),
      };
    });
  };

  const handleDecrease = (id: string) => {
    setBasket((prev) => {
      const nextItems = prev.items
        .map((item) =>
          item.dish.id === id ? { ...item, count: item.count - 1 } : item,
        )
        .filter((item) => item.count >= 1);
      return {
        items: nextItems,
        ...recalc(nextItems),
      };
    });
  };

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
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
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