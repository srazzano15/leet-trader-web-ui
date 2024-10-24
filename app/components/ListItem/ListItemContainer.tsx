import Avatar from "../Avatar";

interface ListItemContainerProps {
  rows?: number;
  cols?: 1 | 2 | 3;
  children?: React.ReactNode;
  header: string;
  subText?: string;
  containerClasses?: string
  items: any 
}

const ListItemContainer: React.FC<ListItemContainerProps> = ({
  header,
  subText,
  cols = 1,
  containerClasses,
  items
}) => {
  const stonks = [
    {
      symbol: "TSLA",
      logo: "https://cdn.brandfetch.io/tesla.com/icon/fallback/lettermark/",
      price: 260.48,
      name: "Tesla, Inc.",
      percentChange: 21.92,
    },
    {
      symbol: "MSFT",
      logo: "https://cdn.brandfetch.io/microsoft.com/icon/fallback/lettermark/",
      price: 424.48,
      name: "Microsoft Corporation",
      percentChange: 0.03,
    },
    {
      symbol: "NVDA",
      logo: "https://cdn.brandfetch.io/nvidia.com/icon/fallback/lettermark/",
      price: 140.48,
      name: "Nvidia Corporation",
      percentChange: 0.61,
    },
    {
      symbol: "AMZN",
      logo: "https://cdn.brandfetch.io/amazon.com/icon/fallback/lettermark/",
      price: 186.38,
      name: "Amazon.com, Inc.",
      percentChange: 0.9,
    },
    {
      symbol: "AMD",
      logo: "https://cdn.brandfetch.io/amd.com/icon/fallback/lettermark/",
      price: 260.48,
      name: "Advanced Micro Devices",
      percentChange: -1.48,
    },
    {
      symbol: "AFRM",
      logo: "https://cdn.brandfetch.io/affirm.com/icon/fallback/lettermark/",
      price: 44.96,
      name: "Affirm, Inc.",
      percentChange: 1.21,
    },
  ];

  const columnMap: { [key: number]: string } = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
  };
  return (
    <div className={`${containerClasses}`}>
      <div className="grid grid-flow-row auto-rows-max gap-y-2">
        <div className="header ">
          <a href="#">
            <h3 className="font-bold text-2xl w-max hover:text-green-500">
              {header}
            </h3>
          </a>
        </div>

        <div className="content">
          <div className={`grid ${columnMap[cols]} gap-3`}>
            {items?.map((stonk:any, index: any) => {
              if (index < 6) {

              
              return (
                <div key={stonk.symbol} className="container shadow-sm rounded-lg p-2 cursor-pointer bg-slate-50 hover:bg-slate-300">
                  <div className="grid gap-x-1 grid-flow-col grid-cols-[36px_1fr_min-content]">
                    <div className="avatar w-max row-span-2 self-center">
                      <Avatar source={stonk.logo} />
                    </div>

                    <div className="container row-span-1">{stonk.symbol}</div>
                    <div className="container row-span-1 text-sm text-gray-500 truncate">
                      {stonk.name}
                    </div>

                    <div className="group row-span-2">
                      <div className="text-right">${stonk.price?.toFixed(2)}</div>
                      <div
                        className={`${
                          stonk.percent_change > 0
                            ? "text-green-500"
                            : "text-red-500"
                        } text-right`}
                      >
                        {stonk.percent_change?.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            })}
          </div>
        </div>
        {subText && (
          <div className="sub-content">
            <a href="#" className="">
              <h6 className="text-green-500  w-fit  rounded-md">{subText}</h6>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListItemContainer;
