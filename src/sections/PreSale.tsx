"use client";
import React, { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { getBalances } from "../utils/ethUtils";
import { TimeDifference } from "@/types";
import { diffTimeFromNow } from "@/utils/diffTimeFromNow";
import { stageData } from "@/data/stage.data";
import { classNames } from "@/utils/classNames";

const PreSaleInterface: React.FC = () => {
  const [balances, setBalances] = useState<{ [key: string]: string }>({});
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeDifference>({
    days: 29,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });
  const [progress] = useState(0);
  const [amount, setAmount] = useState(0.0);
  const [getAmount, setGetAmount] = useState(0.0);
  const [min, setMin] = useState(100.0);
  const [max, setMax] = useState(5000.0);
  const [paymentType, setPaymentType] = useState("ETH");
  const [stageIndex, setStageIndex] = useState<number>(0);
  const [targetDate, setTargetDate] = useState<Date>(
    new Date(stageData[stageIndex].endDate)
  );

  useEffect(() => {
    setTargetDate(new Date(stageData[stageIndex].endDate)); // Specify your target date here
  }, [stageIndex]);

  useEffect(() => {
    const difference = diffTimeFromNow(targetDate);
    if (difference.days === -1) setStageIndex(stageIndex + 1);
    setTimeLeft(difference);
  }, [stageIndex, targetDate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        } else if (prevTime.hours > 0) {
          return {
            ...prevTime,
            hours: prevTime.hours - 1,
            minutes: 59,
            seconds: 59,
          };
        } else if (prevTime.days > 0) {
          return {
            ...prevTime,
            days: prevTime.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prevTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    async function fetchBalances() {
      if (address) {
        setIsLoading(true);
        setError(null);
        try {
          const fetchedBalances = await getBalances(address);
          setBalances(fetchedBalances);
        } catch (err) {
          setError(`Failed to fetch balances. Please try again. ${err}`);
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchBalances();
  }, [address]);

  useEffect(() => {
    if (paymentType === "ETH") {
      setMin(0.4);
      setMax(2.0);
    }
    if (paymentType === "USDT") {
      setMin(100.0);
      setMax(5000.0);
    }
    if (paymentType === "USDC") {
      setMin(100.0);
      setMax(5000.0);
    }
    if (paymentType === "DAI") {
      setMin(100.0);
      setMax(5000.0);
    }
  }, [paymentType]);

  useEffect(()=> {
    let val = amount;
    val = val < min ? min : val;
    val = val > max ? max : val;
    setAmount(val);
  }, [amount, min, max]);

  // const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setAddress(e.target.value);
  // };
  // const copyToClipboard = (text: string) => {
  //   navigator.clipboard.writeText(text);
  //   alert("Copied to clipboard!");
  // };

  const handleMin = () => {
    setAmount(min);
  };

  const handleMax = () => {
    setAmount(max);
  };

  return (
    <div className="text-[#dbdbcf] flex items-center justify-center sm:px-8 md:px-12 lg:px-0 max-w-lg min-w-lg">
      <div className="border border-[#824B3D] rounded-lg shadow-lg w-full">
        <div className="w-full bg-[#131511] rounded-lg text-center py-6">
          <h1 className="text-2xl font-revoluti font-bold mb-6">PRE SALE 1</h1>
          <div className="px-2 mb-6 items-center">
            <div className="w-full bg-[#787871] border-[#824B3D] border-2 rounded-lg h-8">
              <div
                className="relative bg-[#824B3D] h-7 rounded-l-lg flex justify-end"
                style={{ width: `${(progress / 1000000) * 100}%` }}
              >
                <div className="absolute top-10 transform translate-x-1/2">
                  <div className="relative inline-block bg-[#e8e6d9] py-1 px-2 rounded">
                    <div className="absolute left-1/2 -top-1 w-2 h-2 bg-[#e8e6d9] transform -translate-x-1/2 rotate-45"></div>
                    <span className="text-base text-[#824B3D] font-bold font-revoluti">
                      {"$" + progress}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-3 ">
              <span className="text-base font-bold font-revoluti text-[#dbdbcf]">
                $1,020,000
              </span>
            </div>
          </div>

          <div className="mb-6">
            <p className="font-bold font-revoluti text-xl text-[#dbdbcf]">
              {stageIndex === 0 ? "TIME UNTIL START" : "TIME LEFT"}
            </p>
          </div>
          <div className="px-10 grid grid-cols-4 gap-4 mb-6">
            <div className="bg-[#212121] border border-orange-900 p-1 rounded">
              <div className="text-2xl font-revoluti">{timeLeft.days}</div>
              <div className="text-sm">days</div>
            </div>
            <div className="bg-[#212121] border border-orange-900 p-1 rounded">
              <div className="text-2xl font-revoluti">{timeLeft.hours}</div>
              <div className="text-sm">hours</div>
            </div>
            <div className="bg-[#212121] border border-orange-900 p-1 rounded">
              <div className="text-2xl font-revoluti">{timeLeft.minutes}</div>
              <div className="text-sm">minutes</div>
            </div>
            <div className="bg-[#212121] border border-orange-900 p-1 rounded">
              <div className="text-2xl font-revoluti">{timeLeft.seconds}</div>
              <div className="text-sm">seconds</div>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-base font-bold text-[#824b3d]">
              Current price $0.00008 / 3.000.000.000 left
            </p>
            <p className="text-base text-[#dbdbcf]">
              Next price $0.0001 / 4.000.000.000
            </p>
            <p className="text-base text-[#dbdbcf]">
              Phase 3 $0.00012 / 2.000.000.000
            </p>
            <p className="text-base text-[#dbdbcf]">
              Phase 4 $0.00014 / 1.000.000.000
            </p>
          </div>

          <div className="px-4 grid grid-cols-2 gap-x-8 gap-y-4 mb-10">
            <button
              className={`bg-[#353535] border-2 ${
                paymentType === "ETH" ? "border-orange-900" : "border-gray-600"
              } p-1 sm:p-2 lg:p-2 justify-center rounded-md flex items-center text-sm font-bold`}
              onClick={() => setPaymentType("ETH")}
            >
              <Image
                src={"/assets/icons/ethereum.svg"}
                alt="icon"
                width={24}
                height={24}
                className="mr-1.5"
              />
              Pay with ETH
            </button>
            <button
              className={`bg-[#353535] border-2 ${
                paymentType === "USDT" ? "border-orange-900" : "border-gray-600"
              } p-1 sm:p-2 lg:p-2 justify-center rounded-md flex items-center text-sm font-bold`}
              onClick={() => setPaymentType("USDT")}
            >
              <Image
                src={"/assets/icons/usdt.svg"}
                alt="icon"
                width={24}
                height={24}
                className="mr-1.5"
              />
              Pay with USDT
            </button>
            <button
              className={`bg-[#353535] border-2 ${
                paymentType === "DAI" ? "border-orange-900" : "border-gray-600"
              }  p-1 sm:p-2 lg:p-2 justify-center rounded-md flex items-center text-sm font-bold`}
              onClick={() => setPaymentType("DAI")}
            >
              <Image
                src={"/assets/icons/dai.svg"}
                alt="icon"
                width={24}
                height={24}
                className="mr-1.5"
              />
              Pay with DAI
            </button>
            <button
              className={`bg-[#353535] border-2 ${
                paymentType === "USDC" ? "border-orange-900" : "border-gray-600"
              }  p-1 sm:p-2 lg:p-2 justify-center rounded-md flex items-center text-sm font-bold`}
              onClick={() => setPaymentType("USDC")}
            >
              <Image
                src={"/assets/icons/usd-coin.svg"}
                alt="icon"
                width={24}
                height={24}
                className="mr-1.5"
              />
              Pay with USDC
            </button>
          </div>

          <div className="px-4 grid grid-cols-2 gap-4 mb-6">
            <div className="text-left">
              <label className="relative flex flex-row justify-between text-sm mb-1 sm:font-bold">
                <span>AMOUNT({paymentType})</span>
                <span
                  className={classNames(
                    "absolute right-0 bottom-0 flex flex-col text-right",
                    address==="" ? "hidden" : ""
                  )}
                >
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={handleMin}
                  >
                    MIN
                  </span>
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={handleMax}
                  >
                    MAX
                  </span>
                </span>
              </label>
              <input
                type={"number"}
                value={amount}
                min={min}
                max={max}
                step={paymentType === "ETH" ? 0.1 : 1}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                className="bg-[#353535] rounded p-2 text-[#dbdbcf] w-full"
              />
            </div>
            <div className="text-left">
              <label className="block text-sm mb-1 sm:font-bold">
                GET AMOUNT(FICCO)
              </label>
              <input
                type="number"
                value={getAmount}
                min={0}
                onChange={(e) => setGetAmount(parseFloat(e.target.value))}
                className="bg-[#353535] rounded p-2 text-[#dbdbcf] w-full"
              />
            </div>
          </div>

          <ConnectButton.Custom>
            {({ account, openAccountModal, openConnectModal }) => {
              if (account && account.address && account.address !== address) {
                setAddress(account.address);
              } else if (!account) {
                setAddress("");
              }
              return (
                <>
                  <div className="px-4 w-full flex flex-row justify-center gap-4">
                    <button
                      className="max-w-[70%] w-full bg-[#824B3D] p-3 rounded font-bold mb-4 hover:bg-orange-800 truncate"
                      onClick={account ? openAccountModal : openConnectModal}
                    >
                      {account ? account.displayName : "CONNECT WALLET"}
                    </button>
                    {account && (
                      <button
                        className="w-full bg-[#824B3D] p-3 rounded font-bold mb-4 hover:bg-orange-800 disabled:bg-[#333] disabled:cursor-not-allowed truncate"
                        disabled={
                          isLoading ||
                          parseFloat(balances[paymentType]) == 0 ||
                          parseFloat(balances[paymentType]) < amount
                        }
                        // onClick={account ? openAccountModal : openConnectModal}
                      >
                        BUY
                      </button>
                    )}
                  </div>
                  {account && (
                    <>
                      <p className="text-sm font-bold">
                        Your current holdings:
                      </p>
                      {/* <p className="text-sm mb-2">{account.displayBalance}</p> */}
                      {isLoading ? (
                        <p className="text-sm mb-2">Loading...</p>
                      ) : (
                        <p className="text-sm mb-2">
                          {balances[paymentType] + " " + paymentType}
                        </p>
                      )}
                      <p className="text-sm font-bold">Balance PICCO</p>
                      {isLoading ? (
                        <p className="text-sm mb-2">Loading...</p>
                      ) : (
                        <p className="text-sm mb-2">{"0"}</p>
                      )}
                      {error && <p className="text-red-500">{error}</p>}
                    </>
                  )}
                </>
              );
            }}
          </ConnectButton.Custom>
        </div>
        {/* <div className="w-full flex flex-col justify-center items-center">
            <h2>Presale ETH Balance Checker</h2>
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
              placeholder="Enter Ethereum address"
            />
            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {Object.entries(balances).map(([token, balance]) => (
              <p key={token}>
                {token} Balance: {balance}
              </p>
            ))}
          </div> */}
        <div className="flex flex-col items-center justify-between bg-[#353535] border-t border-orange-900 p-2 rounded-b-lg">
          <span className="text-xs font-bold">Contract address:</span>
          <div className="flex items-center gap-2 mt-1 justify-center w-[90%]">
            <span className="text-xs">TBA</span>
            {/* <button
              className="px-2 py-0.5 text-xs rounded-md bg-[#824B3D] hover:focus:bg-orange-800"
              onClick={() =>
                copyToClipboard("0x5384545c3190474713bdc48c3371fdbccd2b8e9")
              }
            >
              COPY
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreSaleInterface;
