import { ReactNode } from "react";

interface Props {
  leftHeader: string | undefined;
  rightHeader?: number | string;
  subRight?: number | string;
  subLeft?: number | string;
  hasGained?: boolean
};

export interface ListItemProps {
  props: Props
  className?: string;
  headerClass?: string;
  children?: ReactNode;
}
