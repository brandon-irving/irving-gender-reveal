"use client";
import { getIsToday } from "@/helpers/dateHelpers";
import { GENDER_REVEAL_DATE } from "@/lib/constants";
import { useEffect, useState } from "react";
import Layout from "./ui/layout";

// Gender reveal date
export default function LiveStream() {
  const isToday = getIsToday(new Date(GENDER_REVEAL_DATE));
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const isLoading =
    !isToday &&
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;
  // Function to calculate time left
  function calculateTimeLeft() {
    const difference = +new Date(GENDER_REVEAL_DATE) - +new Date();
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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return <Layout> </Layout>;
  }
  if (isToday) {
    // Add livestream
    return "YAY";
  }
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 font-['Comic_Sans_MS',_cursive]">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
          Gender Reveal Coming Soon!
        </h1>

        {/* Announcement Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md text-center mb-8">
          <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
            Stay Tuned for the Big Moment!
          </h2>
          <p className="text-gray-600">
            We can’t wait to share the exciting reveal with you. Come back soon
            to witness the big surprise!
          </p>
        </div>

        {/* Countdown Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-4 text-center">
            <div className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
              {timeLeft.days}
            </div>
            <div className="text-gray-500 capitalize">Days</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 text-center">
            <div className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
              {timeLeft.hours}
            </div>
            <div className="text-gray-500 capitalize">Hours</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 text-center">
            <div className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
              {timeLeft.minutes}
            </div>
            <div className="text-gray-500 capitalize">Minutes</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 text-center">
            <div className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
              {timeLeft.seconds}
            </div>
            <div className="text-gray-500 capitalize">Seconds</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
