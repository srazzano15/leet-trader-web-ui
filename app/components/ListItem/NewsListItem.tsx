import moment from "moment";
import Avatar from "../Avatar";
import React from "react";
import Image from "next/image";
import { getDomain } from "@/app/helpers/helpers";

interface NewsListItemProps {
  id: number | string
  images: any[]
  url: string
  headline: string
  created_at: string
  author: string
}

type NewsListItem = {
  props: NewsListItemProps;
  onClick?: () => void
};

const NewsListItem: React.FC<NewsListItem> = ({ props, onClick }) => {
  return (
    <a
      key={props.id}
      className="container max-h-[110px] rounded-lg p-2 cursor-pointer border bg-gray-100 hover:bg-slate-300"
      onClick={onClick}
    >
      <div className="grid gap-2 grid-flow-col grid-cols-[125px_1fr_min-content] items-stretch h-full">
        <div className="avatar w-max row-span-2 self-center">
          <img
            src={
              props.images.length > 0
                ? props.images[2].url
                : `https://cdn.brandfetch.io/${getDomain(
                    props.url
                  )}/logo/fallback/lettermark`
            }
            alt="News article image"
            className="max-h-24 max-w-[125px]"
          />
        </div>

        <div className="row-span-1 text-sm font-semibold text-gray-700 overflow-hidden text-ellipsis whitespace-normal line-clamp-3 h-16">
          {props.headline}
        </div>
        <div className="published-at text-xs text-gray-500 self-end">
          {moment(props.created_at).fromNow()} &sdot; {props.author}
        </div>
      </div>
    </a>
  );
};

export default NewsListItem;
