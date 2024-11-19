"use client";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import mpld3 from 'mpld3'

type Props = {};

const Backtest = (props: Props) => {
  const [isTesting, setIsTesting] = useState<boolean>(true);
  const [conditions, setConditions] = useState<any[]>([
    {
      side: 'buy',
      condition: 'and',
      intervalRange: 1,
      closed: 'below',
      indicator: 'SimpleMovingAverage',

    },
    {}
  ])
  const [parameters, setParameters] = useState<any>({
    ticker: 'AMZN',
    cash: 25000,
    commission: 0.0015,
    interval: '5 Minutes',
    period: 30
  })
  const [result, setResult] = useState<any>()

  const tileStyles =
    "tile shadow-md w-48 rounded border-x border-t p-3 bg-white grow inline";

    useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/mpld3/0.5.7/mpld3.min.js";
      script.async = true;
      document.body.appendChild(script);
  }, []);

    useEffect(() => {
      (async() => {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/backtest/quick/', {
            ticker: 'AMZN'
          })
          setResult(response.data)
        } catch (error) {
          console.error(error)
        }
      })()
    }, [])
  return (
    <div id="backtest" className="bg-white grid grid-flow-col grid-cols-8 min-h-[87vh]">
      {/*-- Left Aside--*/}
      <section className="col-span-1">
        <div className="grid grid-flow-row auto-rows-max gap-y-2">Left Side</div>
      </section>

      {/*-- Main --*/}
      <section className="col-span-6 border-x bg-gray-100">
        {/*-- Strategy Builder --*/}
        <div id="strategy-builder" className="grid p-3">
          {/*-- Top Row (4 tiles) --*/}
          <div className="grow mb-2">
            <h4 className="text-2xl">Test Parameters</h4>
            <span className="text-gray-500 text-sm">
              Define the parameters in which you would like to run your strategy
              test. <strong>By default, each trade will use 90% of your available cash.</strong>
            </span>
          </div>
          <div className="flex gap-x-3">
            <div className={tileStyles}>
              <h6 className=" text-gray-500">Ticker</h6>
              <div className="text-2xl flex justify-between items-center">
                <span>{ parameters.ticker }</span>
                <FontAwesomeIcon
                  icon={faPen}
                  size="xs"
                  className=" text-gray-300 "
                />
              </div>
            </div>
            <div className={tileStyles}>
              <h6 className=" text-gray-500">Cash</h6>

              <div className="text-2xl flex justify-between items-center">
                <span>${parameters.cash}</span>
                <FontAwesomeIcon
                  icon={faPen}
                  size="xs"
                  className=" text-gray-300 "
                />
              </div>
            </div>
            <div className={tileStyles}>
              <h6 className=" text-gray-500">Commissions</h6>

              <div className="text-2xl flex justify-between items-center">
                <span>{ parameters.commission * 100 }%</span>
                <FontAwesomeIcon
                  icon={faPen}
                  size="xs"
                  className=" text-gray-300 "
                />
              </div>
            </div>
            <div className={tileStyles}>
              <h6 className=" text-gray-500">Interval</h6>

              <div className="text-2xl flex justify-between items-center">
                <span>{parameters.interval}</span>
                <FontAwesomeIcon
                  icon={faPen}
                  size="xs"
                  className=" text-gray-300 "
                />
              </div>
            </div>
            <div className={tileStyles}>
              <h6 className=" text-gray-500">Period</h6>

              <div className="text-2xl flex justify-between items-center">
                <span>Past {parameters.period} Days</span>
                <FontAwesomeIcon
                  icon={faPen}
                  size="xs"
                  className=" text-gray-300 "
                />
              </div>
            </div>
          </div>

          {/*-- Body --*/}
          <div className="flex flex-col pt-10">
            {/*-- Header --*/}

            <div className="mb-2">
              <h4 className="text-2xl">Trade Conditions</h4>
              <span className="text-gray-500 text-sm">
                Define the conditions in which you would like to enter and exit
                a position. By default, you may only enter a trade if you are
                not currently in one.
              </span>
            </div>

            {/*-- Right --*/}
            <div className="bg-white p-3 rounded shadow-md border-x border-t">
              
              
              <div>
              <Button classes="text-green-600"><FontAwesomeIcon icon={faPlus} size="xs"/><span className="ml-2">Add Condition</span></Button>
              </div>
            </div>
            {result}
          </div>
        </div>

        {!isTesting && (
          <div className="grid grid-flow-row auto-rows-max gap-y-2 py-2 items-center">
            <h2 className="text-2xl text-center">
              Welcome to the Leet Trader Strategy Backtester
            </h2>
            <h6 className="text-center text-gray-500">
              Whether you’re a seasoned trader or just starting out, experiment
              confidently by refining your strategies and make data-driven
              trading decisions.
            </h6>
            <div className="mt-5 flex justify-center">
              <Button
                onClick={() => setIsTesting(true)}
                text="Quick Test"
                classes="transition rounded-xl text-lg py-2 px-6 text-white bg-gradient-to-r from-green-600 via-emerald-500 to-yellow-300 hover:opacity-80"
              />
            </div>
          </div>
        )}
      </section>

      {/*-- Right Aside --*/}
      <section className="col-span-1">
        <div className="grid grid-flow-row auto-rows-max gap-y-2">Right Side</div>
      </section>
    </div>
  );
};

export default Backtest;
