import classes from "./index.module.css";
import { ReactNode } from "react";
import Window from ".";

type FileAppProps = {
  title: string;
  files: ReactNode[];
};

export default function FileApp({ title, files }: FileAppProps) {
  return (
    <Window
      title={title}
      content={<div className={classes.fileList}>{files}</div>}
    />
  );
}
