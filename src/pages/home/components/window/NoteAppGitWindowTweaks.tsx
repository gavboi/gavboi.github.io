import Window from ".";
import { NoteAppInfo } from "../item";
import classes from "./index.module.css";

function Content() {
  return (
    <div className={classes.text}>
      <NoteAppInfo
        status="complete"
        created={[new Date("2022-03-22")]}
        tags={["AutoHotKey", "tool", "no AI"]}
        repoName="window-tweaks"
        repoUrl="https://github.com/gavboi/window-tweaks"
      />
      <p>
        Script to give more control than normal over windows on your computer,
        such as making them translucent or always on top. You can run the .ahk
        file, or use the compiled .exe file if you prefer it or do not have
        AutoHotKey installed.
      </p>
      <h2>Usage</h2>
      <p>
        <b>Alt+I</b> for list of hotkeys.
      </p>
    </div>
  );
}

export default function NoteAppGitWindowTweaks() {
  return <Window title="Window Tweaks" content={<Content />} />;
}
