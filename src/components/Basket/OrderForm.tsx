import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export interface OrderFormData {
  name: string;
  address: string;
  phone: string;
}

interface Props {
  totalPrice: number;
  onSubmit: (data: OrderFormData) => void;
}

export const OrderForm = ({ totalPrice, onSubmit }: Props) => {
  const [form, setForm] = useState<OrderFormData>({
    name: "",
    address: "",
    phone: "",
  });

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const canSubmit =
    form.name.trim() !== "" &&
    form.address.trim() !== "" &&
    form.phone.trim() !== "";

  return (
    <Box>
      <Typography variant="h6">Доставка</Typography>

      <TextField
        name="name"
        label="Имя"
        fullWidth
        margin="normal"
        value={form.name}
        onChange={change}
      />

      <TextField
        name="address"
        label="Адрес"
        fullWidth
        margin="normal"
        value={form.address}
        onChange={change}
      />

      <TextField
        name="phone"
        label="Телефон"
        fullWidth
        margin="normal"
        value={form.phone}
        onChange={change}
      />

      <Typography sx={{ mt: 2 }}>Итого: {totalPrice}</Typography>

      <Button
        type="button"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        disabled={!canSubmit}
        onClick={() => onSubmit(form)}
      >
        Оформить заказ
      </Button>
    </Box>
  );
};
