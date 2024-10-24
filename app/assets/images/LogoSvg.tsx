interface LogoSvgProps {
  height?: number;
  color?: string;
}

const LogoSvg: React.FC<LogoSvgProps> = ({
  height = 356,
  color = "currentColor",
}) => {
    const width = height * (1500/356)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      /* xmlns:svgjs="http://svgjs.dev/svgjs" */
      width={width}
      height={height}
      viewBox="0 0 1500 356"
      fill={color}
    >
      <g transform="matrix(1,0,0,1,-0.9090909090909918,-0.3087831564598673)">
        <svg
          viewBox="0 0 396 94"
          data-background-color="#ffffff"
          preserveAspectRatio="xMidYMid meet"
          height="356"
          width="1500"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g
            id="tight-bounds"
            transform="matrix(1,0,0,1,0.2400000000000091,0.08153263120007637)"
          >
            <svg
              viewBox="0 0 395.52 93.83658334406488"
              height="93.83658334406488"
              width="395.52"
            >
              <g>
                <svg
                  viewBox="0 0 552.936813474254 131.18350875196828"
                  height="93.83658334406488"
                  width="395.52"
                >
                  <g transform="matrix(1,0,0,1,157.41681347425398,37.81118294741271)">
                    <svg
                      viewBox="0 0 395.52 55.561142857142855"
                      height="55.561142857142855"
                      width="395.52"
                    >
                      <g id="textblocktransform">
                        <svg
                          viewBox="0 0 395.52 55.561142857142855"
                          height="55.561142857142855"
                          width="395.52"
                          id="textblock"
                        >
                          <g>
                            <svg
                              viewBox="0 0 395.52 55.561142857142855"
                              height="55.561142857142855"
                              width="395.52"
                            >
                              <g transform="matrix(1,0,0,1,0,0)">
                                <svg
                                  width="395.52"
                                  viewBox="4 -35 251.98 35.4"
                                  height="55.561142857142855"
                                  data-palette-color="#636365"
                                >
                                  <path
                                    d="M7.25 0Q5.7 0 4.85-0.85 4-1.7 4-3.25L4-3.25 4-35 7.7-35 7.7-3.3 26.7-3.3 26.7 0 7.25 0ZM39.5 0.4Q35.3 0.4 32.75-2.08 30.2-4.55 30.2-8.65L30.2-8.65 30.2-15.8Q30.2-20.1 32.75-22.73 35.3-25.35 39.5-25.35L39.5-25.35 43.6-25.35Q47.6-25.35 50.05-22.8 52.5-20.25 52.5-16.05L52.5-16.05 52.5-11.65 33.8-11.65 33.8-8.65Q33.8-6.05 35.37-4.42 36.95-2.8 39.5-2.8L39.5-2.8 43.3-2.8Q45.8-2.8 47.35-4.17 48.9-5.55 48.9-7.85L48.9-7.85 52.4-7.85Q52.4-4.15 49.9-1.88 47.4 0.4 43.3 0.4L43.3 0.4 39.5 0.4ZM33.8-14.75L48.9-14.75 48.9-16.05Q48.9-18.8 47.45-20.48 46-22.15 43.6-22.15L43.6-22.15 39.5-22.15Q36.95-22.15 35.37-20.4 33.8-18.65 33.8-15.8L33.8-15.8 33.8-14.75ZM67.09 0.4Q62.9 0.4 60.35-2.08 57.8-4.55 57.8-8.65L57.8-8.65 57.8-15.8Q57.8-20.1 60.35-22.73 62.9-25.35 67.09-25.35L67.09-25.35 71.2-25.35Q75.2-25.35 77.65-22.8 80.09-20.25 80.09-16.05L80.09-16.05 80.09-11.65 61.4-11.65 61.4-8.65Q61.4-6.05 62.97-4.42 64.55-2.8 67.09-2.8L67.09-2.8 70.9-2.8Q73.4-2.8 74.95-4.17 76.5-5.55 76.5-7.85L76.5-7.85 80-7.85Q80-4.15 77.5-1.88 75 0.4 70.9 0.4L70.9 0.4 67.09 0.4ZM61.4-14.75L76.5-14.75 76.5-16.05Q76.5-18.8 75.05-20.48 73.59-22.15 71.2-22.15L71.2-22.15 67.09-22.15Q64.55-22.15 62.97-20.4 61.4-18.65 61.4-15.8L61.4-15.8 61.4-14.75ZM95.89 0Q91.94 0 90.22-1.7 88.49-3.4 88.49-7.3L88.49-7.3 88.49-21.75 84.09-21.75 84.09-24.95 88.49-24.95 88.49-32.5 92.09-32.5 92.09-24.95 98.59-24.95 98.59-21.75 92.09-21.75 92.09-7.3Q92.09-5.1 92.97-4.15 93.84-3.2 95.89-3.2L95.89-3.2 98.59-3.2 98.59 0 95.89 0ZM126.99 0L126.99-31.8 115.89-31.8 115.89-35 141.79-35 141.79-31.8 130.69-31.8 130.69 0 126.99 0ZM141.79 0L141.79-24.95 145.29-24.95 145.29-21.1Q146.29-22.85 148.31-23.95 150.34-25.05 152.54-25.05L152.54-25.05 154.74-25.05 154.74-21.8 152.54-21.8Q149.34-21.8 147.36-19.78 145.39-17.75 145.39-14.4L145.39-14.4 145.39 0 141.79 0ZM165.93 0.4Q162.28 0.4 160.11-1.5 157.93-3.4 157.93-6.6L157.93-6.6 157.93-8.2Q157.93-11.35 160.18-13.25 162.43-15.15 166.13-15.15L166.13-15.15 169.33-15.15Q170.98-15.15 172.73-14.65 174.48-14.15 175.73-13.3L175.73-13.3 175.73-17.45Q175.73-19.55 174.43-20.88 173.13-22.2 170.98-22.2L170.98-22.2 166.98-22.2Q164.83-22.2 163.53-21.2 162.23-20.2 162.23-18.55L162.23-18.55 158.63-18.55Q158.63-21.6 160.93-23.48 163.23-25.35 166.98-25.35L166.98-25.35 170.98-25.35Q174.68-25.35 176.96-23.18 179.23-21 179.23-17.45L179.23-17.45 179.23 0 175.83 0 175.83-3.5Q174.68-1.7 172.81-0.65 170.93 0.4 168.93 0.4L168.93 0.4 165.93 0.4ZM165.93-2.75L169.03-2.75Q171.38-2.75 173.23-4.2 175.08-5.65 175.73-8.05L175.73-8.05 175.73-9.9Q174.73-10.85 172.96-11.43 171.18-12 169.33-12L169.33-12 166.13-12Q164.08-12 162.81-10.95 161.53-9.9 161.53-8.2L161.53-8.2 161.53-6.6Q161.53-4.85 162.73-3.8 163.93-2.75 165.93-2.75L165.93-2.75ZM194.28 0.4Q191.73 0.4 189.73-0.8 187.73-2 186.63-4.15 185.53-6.3 185.53-9.15L185.53-9.15 185.53-15.15Q185.53-18.15 186.68-20.48 187.83-22.8 189.93-24.08 192.03-25.35 194.73-25.35L194.73-25.35 198.43-25.35Q200.13-25.35 201.71-24.55 203.28-23.75 204.23-22.35L204.23-22.35 204.23-35 207.83-35 207.83 0 204.33 0 204.33-3.7Q203.18-1.85 201.33-0.73 199.48 0.4 197.73 0.4L197.73 0.4 194.28 0.4ZM194.38-2.8L197.63-2.8Q199.23-2.8 200.73-3.83 202.23-4.85 203.18-6.5 204.13-8.15 204.23-9.9L204.23-9.9 204.23-16.2Q203.88-18.85 202.26-20.5 200.63-22.15 198.33-22.15L198.33-22.15 194.83-22.15Q192.28-22.15 190.71-20.23 189.13-18.3 189.13-15.15L189.13-15.15 189.13-9.15Q189.13-6.35 190.61-4.58 192.08-2.8 194.38-2.8L194.38-2.8ZM223.73 0.4Q219.53 0.4 216.98-2.08 214.43-4.55 214.43-8.65L214.43-8.65 214.43-15.8Q214.43-20.1 216.98-22.73 219.53-25.35 223.73-25.35L223.73-25.35 227.83-25.35Q231.83-25.35 234.28-22.8 236.73-20.25 236.73-16.05L236.73-16.05 236.73-11.65 218.03-11.65 218.03-8.65Q218.03-6.05 219.6-4.42 221.18-2.8 223.73-2.8L223.73-2.8 227.53-2.8Q230.03-2.8 231.58-4.17 233.13-5.55 233.13-7.85L233.13-7.85 236.63-7.85Q236.63-4.15 234.13-1.88 231.63 0.4 227.53 0.4L227.53 0.4 223.73 0.4ZM218.03-14.75L233.13-14.75 233.13-16.05Q233.13-18.8 231.68-20.48 230.23-22.15 227.83-22.15L227.83-22.15 223.73-22.15Q221.18-22.15 219.6-20.4 218.03-18.65 218.03-15.8L218.03-15.8 218.03-14.75ZM243.03 0L243.03-24.95 246.53-24.95 246.53-21.1Q247.53-22.85 249.55-23.95 251.58-25.05 253.78-25.05L253.78-25.05 255.98-25.05 255.98-21.8 253.78-21.8Q250.58-21.8 248.6-19.78 246.63-17.75 246.63-14.4L246.63-14.4 246.63 0 243.03 0Z"
                                    opacity="1"
                                    transform="matrix(1,0,0,1,0,0)"
                                    fill={color}
                                    className="wordmark-text-0"
                                    data-fill-palette-color="primary"
                                    id="text-0"
                                  ></path>
                                </svg>
                              </g>
                            </svg>
                          </g>
                        </svg>
                      </g>
                    </svg>
                  </g>
                  <g>
                    <svg
                      viewBox="0 0 131.18350875196828 131.18350875196828"
                      height="131.18350875196828"
                      width="131.18350875196828"
                    >
                      <g>
                        <svg></svg>
                      </g>
                      <g id="icon-0">
                        <svg
                          viewBox="0 0 131.18350875196828 131.18350875196828"
                          height="131.18350875196828"
                          width="131.18350875196828"
                        >
                          <g>
                            <path
                              d="M0 65.592c0-36.225 29.366-65.592 65.592-65.592 36.225 0 65.592 29.366 65.592 65.592 0 36.225-29.366 65.592-65.592 65.592-36.225 0-65.592-29.366-65.592-65.592zM65.592 126.173c33.458 0 60.581-27.123 60.581-60.581 0-33.458-27.123-60.581-60.581-60.581-33.458 0-60.581 27.123-60.581 60.581 0 33.458 27.123 60.581 60.581 60.581z"
                              data-fill-palette-color="accent"
                              fill={color}
                              stroke="transparent"
                            ></path>
                          </g>
                          <g transform="matrix(1,0,0,1,31.39633547978957,31.39633547978957)">
                            <svg
                              viewBox="0 0 68.39083779238914 68.39083779238914"
                              height="68.39083779238914"
                              width="68.39083779238914"
                            >
                              <g>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 8 8"
                                  x="0"
                                  y="0"
                                  height="68.39083779238914"
                                  width="68.39083779238914"
                                  className="icon-dxe-0"
                                  data-fill-palette-color="accent"
                                  id="dxe-0"
                                >
                                  <path
                                    d="M7.03 0L4 3 3 2 0 5.03 1 6.03 3 4 4 5 8 1zM0 7V8H8V7z"
                                    fill={color}
                                    data-fill-palette-color="accent"
                                  ></path>
                                </svg>
                              </g>
                            </svg>
                          </g>
                        </svg>
                      </g>
                    </svg>
                  </g>
                </svg>
              </g>
              <defs></defs>
            </svg>
            <rect
              width="395.52"
              height="93.83658334406488"
              fill={color}
              stroke="none"
              visibility="hidden"
            ></rect>
          </g>
        </svg>
      </g>
    </svg>
  );
};

export default LogoSvg;
