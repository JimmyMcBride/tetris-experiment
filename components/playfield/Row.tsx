import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import styled from "styled-components";
import { deleteFilledRow } from "../../store";
import { Cell } from "./Cell";
import { Flex } from "bushido-strap";

interface Coordinates {
  row: Array<any>;
  yCoord: number;
}

const Row = ({ row, yCoord }: Coordinates) => {
  const dispatch = useDispatch();
  const { tetrad, tetradLocked } = useSelector((state: any) => state.playfield);
  useEffect(() => {
    if (tetradLocked) {
      if (tetrad.getYCoords().includes(yCoord)) {
        dispatch(deleteFilledRow(yCoord));
      }
    }
  }, [tetradLocked, tetrad, yCoord, dispatch]);

  return (
    <Flex w="100%" h="5%">
      {row.map((cell: any, i: number) => (
        <Cell
          key={i}
          isLocked={cell.isLocked}
          isActive={cell.isActive}
          color={cell.color}
          coordinate={{
            x: cell.x,
            y: cell.y,
          }}
        />
      ))}
    </Flex>
  );
};

export default Row;
