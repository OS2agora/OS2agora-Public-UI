import { GlobalContentBody as GlobalContentBodyMolecule } from "../components/molecules/GlobalContentBody";
import { text } from "@storybook/addon-knobs";

export default {
  title: "Design System/Molecules/GlobalContentBody",
};

const knobTitle = () => text("knobTitle", "Her er en titel");
const knobContent = () =>
  text(
    "knobContent",
    "## Her kommer noget info om cookies\n" +
      "\n" +
      "De er nødvedige for at vi høringsportalen virker\n" +
      "\n" +
      "### Oversigt\n" +
      "\n" +
      "- cookie1 - Noget med login\n" +
      "- cookie2 - Den her styrer consent"
  );

export const GlobalContentBody = () => <GlobalContentBodyMolecule title={knobTitle()} globalContent={knobContent()} />;
