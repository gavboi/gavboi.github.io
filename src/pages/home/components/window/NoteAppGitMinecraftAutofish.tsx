import Window from ".";
import { NoteAppInfo } from "../item";
import classes from "./index.module.css";

function Content() {
  return (
    <div className={classes.text}>
      <NoteAppInfo
        status="complete"
        created={[new Date("2021-01-06")]}
        tags={["AutoHotKey", "game script", "no AI"]}
        repoName="minecraft-autofish"
        repoUrl="https://github.com/gavboi/minecraft-autofish"
      />
      <p>
        Automatically fishes in Minecraft by controlling your mouse to reel in
        and recast whenever there is a bite. Can be used nearly anywhere at any
        light level, and does not require additional contraptions in game, mods,
        or plugins.
      </p>
      <h2>Usage</h2>
      <ul>
        <li>
          <b>Ctrl+I</b>: Open instruction window
        </li>
      </ul>
      <h2>Limitations</h2>
      <p>
        Created originally during Minecraft 1.16, if the subtitles in a version
        past that related to fishing are different, the program will probably
        not work. If any new subtitles that are similar to the fishing subtitles
        are added, the program may also become more prone to false positives.
      </p>
    </div>
  );
}

export default function NoteAppGitMinecraftAutofish() {
  return <Window title="Minecraft Autofish" content={<Content />} />;
}
