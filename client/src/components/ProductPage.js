import React from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Button from "./Button";
import { addCartProduct, updateQuantity } from "../actions";
import { useDispatch } from "react-redux";

const ProductPage = () => {
  const dispatch = useDispatch();
  const [item, setItem] = React.useState(null);
  const [quantity, setQuantity] = React.useState(1);
  //should we remove this and just disable button?
  const handleAddToCart = () => {
    const id = item._id;
    const name = item.name;
    const price = item.price;
    const imageSrc = item.imageSrc;
    if (item.numInStock > 0) {
      dispatch(addCartProduct({ id, name, price, imageSrc }));
    }
  };
  let { id } = useParams();

  const handlePlusClick = () => {
    setQuantity(quantity + 1);
  };

  const handleMinusClick = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  React.useEffect(() => {
    fetch(`/item/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data.data);
        console.log(data.data);
      });
  }, [id]);

  return (
    <>
      {item ? (
        <ProductDiv>
          <ProductImg src={item.imageSrc} />
          <ProductDiv2>
            <Name>{item.name}</Name>
            <Price>{item.price}</Price>
            <AddToCartDiv>
              <Button
                disabled={item.numInStock <= 0}
                onClick={() => {
                  dispatch(updateQuantity(item, quantity));
                }}
              >
                {item.numInStock <= 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
              <MainInput>
                <button
                  onClick={handleMinusClick}
                  style={{
                    background: "var(--secondary-color)",
                    color: "var(--primary-color)",
                    width: "30px",
                    padding: "10px",
                    margin: "5px",
                    border: "none",
                  }}
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  onChange={(ev) => {
                    setQuantity(Number(ev.target.value));
                  }}
                  style={{
                    background: "var(--secondary-color)",
                    color: "var(--primary-color)",
                    width: "40px",
                    padding: "10px",
                    margin: "5px",
                    border: "none",
                  }}
                ></input>
                <button
                  onClick={handlePlusClick}
                  style={{
                    background: "var(--secondary-color)",
                    color: "var(--primary-color)",
                    width: "30px",
                    padding: "10px",
                    margin: "5px",
                    border: "none",
                  }}
                >
                  +
                </button>
              </MainInput>
            </AddToCartDiv>
          </ProductDiv2>
        </ProductDiv>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

const ProductDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;
const ProductDiv2 = styled.div`
  background-color: var(--primary-color);
  height: 70vh;
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const AddToCartDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
`;

const ProductImg = styled.img`
  width: 30%;
`;
const Name = styled.h1`
  color: var(--secondary-color);
  font-size: 30px;
  padding-bottom: 40px;
`;
const Price = styled.p`
  font-size: 20px;
  border-bottom: 1px solid var(--secondary-color);
  padding-bottom: 40px;
`;
const MainInput = styled.div``;

export default ProductPage;
