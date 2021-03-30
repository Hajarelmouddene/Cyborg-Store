import React from "react";
import styled from "styled-components";

const Button = styled.button`
  margin: 15px;
  text-decoration: none;
  border: none;
  padding: 10px;
  background-color: var(--secondary-color);
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    color: white;
    background-color: var(--primary-color);
  }
  &:focus {
    outline: none;
  }
`;

export default Button;
