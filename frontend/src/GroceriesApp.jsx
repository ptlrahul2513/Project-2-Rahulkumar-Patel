////////handle edit and delete
import InventoryCard from "./InventoryCard";
import CartList from "./CartList";
//import { products } from "./data/products";
import { useState, useEffect } from "react";
import axios from "axios";
import { FormProvider } from "react-hook-form";

export default function GroceriesApp() {
  const emotyProduct = {
  id: "",
  productName: "",
  brand: "",
  quantity: "",
  image: "",
  price: "",

};
  

  const [cartList, setCartList] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(emptyProduct);
  
  const[responseData, setResonseData] = useState("");
  const[toggleEdit, setToggleEdit] = useState(false);

  ///////useEffect

useEffect(() => {
  handlegetProducts();

},[responseData]);
////////////handlers
/////////Get products

const handlegetProducts = async() => {
await axios.get("http://localhost:3000/products").then((response) => {
    setProducts(response.data);
  });
};
////////////post product
const handlePostProduct = async(product) => {
  const handleProduct ={
    id: product.id,
    productName: product.productName,
    brand: product.brand,
    quantity: product.quantity,
    image: product.image,
    price: product.price
  }
  await axios
  .post("http://localhost:3000/addProduct", postProduct)
  .then(response => setResonseData(<p>{response.data}</p>))
};
const handleOnSumbit = (evt) => {
  toggleEdit ? handleProductEdit(formData) : handlePostProduct(formData);
  evt.preventDefault;
  handlePostProduct(formData)
  setFormData({
    id: "",
    productName: "",
    brand: "",
    quantity: "",
    image: "",
    price: "",
  });

};



const handleProductDelete = async (product) => {
  const id = product._id
  axios
  .delete(`http://localhost:3000/product${id}`)
  .then((response) => setResonseData(<p>{response.data}</p>));
};

const handleProductEdit = async (product) => {
  const id = product._id
  const editData = {
    id: product.id,
    productName: product.productname,
    brand: product.brand,
    quantity: product.quantity,
    image: product.image,
    price: product.price,
  };
  await axios
  .patch(`http://localhost:3000/product/${id}`, editData)
  .then((response) => setResonseData(<p>{response.data}</p> ))
  .then(setToggleEdit(false));
};

const handleToggleEdit = (product) => {
  setFormData(product); 
  setToggleEdit(true);


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
      <InventoryForm formData={formData}
       handleOnChange={handleOnChange} 
       handleOnSumbit={handleOnSumbit}
       toggleEdit={toggleEdit}
       />
       {responseData}
      <div className="GroceriesApp-Container">
        <InventoryCard list={products} 
        onClick={handleAddToCart} 
        handleProductDele = {handlePostProductDelete}
        handleProductEdit = {handleToggleEdit}
         />
        <CartList
          cartList={cartList}
          onClickEmpty={handleEmptyCart}
          onClickRemove={handleRemoveItem}
        />
      </div>
    </>
  );
}
