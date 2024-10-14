import { ReactNode } from "react";

interface Props {
  leftHeader: string;
  rightHeader?: number | string;
  subRight?: number | string;
  subLeft?: number | string;
};

export interface ListItemProps {
  props: Props
  className?: string;
  headerClass?: string;
  children?: ReactNode;
}
