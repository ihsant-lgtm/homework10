import { Box, Button, Typography } from "@mui/material";
import type { IBasket } from "../../types";

interface Props {
  item: IBasket;
  index?: number;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
}

export const BasketItem = ({
  item,
  index,
  onIncrease,
  onDecrease,
}: Props) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <Box>
        <Typography>
          {index !== undefined ? `${index + 1}. ` : ""}
          {item.dish.name}
        </Typography>
        <Typography>Price: {item.dish.price} $</Typography>
        <Typography>кол-во: {item.count}</Typography>
      </Box>

      <Box>
        <Button onClick={() => onDecrease(item.dish.id)}>-</Button>
        <Button onClick={() => onIncrease(item.dish.id)}>+</Button>
      </Box>
    </Box>
  );
};

