import { Route, Routes } from 'react-router-dom';
import { Header } from "./components/header/Header";
import { Home } from "./pages/home/Home";
import { AddDish } from "./pages/add-dish/AddDish";
import { Container } from "@mui/material";
import { EditDish } from "./pages/edit-dish/EditDish";
import { useState } from "react";
import type { IBasketState, IDish } from "./types";
import { Basket } from "./pages/basket/Basket";
import { DishDetails } from "./containers/DishDetails/DishDetails";

function App() {
  const [basket, setBasket] = useState<IBasketState>({
    items: [],
    totalCount: 0,
    totalPrice: 0,
  });

  const recalc = (items: IBasketState["items"]) => {
    const totalCount = items.reduce((sum, i) => sum + i.count, 0);

    const totalPrice = items.reduce((sum, i) => {
      return sum + i.count * i.dish.price;
    }, 0);

    return { totalCount, totalPrice };
  };

  const handleAddDish = (dish: IDish) => {
    setBasket((prev) => {
      const existing = prev.items.find((i) => i.dish.id === dish.id);

      let items;

      if (existing) {
        items = prev.items.map((i) =>
          i.dish.id === dish.id ? { ...i, count: i.count + 1 } : i,
        );
      } else {
        items = [...prev.items, { dish, count: 1 }];
      }

      const { totalCount, totalPrice } = recalc(items);

      return {
        items,
        totalCount,
        totalPrice,
      };
    });
  };

  const onIncrease = (id: string) => {
    setBasket((prev) => {
      const items = prev.items.map((item) =>
        item.dish.id === id ? { ...item, count: item.count + 1 } : item,
      );

      return {
        items,
        ...recalc(items),
      };
    });
  };

  const onDecrease = (id: string) => {
    setBasket((prev) => {
      const items = prev.items
        .map((item) =>
          item.dish.id === id ? { ...item, count: item.count - 1 } : item,
        )
        .filter((item) => item.count > 0);

      return {
        items,
        ...recalc(items),
      };
    });
  };

  const clearBasket = () => {
    setBasket({
      items: [],
      totalCount: 0,
      totalPrice: 0,
    });
  };

  return (
    <>
      <Header totalCount={basket.totalCount} totalPrice={basket.totalPrice} />

      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dishes/:id" element={<DishDetails />} />
          <Route path="/dish/create" element={<AddDish />} />
          <Route path="/edit-dish/:id" element={<EditDish />} />
          <Route
            path="/basket"
            element={
              <Basket
                basketState={basket}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onOrder={() => {
                  clearBasket();
                }}
              />
            }
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
