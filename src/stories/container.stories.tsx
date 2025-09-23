import * as React from "react";
import { Container as ContainerAtom } from "../components/atoms/Container";

export default {
  title: "Design System/Atoms/Layout/Container",
};

export const Container = () => (
  <ContainerAtom>
    <div style={{ display: "flex" }}>
      <div style={{ backgroundColor: "green", flex: "1 1 0%" }}> Box 1 </div>
      <div style={{ backgroundColor: "yellow", flex: "1 1 0%" }}> Box 2 </div>
      <div style={{ backgroundColor: "red", flex: "1 1 0%" }}> Box 3 </div>
    </div>
  </ContainerAtom>
);
