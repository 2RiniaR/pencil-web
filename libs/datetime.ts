import dayjs, { OpUnitType, QUnitType } from "dayjs";

export function formatExceededTime(date: Date | string | undefined): string {
  if (date === undefined) return "---";
  const fromTime = dayjs(Date.now());
  const toTime = dayjs(date);

  if (fromTime.diff(toTime) < 0) return "---";
  const expressions: { unit: QUnitType | OpUnitType; display: (x: number) => string }[] = [
    { unit: "year", display: (x) => `${x}年前` },
    { unit: "month", display: (x) => `${x}か月前` },
    { unit: "week", display: (x) => `${x}週間前` },
    { unit: "day", display: (x) => `${x}日前` },
    { unit: "hour", display: (x) => `${x}時間前` },
    { unit: "minute", display: (x) => `${x}分前` }
  ];
  for (let i = 0; i < expressions.length; i++) {
    const delta = fromTime.diff(toTime, expressions[i].unit);
    if (delta > 0) return expressions[i].display(delta);
  }
  const finalExpression = expressions[expressions.length - 1];
  return finalExpression.display(0);
}

export function formatDisplayDate(date: Date | string | undefined): string {
  if (date === undefined) return "----.--.--";
  return dayjs(date).format("YYYY.MM.DD");
}
