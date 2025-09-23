import { Me } from "../contexts/AppConfig";

function getInitialsFromMe(me: Me) {
  let value = "";
  if (me.companyName !== undefined) {
    value = me.companyName;
  } else {
    value = me.displayName;
  }
  const matches = value.match(/\b(\w)/g);
  const firstCharOfEachWord = matches?.join("");
  return firstCharOfEachWord?.substring(0, 2);
}

export { getInitialsFromMe };
