import classes from "./pips.module.css";

interface PipsProps {
  value: number;
  isExtended: boolean;
  pipStyle?: "solid" | "shadow";
}

interface CenterPipsProps {
  value: number;
  pipStyle: "solid" | "shadow";
}

interface PipProps {
  on: boolean;
  row: number;
  col: number;
  pipStyle: "solid" | "shadow";
}

function Pip({ on, row, col, pipStyle }: PipProps) {
  return (
    <div
      className={`${classes.pip} ${
        on
          ? pipStyle === "solid"
            ? classes.solidPip
            : classes.shadowPip
          : classes.noPip
      }`}
      style={{ gridRow: row, gridColumn: col }}
    />
  );
}

function CentrePips({ value, pipStyle }: CenterPipsProps) {
  const normalizedValue = value > 9 ? value - 10 : value;

  return (
    <div className={classes.container}>
      <Pip on={normalizedValue >= 2} row={1} col={1} pipStyle={pipStyle} />
      <Pip
        on={normalizedValue >= 8 && normalizedValue < 10}
        row={1}
        col={2}
        pipStyle={pipStyle}
      />
      <Pip on={normalizedValue >= 4} row={1} col={3} pipStyle={pipStyle} />
      <Pip on={normalizedValue >= 6} row={2} col={1} pipStyle={pipStyle} />
      <Pip on={normalizedValue % 2 === 1} row={2} col={2} pipStyle={pipStyle} />
      <Pip on={normalizedValue >= 6} row={2} col={3} pipStyle={pipStyle} />
      <Pip on={normalizedValue >= 4} row={3} col={1} pipStyle={pipStyle} />
      <Pip
        on={normalizedValue >= 8 && normalizedValue < 10}
        row={3}
        col={2}
        pipStyle={pipStyle}
      />
      <Pip on={normalizedValue >= 2} row={3} col={3} pipStyle={pipStyle} />
    </div>
  );
}

export default function Pips({
  value,
  isExtended,
  pipStyle = "solid",
}: PipsProps) {
  if (!isExtended) {
    return <CentrePips value={value} pipStyle={pipStyle} />;
  }

  return (
    <div className={classes.extendedContainer}>
      <Pip on={value >= 10} row={1} col={1} pipStyle={pipStyle} />
      <Pip on={value >= 20} row={1} col={2} pipStyle={pipStyle} />
      <Pip on={false} row={1} col={3} pipStyle={pipStyle} />
      <Pip on={value >= 20} row={1} col={4} pipStyle={pipStyle} />
      <Pip on={value >= 10} row={1} col={5} pipStyle={pipStyle} />
      <div className={classes.centrePips}>
        <CentrePips value={value} pipStyle={pipStyle} />
      </div>
      <Pip on={value >= 10} row={2} col={1} pipStyle={pipStyle} />
      <Pip on={value >= 10} row={2} col={5} pipStyle={pipStyle} />
      <Pip on={value >= 10} row={3} col={1} pipStyle={pipStyle} />
      <Pip on={value >= 10} row={3} col={5} pipStyle={pipStyle} />
      <Pip on={value >= 10} row={4} col={1} pipStyle={pipStyle} />
      <Pip on={value >= 10} row={4} col={5} pipStyle={pipStyle} />

      <Pip on={value >= 10} row={5} col={1} pipStyle={pipStyle} />
      <Pip on={value >= 20} row={5} col={2} pipStyle={pipStyle} />
      <Pip on={false} row={5} col={3} pipStyle={pipStyle} />
      <Pip on={value >= 20} row={5} col={4} pipStyle={pipStyle} />
      <Pip on={value >= 10} row={5} col={5} pipStyle={pipStyle} />
    </div>
  );
}
