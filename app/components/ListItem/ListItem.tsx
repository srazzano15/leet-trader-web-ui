import { ReactNode } from "react";
import { ListItemProps } from "./types";


const ListItem: React.FC<ListItemProps> = ({
  className,
  headerClass,
  children,
  props
}) => {
  return (
    <li
      className={`border-b border-gray-300 flex justify-between items-center ${className}`}
    >
      <div className="">
        <span className={`block ${headerClass}`}>{props.leftHeader}</span>
        {props.subLeft && (
          <span className="block text-xs text-slate-400">{props.subLeft}</span>
        )}
      </div>
      {children}
      {!children && (
        <div className="text-right">
          <span className={`block ${headerClass}`}>${props.rightHeader}</span>
          <span className={`block text-xs ${props.hasGained ? 'text-emerald-500' : 'text-red-500'}`}>{`${props.subRight}`}</span>
        </div>
      )}
    </li>
  );
};

export default ListItem;
