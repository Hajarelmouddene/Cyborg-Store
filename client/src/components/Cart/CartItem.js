import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import { updateQuantity, removeProduct } from "../../actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);
  const formattedUnitPrice = Number(product.price.slice(1));
  const subtotalPrice = formattedUnitPrice * quantity;
  const formattedSubtotalPrice = parseFloat(subtotalPrice).toFixed(2);

  const handlePlusClick = () => {
    setQuantity(quantity + 1);
  };

  const handleMinusClick = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <CartItemWrapper>
        <ProductInfo>
          <Link to={`/item/${product.id}`}>
            <ProductImage src={product.imageSrc}></ProductImage>
          </Link>
          <div>
            <div style={{ width: "300px" }}>
              <Link to={`/item/${product.id}`}>{product.name}</Link>
            </div>
            <div style={{ color: "gray" }}>SKU: {product.id}</div>
            <div style={{ marginTop: "2em" }}>Price: {product.price}</div>
          </div>
        </ProductInfo>
        <SelectQuantity>
          <Input>
            <button onClick={handleMinusClick}>-</button>
            <input
              type="text"
              value={quantity}
              onChange={(ev) => {
                setQuantity(Number(ev.target.value));
              }}
            ></input>
            <button onClick={handlePlusClick}>+</button>
          </Input>
          <Button
            onClick={() => {
              dispatch(updateQuantity(product, quantity));
            }}
            style={{
              background: "black",
              color: "white",
              margin: " 15px 0",
            }}
          >
            Update
          </Button>
        </SelectQuantity>
        <Price>${formattedSubtotalPrice}</Price>
      </CartItemWrapper>
      <DeleteProduct>
        <Button
          style={{
            background: "none",
            textDecoration: "underline",
            textAlign: "left",
            marginLeft: "0",
          }}
          onClick={() => dispatch(removeProduct(product.id))}
        >
          Remove
        </Button>
      </DeleteProduct>
      <Divider />
    </>
  );
};

const CartItemWrapper = styled.li`
  display: flex;
  margin: 3em 1em;
  justify-content: space-between;
`;
const ProductInfo = styled.div`
  display: flex;
`;
const ProductImage = styled.img`
  width: 120px;
  margin-right: 30px;
`;
const SelectQuantity = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 60px;
`;
const Input = styled.div`
  display: flex;

  input {
    width: 36px;
    height: 36px;
    border: 1px solid #000;
    text-align: center;
  }
  input::placeholder {
    text-align: center;
    margin-left: auto;
    color: #000;
    font-size: 15px;
  }

  button {
    width: 36px;
    height: 36px;
    background: none;
    border: 1px solid #eee;
  }
`;
const Price = styled.div`
  margin-right: 20px;
  font-weight: 800;
`;
const DeleteProduct = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const Divider = styled.hr`
  background-color: #f6f6f6;
`;
export default CartItem;