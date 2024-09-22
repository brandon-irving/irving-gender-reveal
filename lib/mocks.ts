import { NameSuggestion, User } from "./types";

const mockUser: User = {
  _id: "1",
  _creationTime: "1",
  name: "Eiden",
  avatar: "/images/mockProfile.png",
  love: 0,
};

const mockNameSuggestion: NameSuggestion = {
  _id: "3",
  _creationTime: "1",
  suggestion: "Eiden",
  userNameWhoSuggested: "Eiden",
  love: 0,
};
const generateMockUsers = () => {
  const users = Array.from({ length: 100 }).map((_, index) => {
    return {
      _id: index.toString(),
      _creationTime: "1",
      name: "mock" + index,
      avatar: "/images/mockProfile.png",
      love: Math.floor(Math.random() * 100),
      vote: Math.random() > 0.5 ? "Boy" : "Girl",
    };
  });
  return users;
};
export const generateMockData = {
  users: [mockUser, ...generateMockUsers()],
  nameSuggestions: generateMockUsers().map((user, index) => ({
    ...mockNameSuggestion,
    suggestion: user.name + " " + mockNameSuggestion.suggestion + " " + index,
    userNameWhoSuggested: user.name,
  })),
};
