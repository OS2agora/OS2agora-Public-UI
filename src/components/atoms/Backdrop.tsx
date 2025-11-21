import React, { MouseEvent } from "react";

const styling = "w-screen h-screen fixed z-10 left-0 top-0 bg-black/50";

type BackdropProps = {
  show: boolean;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
};
const Backdrop = ({ show, onClick }: BackdropProps) =>
  show ? <div role="none" className={styling} onClick={onClick}></div> : null;

export default Backdrop;
