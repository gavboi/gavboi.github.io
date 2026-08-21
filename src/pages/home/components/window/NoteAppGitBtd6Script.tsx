import Window from ".";
import { NoteAppInfo } from "../item";
import classes from "./index.module.css";

function Content() {
  return (
    <div className={classes.text}>
      <NoteAppInfo
        status="nearly finished"
        created={[new Date("2023-01-16")]}
        tags={["AutoHotKey", "game script", "no AI"]}
        repoName="btd6-farming"
        repoUrl="https://github.com/gavboi/btd6-farming"
      />
      <p>
        A script designed to farm currency (Monkey Money) and tower XP in Bloons
        Tower Defense 6. It repeatedly plays a specific map in a specific game
        mode that tries to maximize currency and XP earned, while minimizing
        amount of inputs/timing required. This is important, as this script runs
        completely separate to the game itself, and is intended to run for hours
        at a time without intervention.
      </p>
      <p>The script does not do anything a player could not do themselves.</p>
      <h2>Usage</h2>
      <p>
        With AutoHotKey installed, run the script and open BTD6. The script adds
        the follwing hotkeys:
      </p>
      <ul>
        <li>
          <b>CTRL+M</b>: Open the menu; this allows choosing a strategy to use,
          selecting a tower to receive additional XP, viewing estimated stats
          (etc.), and exiting the script.
        </li>
        <li>
          <b>CTRL+S</b>: Start the loop; must be on main menu.
        </li>
        <li>
          <b>CTRL+X</b>: Stop the loop; Script will finish any actions it is in
          the middle of first, but can stop in the middle of a loop. If the loop
          is not active when pressed, exits script.
        </li>
      </ul>
      <h2>Limitations</h2>
      <p>
        The optimal map, game mode, and towers are not available to new players,
        and as such, they will need to be capable unlocking initial towers and
        reaching the hardest difficulty maps on their own. This was more of a
        side effect rather than intended design, but I think it is a good thing
        as it stops new players from immediately farming lots of currency - you
        need to get a grasp of the game first and get to a point at which you
        may start farming those things yourself manually.
      </p>
      <p>
        The script is not attached to the game at all, so it depends on reading
        your display which is at the mercy of a few things, such as screen
        resolution and computer performance.
      </p>
      <p>
        The script is also dependent on knowing the current state of the game as
        a whole, so it is susceptible to being completely broken by updates to
        the game such as new high-tier map additions and balancing changes to
        specific towers integral to the strategy used.
      </p>
    </div>
  );
}

export default function NoteAppGitBtd6Script() {
  return <Window title="BTD6 Script" content={<Content />} />;
}
