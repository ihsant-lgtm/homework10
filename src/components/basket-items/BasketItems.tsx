import type { IBasket } from "../../types";
import { Box } from "@mui/material";
import { BasketItem } from "../Basket/BasketItem";

interface Props {
  items: IBasket[];
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
}

export const BasketItems = ({ items, onIncrease, onDecrease }: Props) => {

  return (
    <Box>
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
  );
};