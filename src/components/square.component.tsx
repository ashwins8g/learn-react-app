import React from "react";

function Square(props: any) {
  const { onClick, value } = props;

  return (
    <button className="square" type="button" onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;
