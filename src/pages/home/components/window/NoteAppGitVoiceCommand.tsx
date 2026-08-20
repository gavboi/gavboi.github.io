import Window from ".";
import { NoteAppInfo } from "../item";
import classes from "./index.module.css";

function Content() {
  return (
    <div className={classes.text}>
      <NoteAppInfo
        status="complete"
        created={[new Date("2024-05-22")]}
        tags={["Python", "tool", "no AI"]}
        repoName="voice-commands"
        repoUrl="https://github.com/gavboi/voice-commands"
      />
      <p>
        Proof-of-concept voice command tool that allows you to perform actions
        through your voice. Does not use any paid APIs and is therefore free to
        use once setup.
      </p>
      <h2>Usage</h2>
      <p>
        Run "voice_recognition.py" and provide a string after it to rename it
        (by default, it responds to "computer"). Say its name followed by a
        command keyword to have it perform an action.
      </p>
      <ul>
        <li>
          <b>"[name], write [content]"</b>: Creates a text file with the
          specified content
        </li>
        <li>
          <b>"[name], search [query]"</b>: Google the query
        </li>
        <li>
          <b>"[name], stop listening"</b>: Exits
        </li>
      </ul>
      <h2>Limitations</h2>
      <p>
        As it is using a simple speech recognition library, it will respond
        slowly at times. Also, as stated, it does not have many commands with it
        and does not use AI APIs so it is unable to extrapolate new commands
        automatically.
      </p>
    </div>
  );
}

export default function NoteAppGitVoiceCommand() {
  return <Window title="Voice Command" content={<Content />} />;
}
