import * as React from "react";
import { Card as CardAtom } from "../components/atoms/Card";

import { Body } from "../components/atoms/Body";
import { Caption } from "../components/atoms/Caption";
import { StatusIndicator } from "../components/atoms/StatusIndicator";
import { CheckCircleIcon } from "../components/icons";

export default {
  title: "Design System/Atoms/Card",
};

export const Card = () => (
  <>
    <CardAtom classes="bg-white flex justify-between p-4 mb-4">
      <Body>Fagområde:</Body>
      <Caption>Bolig, Vand og Varme</Caption>
    </CardAtom>
    <CardAtom classes="bg-white flex justify-between p-4 mb-4">
      <Body>Status:</Body>
      <StatusIndicator status="concluded">Konkluderet</StatusIndicator>
    </CardAtom>
    <CardAtom classes="bg-white flex justify-between p-4">
      <Body>Sagsnummer:</Body>
      <Caption>13.05.16-K04-77-20</Caption>
    </CardAtom>
  </>
);

export const Rounded = () => (
  <CardAtom classes="bg-green-highlight p-4" rounded>
    <CheckCircleIcon className="text-green-dark" />
    <Body classes="mb-5 mt-2" type="regular">
      Høringssvarene vil blive behandlet
    </Body>
    <Body classes="text-blue-center">Hvis du ønsker at klage over afgørelsen, kan det ske til klage@novataris.dk</Body>
  </CardAtom>
);
