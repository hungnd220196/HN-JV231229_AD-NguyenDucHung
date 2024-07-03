import {
  DeleteOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import React, { useContext, useState } from "react";
import { Drawer, Checkbox, Divider } from "antd";
import { handleFormatMoney } from "../../utils/formatData";
import { GlobalContext } from "../../context/Global";
import { Empty } from 'antd';

const CheckboxGroup = Checkbox.Group;

export default function Header() {
  const {
    cartLength,
    carts,
    handleRemoveFromCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  } = useContext(GlobalContext);

  const [open, setOpen] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const allProductIds = carts.map((cart) => cart.product.id);
  const checkAll = allProductIds.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < allProductIds.length;

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (list) => {
    setCheckedList(list);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? allProductIds : []);
  };

  return (
    <>
      <header className="h-[56px] w-full bg-orange-500 flex items-center justify-between px-12 text-white">
        <ul className="flex gap-3">
          <li>Trang chủ</li>
          <li>Danh sách sản phẩm</li>
        </ul>
        <div className="relative">
          <ShoppingCartOutlined className="text-[24px]" onClick={showDrawer} />
          <p className="bg-red-500 px-2 text-[12px] absolute top-[-8px] right-[-15px] rounded-lg hover:text-[14px] transition-all duration-75 ease-linear">
            {cartLength > 9 ? "9+" : cartLength}
          </p>
          <Drawer title="Giỏ hàng" onClose={onClose} open={open}>
              {/* <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
              >
                Chọn tất cả
              </Checkbox> */}
              <Divider />
              <div className="flex flex-col gap-8 font-semibold">
              {cartLength===0 ?"Chưa có sản phẩm trong giỏ hàng":""}
              
                <CheckboxGroup value={checkedList} onChange={onChange}>
                
                  {carts.map((cart) => (
                    <>
                      <div
                        key={cart.product.id}
                        className="flex items-center gap-4"
                      >
                        <Checkbox value={cart.product.id}></Checkbox>
                        <img
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "contain",
                          }}
                          src={cart.product.image}
                        />
                        <p>{cart.product.productName}</p>
                        <MinusSquareOutlined
                          onClick={() => handleDecreaseQuantity(cart.id)}
                        />
                        <p>{cart.quantity}</p>
                        <PlusSquareOutlined
                          onClick={() => handleIncreaseQuantity(cart.id)}
                        />
                        <p>{cart.product.price * cart.quantity}</p>
                        <DeleteOutlined
                          onClick={() => handleRemoveFromCart(cart.id)}
                        />
                      </div>
                    </>
                  ))}

                </CheckboxGroup>
               
                <div className="flex items-center justify-between">
                  <p className="font-normal">
                    {" "}
                    Tổng tiền:{" "}
                    {handleFormatMoney(
                      carts.reduce(
                        (pre, cur) => pre + cur.product.price * cur.quantity,
                        0
                      )
                    )}
                  </p>
                </div>
              </div>
          </Drawer>
        </div>
      </header>
    </>
  );
}
