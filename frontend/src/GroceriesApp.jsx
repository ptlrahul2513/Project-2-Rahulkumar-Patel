import InventoryCard from "./InventoryCard";
import CartList from "./CartList";
//import { products } from "./data/products";
import { useState, useEffect } from "react";
import axios from "axios";

export default function GroceriesApp() {
  

  const [cartList, setCartList] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    productName: "",
    brand: "",
    quantity: "",
    image: "",
    price: "",

  });

  ///////useEffect

useEffect(() => {
  handlegetProducts();

},[]);
////////////handlers
/////////Get products

const handlegetProducts = async() => {
await axios.get("http://localhost:3000/products").then((response) => {
    setProducts(response.data);
  });
};

////////adding to cart

  const handleAddToCart = (item) => {
    setCartList((prevList) => {
      console.log(cartList);
      return [...prevList, { ...item, id: crypto.randomUUID() }];
    });
  };

  /////////onChange Handler
  const handleOnChange = (evt) => {
    const fieldName = evt.target.name;
    const fieldValue = evt.target.value;
    setFormData((prevData) => {
      return{
        ...prevData,
        id: crypto.randomUUID(),
        [fieldName]: fieldValue,
      };
    });
  };

  /////////////emptying cart

  const handleEmptyCart = () => {
    setCartList([]);
  };

  /////////removing item from cart
  const handleRemoveItem = (id) => {
    setCartList((prevList) => {
      return prevList.filter((i) => i.id !== id);
    });
  };

  return (
    <>
      <h1>Groceries App</h1>
      <InventoryForm formData={formData} handleOnChange={handleOnChange}/>
      <div className="GroceriesApp-Container">
        <InventoryCard list={products} onClick={handleAddToCart} />
        <CartList
          cartList={cartList}
          onClickEmpty={handleEmptyCart}
          onClickRemove={handleRemoveItem}
        />
      </div>
    </>
  );
}
