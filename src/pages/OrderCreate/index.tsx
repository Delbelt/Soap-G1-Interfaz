import FormContainer from "components/FormContainer";
import useForm from "hooks/useForm";
import { useEffect, useState } from "react";
import { GetAllProductByState } from "services/ProductServices";

import styles from "./OrderCreate.module.css";
import { PostOrder } from "services/OrderServices";

const initialOrder: OrderForm = {
  store_id: "",
  items: [],
};

const OrderCreate = () => {
  const { hasError, setHasError, isValidForm, setIsValidForm } = useForm();
  const [products, setProducts] = useState<Product[]>([]);
  const [order, setOrder] = useState<OrderForm>(initialOrder);
  const [items, setItems] = useState<ItemOrder[]>([]);
  const [listCounter, setListCounter] = useState<listQuantity[]>([]);

  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const updatedItems = items.map((item) => {
      const matchingCounter = listCounter.find((counter) => counter.code_item === item.code);

      if (matchingCounter) {
        return {
          ...item,
          quantity: matchingCounter.quantity,
        };
      }

      return item;
    });

    setItems(updatedItems);

    const payload = {
      codeStore: order.store_id,
      items: updatedItems,
    };

    console.log(payload);

    try {
      PostOrder(JSON.stringify(payload));
      setHasError("Orden de compra generada correctamente");

      setOrder(initialOrder);
      setItems([]);
      setListCounter([]);
      setCheckedItems({});
      setQuantities({});
    } catch {
      setHasError("Error al crear la orden de compra");
    } finally {
      setTimeout(() => {
        setHasError("");
      }, 3000);
    }
  };

  const handleOnchange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    setOrder((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  };

  const handleOnchangeQuantity = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    const newCounter: listQuantity = {
      code_item: name,
      quantity: Number(value),
    };

    setListCounter((prevItems) => {
      const exists = prevItems.some((item) => item.code_item === name);

      if (exists) {
        return prevItems.map((item) =>
          item.code_item === name ? { ...item, quantity: Number(value) } : item
        );
      } else {
        return [...prevItems, newCounter];
      }
    });

    // Controlar el estado del input number
    setQuantities({
      ...quantities,
      [name]: Number(value),
    });
  };

  const handleOnchangeCheck = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = evt.target;

    const productFilter = products.find((product) => product.code === name);

    if (checked && productFilter) {
      const newItem: ItemOrder = {
        code: productFilter.code,
        color: productFilter.color,
        size: productFilter.size,
        quantity: 0,
      };

      setItems((prevItems) => [...prevItems, newItem]);
    } else {
      if (!checked && productFilter) {
        setItems((prevItems) => prevItems.filter((item) => item.code !== productFilter.code));
      }
    }

    // Controlar el estado del checkbox
    setCheckedItems({
      ...checkedItems,
      [name]: checked,
    });
  };

  useEffect(() => {
    GetAllProductByState(true)
      .then((response) => response.json())
      .then((data) => setProducts(data.content.products));
  }, []);

  useEffect(() => {
    const isValidForm = order.store_id.length > 0 && items.length > 0 && listCounter.length > 0;
    setIsValidForm(isValidForm);
  }, [items, listCounter, order, setIsValidForm]);

  return (
    <FormContainer
      title='Crear orden'
      isValidForm={isValidForm}
      ErrorMessage={hasError}
      handleSubmit={handleSubmit}
    >
      <input
        onChange={handleOnchange}
        type='text'
        placeholder='Tienda'
        name='store_id'
        autoComplete='off'
        value={order.store_id}
      />
      <div>
        {products.map((product) => (
          <div key={product.code}>
            <input
              type='checkbox'
              name={product.code}
              checked={checkedItems[product.code] || false} // Controlar estado del checkbox
              className={styles.inputCheck}
              id={product.code}
              onChange={handleOnchangeCheck}
            />
            <label htmlFor={product.code} className={styles.inputForm}>
              {product.name}
            </label>
            <input
              type='number'
              name={product.code}
              value={quantities[product.code] || ""} // Controlar estado del input number
              className={styles.inputFormNumber}
              onChange={handleOnchangeQuantity}
            />
          </div>
        ))}
      </div>
    </FormContainer>
  );
};

export default OrderCreate;
