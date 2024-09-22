"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import useAddNameSuggestion from "@/hooks/useAddNameSuggestion";
import useCreateUser from "@/hooks/useCreateUser";
import useGetNameLoves from "@/hooks/useGetNameLoves";
import useGetNameSuggestions from "@/hooks/useGetNameSuggestions";
import useGetUsers from "@/hooks/useGetUsers";
import useLocalStorage from "@/hooks/useLocalStorage";
import useLoveName from "@/hooks/useLoveName";
import useSendLove from "@/hooks/useSendLove";
import useVote from "@/hooks/useVote";
import { Gender } from "@/lib/types";
import { Baby, Crown, Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Layout from "./ui/layout";

// Mock data for name suggestions
const firstNames = [
  "Olivia",
  "Emma",
  "Charlotte",
  "Amelia",
  "Liam",
  "Noah",
  "Oliver",
  "Elijah",
];
const middleNames = ["Grace", "Rose", "Mae", "James", "Alexander", "William"];

export function LandingPage() {
  const [savedName, , initializingWindow] = useLocalStorage("userName");
  // const [savedName, , initializingWindow] = useLocalStorage("userName");
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [loveCount, setLoveCount] = useState(0);
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);
  const [cyclingFirstName, setCyclingFirstName] = useState(firstNames[0]);
  const [cyclingMiddleName, setCyclingMiddleName] = useState(middleNames[0]);
  const [submitterFirstName, setSubmitterFirstName] = useState("");
  const [submitterMiddleName, setSubmitterMiddleName] = useState("");
  const [createUser] = useCreateUser();
  const [userName, setUserName] = useState(savedName || "");
  const [addNameSuggestion] = useAddNameSuggestion();
  const { nameSuggestions, isLoadingNameSuggestions } = useGetNameSuggestions();
  const { nameLoves } = useGetNameLoves();
  const { user, users, isLoading } = useGetUsers(userName);
  const [sendLove, isSendingLove] = useSendLove();
  const [vote] = useVote();
  const [loveName] = useLoveName();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(!savedName);

  const { boyPercentage, girlPercentage, boyVotes, girlVotes } = useMemo(() => {
    const boyVotes = users?.filter((user) => user.vote === "Boy")?.length || 0;
    const girlVotes =
      users?.filter((user) => user.vote === "Girl")?.length || 0;
    const totalVotes = boyVotes + girlVotes;
    const boyPercentage = totalVotes > 0 ? (boyVotes / totalVotes) * 100 : 0;
    const girlPercentage = totalVotes > 0 ? (girlVotes / totalVotes) * 100 : 0;

    return {
      boyPercentage,
      girlPercentage,
      boyVotes,
      girlVotes,
      totalVotes,
    };
  }, [users]);

  // Find the top 3 unique highest values in the "love" property
  const topThreeLoves = useMemo(() => {
    if (!users) return [];
    return Array.from(new Set(users?.map((user) => user.love)))
      .sort((a, b) => b - a)
      .slice(0, 3);
  }, [users]);

  const handleAddNameToStorage = async () => {
    if (userName.trim() !== "") {
      localStorage.setItem("userName", userName);
      await createUser({ name: userName, love: 0 });
      setIsModalOpen(false); // Close modal
    }
  };
  function calculateTimeLeft() {
    const difference = +new Date("2024-10-19") - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const countLove = () => {
    setLoveCount(loveCount + 1);
    setIsHeartAnimating(true);
    setTimeout(() => setIsHeartAnimating(false), 300);
  };

  const handleSendLove = async () => {
    if (!user) return;
    await sendLove(user, loveCount);
    setLoveCount(0);
    // Add success toaster
  };

  const voteGender = async (gender: Gender) => {
    if (!user) return;
    await vote(user, gender);
  };

  const submitName = async () => {
    if (submitterFirstName.trim() !== "") {
      await addNameSuggestion({
        suggestion: submitterFirstName + " " + submitterMiddleName,
        userNameWhoSuggested: userName,
      });
      setSubmitterFirstName("");
      setSubmitterMiddleName("");
    } else {
      // Add error toaster
    }
  };

  const handleLoveName = async (
    nameSuggestionId: string,
    userWhoLoved: string
  ) => {
    if (!user) return;
    await loveName(nameSuggestionId, userWhoLoved);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const cycleNames = setInterval(() => {
      setCyclingFirstName(
        firstNames[Math.floor(Math.random() * firstNames.length)]
      );
      setCyclingMiddleName(
        middleNames[Math.floor(Math.random() * middleNames.length)]
      );
    }, 1000);
    return () => clearInterval(cycleNames);
  }, []);

  if (isLoading || initializingWindow) return null;
  return (
    <>
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center p-4 font-['Comic_Sans_MS',_cursive]">
          <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
            Countdown to Gender Reveal!
          </h1>

          {/* Countdown Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div
                key={unit}
                className="bg-white rounded-lg shadow-lg p-4 text-center"
              >
                <div className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
                  {value}
                </div>
                <div className="text-gray-500 capitalize">{unit}</div>
              </div>
            ))}
          </div>

          {/* Leaderboard Section */}
          <div className="bg-gradient-to-r from-pink-100 to-blue-100 rounded-lg shadow-lg p-6 mb-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
              Leaderboard
            </h2>
            <div className="flex justify-between mb-4">
              <div
                onClick={countLove}
                className="flex items-center cursor-pointer select-none"
              >
                <Heart
                  color="red"
                  fill="red"
                  size={30}
                  className={`ease-in-out duration-300 ${
                    !isHeartAnimating ? "scale-110" : ""
                  }`}
                />
                <div className="ml-3 text-md font-bold text-black">
                  Tap to increase love
                </div>
              </div>
              <Button
                disabled={loveCount === 0 || isSendingLove}
                onClick={handleSendLove}
                className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white"
              >
                Send Love ({loveCount})
              </Button>
            </div>
            <div className="space-y-4 overflow-scroll h-96">
              {users?.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between bg-white bg-opacity-50 rounded-lg p-2"
                >
                  <div className="flex items-center">
                    <div className="relative">
                      <Image
                        height={40}
                        width={40}
                        src={user.avatar || "/images/mockProfile.png"}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      {topThreeLoves.includes(user.love) && (
                        <Crown
                          className={`absolute -top-2 -right-2 w-4 h-4 ${
                            user.love === topThreeLoves[0]
                              ? "text-yellow-400"
                              : user.love === topThreeLoves[1]
                                ? "text-gray-400"
                                : "text-yellow-600"
                          }`}
                        />
                      )}
                    </div>
                    <span className="ml-2 font-semibold text-black">
                      {user.name}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 font-bold text-black">
                      {user.love}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Poll Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
              Gender Poll
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Button
                  onClick={() => voteGender("Boy")}
                  className="w-1/3 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Baby className="mr-2" /> Boy
                </Button>
                <div className="w-2/3 ml-4">
                  <div className="flex justify-between text-sm text-black">
                    <span>Boy: {boyVotes} votes</span>
                    <span>{boyPercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={boyPercentage} className="h-8 ">
                    <div
                      className="text-black bg-blue-500 h-full transition-all flex items-center justify-end pr-2  font-bold"
                      style={{ width: `${boyPercentage}%` }}
                    >
                      {boyVotes} ({boyPercentage.toFixed(1)}%)
                    </div>
                  </Progress>
                </div>
              </div>
              <div className="flex items-center">
                <Button
                  onClick={() => voteGender("Girl")}
                  className="w-1/3 bg-pink-500 hover:bg-pink-600 text-white"
                >
                  <Baby className="mr-2" /> Girl
                </Button>
                <div className="w-2/3 ml-4">
                  <div className="text-black flex justify-between text-sm">
                    <span>Girl: {girlVotes} votes</span>
                    <span>{girlPercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={girlPercentage} className="h-8">
                    <div
                      className="text-black bg-pink-500 h-full transition-all flex items-center justify-end pr-2 text-white font-bold"
                      style={{ width: `${girlPercentage}%` }}
                    >
                      {girlVotes} ({girlPercentage.toFixed(1)}%)
                    </div>
                  </Progress>
                </div>
              </div>
            </div>
          </div>

          {/* Suggest a Name Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl h-96">
            <div className="flex flex-col md:flex-row md:space-x-6">
              <div id="section-1" className="w-full md:w-1/2 mb-6 md:mb-0">
                <h2 className="text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
                  Suggest a Name
                </h2>
                <div className="flex mb-4 space-x-2">
                  <div className=" flex justify-between items-center">
                    <Input
                      placeholder="First name"
                      value={submitterFirstName}
                      onChange={(e) => setSubmitterFirstName(e.target.value)}
                      className="w-2/3 text-black"
                    />
                    <Input
                      placeholder="Middle name"
                      value={submitterMiddleName}
                      onChange={(e) => setSubmitterMiddleName(e.target.value)}
                      className="w-2/3 text-black"
                    />
                  </div>
                  <Button
                    onClick={submitName}
                    className="w-1/3 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white"
                  >
                    Submit
                  </Button>
                </div>
                <>
                  <h2 className="text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
                    Need some inspiration?
                  </h2>
                  <div className="bg-gray-100 rounded-lg p-4 mb-4 h-16 flex items-center justify-center overflow-hidden">
                    <div className="text-2xl font-bold transition-all duration-1000 ease-in-out text-black">
                      {cyclingFirstName} {cyclingMiddleName} Irving
                    </div>
                  </div>
                </>
              </div>
              {isLoadingNameSuggestions ? null : (
                <div
                  id="section-2"
                  className="w-full md:w-1/2 max-h-60 overflow-y-auto"
                >
                  <h2 className="text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
                    Names
                  </h2>
                  {nameSuggestions?.map((name, index) => {
                    const numberOfLoves =
                      nameLoves?.filter(
                        (love) => love.nameSuggestionId === name._id
                      )?.length || 0;

                    return (
                      <div
                        key={index}
                        className="flex justify-between items-center bg-gray-50 rounded p-2 mb-2"
                      >
                        <div>
                          <span className="font-semibold text-black">
                            {name.suggestion} Irving
                          </span>
                          <br />
                          <span className="text-sm text-gray-500">
                            by {name.userNameWhoSuggested}
                          </span>
                        </div>
                        <Button
                          onClick={() =>
                            handleLoveName(name._id, user?._id || "")
                          }
                          className="bg-red-100 hover:bg-red-200 text-red-500"
                        >
                          <Heart
                            className={`mr-1 h-4 w-4 ${numberOfLoves > 0 ? "fill-red-500" : ""} `}
                          />
                          {numberOfLoves}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-filter backdrop-blur-lg">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-black">
              Enter Your Name
            </h2>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 w-full mb-4 text-black"
              placeholder="What should we call you?"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button
              className={`bg-blue-500 text-white py-2 px-4 rounded-md w-full ${
                userName.trim() === "" ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleAddNameToStorage}
              disabled={userName.trim() === ""}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
}
