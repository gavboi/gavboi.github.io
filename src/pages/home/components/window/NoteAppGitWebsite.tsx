import Window from ".";
import { NoteAppInfo } from "../item";
import classes from "./index.module.css";

function Content() {
  return (
    <div className={classes.text}>
      <NoteAppInfo
        status="nearly finished"
        created={[new Date("2024-03-02"), new Date("2026-01-26")]}
        tags={["JS/TS", "React", "no AI"]}
        repoName="gavboi.github.io"
        repoUrl="https://github.com/gavboi/gavboi.github.io"
      />
      <p>
        My personal website, built to be both a navigable portfolio for those
        unfamiliar with GitHub, and as a place to host some of my projects that
        can be interacted with via a browser.
      </p>
      <p>Hosted with GitHub pages.</p>
    </div>
  );
}

export default function NoteAppGitWebsite() {
  return <Window title="This Website" content={<Content />} />;
}
