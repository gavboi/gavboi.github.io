import Window from ".";
import { NoteAppInfo } from "../item";
import classes from "./index.module.css";

function Content() {
  return (
    <div className={classes.text}>
      <NoteAppInfo
        status="nearly finished"
        created={[new Date("2024-09-14")]}
        tags={["JS/TS", "Python"]}
        repoName="house-mod-bot"
        repoUrl="https://github.com/gavboi/house-mod-bot/tree/v4"
      />
      <p>
        The first version of the bot, V1, was started on December 31, 2020. It
        was written in Python using the discord.py library, using an older
        structure for handling events. It was made mostly for fun, and has very
        limited functionality.
      </p>
      <p>
        V2 was started around December 2022. It was largely a rewrite of V1, but
        using slash commands instead of manually parsing messages. I had also
        started creating a way to have it connect to a camera feed for some
        commands (among other things), but it was never finished. Both V1 and V2
        are on the default branch, and have a hardcoded token that has since
        been rotated.
      </p>
      <p>
        V3 was started in September 2024 andwritten in Python, and is pretty
        much a complete rewrite of the bot. It was created this time to track
        chores, as at my student house we had a chore rotation that would
        typically be a) tracked exclusively in the kitchen, and b) often
        forgotten about. This was intended as a way to make them visible to
        everyone, automatically rotate, and to have built in reminders for when
        they were due. This became V3 instead of a new bot V1 since I used the
        same Discord application. It is on its own "v3" branch, and has a
        hardcoded token that has since been rotated.
      </p>
      <p>
        The most recent version (V4) was started just days later also in
        September 2024 and is the same as V3, but rewritten in Javascript so
        that it could be deployed on a cloudflare worker. It was never fully
        polished, as some of my other housemates very rarely used Discord, so it
        defeated the purpose of creating it in the first place and was not worth
        using. It is on its own "v4" branch.
      </p>
      <p>
        No version of the bot has been deployed to a public server, and there is
        no active deployment anywhere currently.
      </p>
      <h2>Usage</h2>
      <ul>
        <li>
          <b>V1</b>: Send message "&help" in chat
        </li>
        <li>
          <b>V2, V3, V4</b>: View available slash commands (type "/" in chat
          box)
        </li>
      </ul>
    </div>
  );
}

export default function NoteAppGitDiscordHomeBot() {
  return <Window title="Discord Home Bot" content={<Content />} />;
}
