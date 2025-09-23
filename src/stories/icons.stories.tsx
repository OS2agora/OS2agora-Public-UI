import * as React from "react";
import IconMap from "../components/icons/iconMap";

export default {
  title: "Design System/Atoms/Icons",
};

export const Icons = () =>
  Object.keys(IconMap).map((icon) => (
    <div key={icon} style={{ padding: "4px", fontSize: "14px", lineHeight: "21px" }}>
      {React.cloneElement(IconMap[icon], {
        style: { marginRight: "4px", verticalAlign: "middle" },
      })}
      <span style={{ display: "inline-block", verticalAlign: "middle" }}>{icon}</span>
    </div>
  ));
