"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useState } from "react";
import Layout from "./ui/layout";

type ParentInfo = {
  name: string;
  likes: string[];
  dislikes: string[];
  interestingFacts: string[];
  commonPhrases: string[];
  favoriteFood: string;
  birthday: string;
  videoUrl: string;
};

const parentData: Record<"mom" | "dad", ParentInfo> = {
  mom: {
    name: "Mom",
    likes: ["Gardening", "Cooking", "Reading"],
    dislikes: ["Loud noises", "Clutter", "Being late"],
    interestingFacts: [
      "Speaks three languages",
      "Has run two marathons",
      "Can play the piano",
    ],
    commonPhrases: [
      "Did you eat?",
      "Don't forget your jacket!",
      "I love you to the moon and back",
    ],
    favoriteFood: "Sushi",
    birthday: "May 15",
    videoUrl: "https://example.com/mom-video.mp4",
  },
  dad: {
    name: "Dad",
    likes: ["Fishing", "Woodworking", "Watching sports"],
    dislikes: ["Traffic", "Doing dishes", "Waking up early"],
    interestingFacts: [
      "Played college football",
      "Can juggle",
      "Built our backyard deck",
    ],
    commonPhrases: [
      "Hi, Hungry, I'm Dad",
      "When I was your age...",
      "That's not going anywhere",
    ],
    favoriteFood: "BBQ ribs",
    birthday: "September 3",
    videoUrl: "https://example.com/dad-video.mp4",
  },
};

export function MeetTheParents() {
  const [, setSelectedParent] = useState<"mom" | "dad" | null>(null);
  const [showAboutMe, setShowAboutMe] = useState(false);

  const handleParentSelect = (parent: "mom" | "dad") => {
    setSelectedParent(parent);
    setShowAboutMe(false);
  };

  const handleCloseModal = () => {
    setSelectedParent(null);
    setShowAboutMe(false);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center space-y-4 p-4">
        <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
          Meet the Parents
        </h2>
        <div className="flex space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={() => handleParentSelect("mom")}
                className="bg-pink-500 hover:bg-pink-600 text-white"
              >
                Meet Mom
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Meet Mom</DialogTitle>
                <Button
                  className="absolute right-4 top-4"
                  variant="ghost"
                  onClick={handleCloseModal}
                ></Button>
              </DialogHeader>
              <ParentContent
                parent="mom"
                showAboutMe={showAboutMe}
                setShowAboutMe={setShowAboutMe}
              />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={() => handleParentSelect("dad")}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Meet Dad
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Meet Dad</DialogTitle>
              </DialogHeader>
              <ParentContent
                parent="dad"
                showAboutMe={showAboutMe}
                setShowAboutMe={setShowAboutMe}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
}

function ParentContent({
  parent,
  showAboutMe,
  setShowAboutMe,
}: {
  parent: "mom" | "dad";
  showAboutMe: boolean;
  setShowAboutMe: (show: boolean) => void;
}) {
  const parentInfo = parentData[parent];

  return (
    <Tabs defaultValue={showAboutMe ? "about" : "video"} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="video">Video</TabsTrigger>
        <TabsTrigger value="about" onClick={() => setShowAboutMe(true)}>
          About Me
        </TabsTrigger>
      </TabsList>
      <TabsContent value="video" className="mt-4">
        <div className="aspect-video bg-muted">
          <Image
            src="https://storage.googleapis.com/mega-coders.appspot.com/baby-announcement/images/_brandon.JPG"
            height={400}
            width={400}
            alt={`${parentInfo.name} placeholder`}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Video player placeholder
        </p>
      </TabsContent>
      <TabsContent value="about" className="mt-4">
        <div className="space-y-4">
          <InfoSection title="Likes" items={parentInfo.likes} />
          <InfoSection title="Dislikes" items={parentInfo.dislikes} />
          <InfoSection
            title="Interesting Facts"
            items={parentInfo.interestingFacts}
          />
          <InfoSection
            title="Common Phrases"
            items={parentInfo.commonPhrases}
          />
          <p>
            <strong>Favorite Food:</strong> {parentInfo.favoriteFood}
          </p>
          <p>
            <strong>Birthday:</strong> {parentInfo.birthday}
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}

function InfoSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <ul className="list-disc list-inside">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
