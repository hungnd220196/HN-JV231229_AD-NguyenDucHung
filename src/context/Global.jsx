import React, { createContext, useState } from "react";
import Header from "../layouts/header/Header";
import ListProduct from "../components/product/ListProduct";
import ProductJson from "../data.json";

// Tạo ngữ cảnh
export const GlobalContext = createContext();

export default function Global() {
  // Lấy dữ liệu carts trên localStorage
  const [carts, setCarts] = useState(() => {
    const cartLocals = JSON.parse(localStorage.getItem("carts")) || [];
    return cartLocals;
  });

  /**
   * Hàm lưu và cập nhật dữ liệu
   * @param {*} key Key của dữ liệu trên local
   * @param {*} data Dữ liệu cần lưu
   */
  const handleSaveData = (key, data) => {
    // Cập nhật vào state
    setCarts(data);

    // lưu vào local
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Hàm thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (product) => {
    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
    const findIndexProduct = carts.findIndex(
      (cart) => cart.product.id === product.id
    );

    if (findIndexProduct === -1) {
      const newCart = {
        id: Math.ceil(Math.random() * 10000000),
        product: product,
        quantity: 1,
      };
      // Thêm sản phẩm vào trong giỏ hàng
      const updateCart = [...carts, newCart];

      handleSaveData("carts", updateCart)
    } else {
      const newCartUpdate = [...carts];
      // Tăng số lượng
      newCartUpdate[findIndexProduct].quantity =
        newCartUpdate[findIndexProduct].quantity + 1;

      handleSaveData("carts",newCartUpdate)
    }
  };
  // Hàm tăng sản phẩm trong giỏ hàng
  const handleIncreaseQuantity = (id) => {
    const newCartUpdate = [...carts];
    // vi tri cart can tang so luong
    const findIndexProduct = newCartUpdate.findIndex((cart) => cart.id === id);
    //tang so luong
    newCartUpdate[findIndexProduct].quantity =
      newCartUpdate[findIndexProduct].quantity + 1;

      handleSaveData("carts",newCartUpdate)
  };
  // Hàm giảm sản phẩm trong giỏ hàng
  const handleDecreaseQuantity = (id) => {
    const newCartUpdate = [...carts];
    // vi tri cart can giam so luong
    const findIndexProduct = newCartUpdate.findIndex((cart) => cart.id === id);
    //giam so luong
    newCartUpdate[findIndexProduct].quantity =
      newCartUpdate[findIndexProduct].quantity - 1;
      //kiem tra so luong bang 0 thi remove
    if (newCartUpdate[findIndexProduct].quantity === 0) {
      newCartUpdate.splice(findIndexProduct, 1);
    }
     handleSaveData("carts",newCartUpdate)
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const handleRemoveFromCart = (id) => {
    const newCartUpdate = [...carts];
    const findIndexProduct = newCartUpdate.findIndex((cart) => cart.id === id);
    newCartUpdate.splice(findIndexProduct, 1);
    handleSaveData("carts",newCartUpdate)
  };

  const dataGlobal = {
    products: ProductJson.products,
    carts,
    handleAddToCart,
    handleRemoveFromCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    cartLength: carts.length,
  };

  return (
    <>
      <GlobalContext.Provider value={dataGlobal}>
        <Header></Header>
        <ListProduct />
      </GlobalContext.Provider>
    </>
  );
}
