import * as React from "react";
import { FullsizeContainer as FullsizeContainerAtom } from "../components/atoms/FullsizeContainer";
import { Container } from "../components/atoms/Container";

export default {
  title: "Design System/Atoms/Layout/Fullsize Container",
};

export const FullsizeContainer = () => (
  <Container>
    <FullsizeContainerAtom>
      <div style={{ display: "flex" }}>
        <div style={{ backgroundColor: "green", flex: "1 1 0%" }}> Box 1 </div>
        <div style={{ backgroundColor: "yellow", flex: "1 1 0%" }}> Box 2 </div>
        <div style={{ backgroundColor: "red", flex: "1 1 0%" }}> Box 3 </div>
      </div>
    </FullsizeContainerAtom>
  </Container>
);
