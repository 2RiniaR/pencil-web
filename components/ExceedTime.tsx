"use client";

import { formatExceededTime } from "~/libs/datetime";

type Props = {
  from: string | Date | undefined;
};

export const ExceedTime = ({ from }: Props) => {
  return <>{formatExceededTime(from)}</>;
};
