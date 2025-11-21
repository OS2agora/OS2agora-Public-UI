import env from "@beam-australia/react-env";
import { isServer } from "./isServer";

export const readEnvironmentVariable = (variable: string): string => {
  let output = undefined as string | undefined;
  if (isServer) {
    output = process.env[`NEXT_PUBLIC_${variable}`];
    if (output === undefined) {
      output = process.env[`NEXT_PUBLIC_EXT_${variable}`];
    }
  } else {
    output = env(variable);
  }

  return output || "";
};
