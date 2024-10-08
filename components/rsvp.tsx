"use client";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Layout from "./ui/layout";

export default function RSVP() {
  const addRsvp = useMutation(api.rsvp.addRsvp);
  const updateRsvp = useMutation(api.rsvp.updateRsvp);
  const searchParams = useSearchParams();
  const responseParam = searchParams.get("response") || "";
  const obscureEmail = searchParams.get("email") || "";
  const email = obscureEmail.replace(/_/g, "@");
  const alreadyRsvp = useQuery(api.rsvp.getRsvp, { email });

  const [response, setResponse] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dirty, setDirty] = useState(false);

  // Set initial state based on alreadyRsvp or query params
  useEffect(() => {
    if (alreadyRsvp) {
      setResponse(alreadyRsvp.response);
      setName(alreadyRsvp.name || "");
    } else {
      if (!["yes", "no"].includes(responseParam)) {
        redirect("/");
      } else {
        if (responseParam === "no") {
          addRsvp({ response: responseParam, email });
        }
        setResponse(responseParam);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alreadyRsvp]);

  // Detect changes and mark form as dirty
  useEffect(() => {
    if (alreadyRsvp) {
      const initialResponse = alreadyRsvp.response;
      const initialName = alreadyRsvp.name || "";
      if (response !== initialResponse || name !== initialName) {
        setDirty(true);
      } else {
        setDirty(false);
      }
    }
  }, [response, name, alreadyRsvp]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!alreadyRsvp) {
      addRsvp({ response, email, name });
    } else {
      updateRsvp({ response, email, name });
    }
    setIsSubmitted(true);
    setDirty(false);
  };

  // Wait for alreadyRsvp to load
  if (alreadyRsvp === undefined) {
    return <Layout> </Layout>;
  }

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 font-['Comic_Sans_MS',_cursive]">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500 whitespace-pre">
          {isSubmitted
            ? "Your RSVP has been updated!"
            : response === "yes" && !alreadyRsvp
              ? "Enter Your Name\nto complete the RSVP!"
              : response === "yes" && alreadyRsvp
                ? `Thank you for your RSVP ${alreadyRsvp.name}!`
                : response === "no"
                  ? "Sorry You Can't Make It!"
                  : "Thank you for RSVPing!"}
        </h1>

        {/* Message */}
        <div className="text-center text-lg text-gray-700 mb-8 bg-white p-5 rounded-lg shadow-lg w-full max-w-2xl">
          {!isSubmitted ? (
            <>
              <p className="mb-4">
                {response === "yes"
                  ? "We're excited to see you at the event!"
                  : response === "no"
                    ? "But no worries! We will be livestreaming the event here!"
                    : `Your current RSVP is: ${response}`}
              </p>
              {response === "no" && (
                <a
                  className="text-blue-500 hover:text-blue-600"
                  href="/livestream"
                >
                  Live stream
                </a>
              )}
              {/* Form to capture/update the user's response and name */}
              <form onSubmit={handleSubmit} className="mt-4">
                <label className="block mb-2">
                  <span className="text-gray-700">Response:</span>
                  <select
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    className="block w-full mt-1"
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </label>
                {response === "yes" && (
                  <label className="block mb-2">
                    <span className="text-gray-700">Name:</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      className="block w-full mt-1 p-2 border rounded"
                      required
                    />
                  </label>
                )}
                <button
                  type="submit"
                  style={{
                    opacity: dirty ? 1 : 0.5,
                  }}
                  className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-bold w-full"
                  disabled={!dirty} // Disable if no changes
                >
                  {alreadyRsvp ? "Update RSVP" : "Submit"}
                </button>
              </form>
            </>
          ) : (
            <>
              <p className="mb-4">
                Thank you! Your RSVP has been updated to:{response}.
                {response === "no" &&
                  ` You should still add the event to the calendar to view our livestream!`}
                {response === "yes" &&
                  ` We look forward to seeing you, ${name}!`}
              </p>
            </>
          )}
        </div>

        {/* Buttons */}
        <>
          <a
            href="https://calendar.google.com/calendar/r/eventedit?text=Irving+Gender+Reveal+Party&dates=20241018T180000/20241018T220000&details=Join+us+for+our+gender+reveal+party!&location=15274+Pacey+Cove+Dr,+Orlando,+FL+32824&sf=true"
            target="_blank"
            className="mb-5 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-bold"
          >
            Add to Calendar
          </a>
          <a
            href="/"
            className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-bold"
          >
            Back to Home
          </a>
        </>
      </div>
    </Layout>
  );
}
