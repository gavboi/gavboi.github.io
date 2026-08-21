import FileApp from "./FileApp";
import { faDice } from "@fortawesome/free-solid-svg-icons";
import { navigateTo } from "../../../../helpers";
import Item from "../item";

export default function FileAppGames() {
  return (
    <FileApp
      title="Games"
      files={[
        <Item
          text="Lucky Dice"
          detail="A clicker/upgrade game inspired by 'Unfair Flips'"
          icon={faDice}
          onClick={() => navigateTo("lucky-dice")}
        />,
      ]}
    />
  );
}
