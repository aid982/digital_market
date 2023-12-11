"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

type Props = {};

const AddToCartButton = (props: Props) => {
  const [isSuccess, setIsSucces] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSucces(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isSuccess]);

  return (
    <Button
      size="lg"
      className="w-full"
      onClick={() => {
        setIsSucces(true);
      }}
    >
      {isSuccess ? "Added!" : "Add to cart"}
    </Button>
  );
};

export default AddToCartButton;
