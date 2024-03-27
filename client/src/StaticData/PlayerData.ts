import { Player } from "@backend/types";

const player1: Player = {
  id: 1,
  name: "steven",
  image: "empty-avatar",
  color: "red",
  vp: 1,
  resources: 2,
  stats: [1, 2, 3, 4, 5, 6, 7, 8, 9],
};

const player2: Player = {
  id: 2,
  name: "steve",
  image: "empty-avatar",
  color: "orange",
  vp: 7,
  resources: 15,
  stats: [2, 2, 2, 2, 2, 2, 2, 2, 2],
};

const player3: Player = {
  id: 3,
  name: "stevie",
  image: "empty-avatar",
  color: "green",
  vp: 18,
  resources: 98,
  stats: [2, 2, 2, 2, 2, 2, 2, 2, 2],
};

const player4: Player = {
  id: 4,
  name: "stephan",
  image: "empty-avatar",
  color: "blue",
  vp: 7,
  resources: 1,
  stats: [2, 2, 2, 2, 2, 2, 2, 2, 2],
};

export const players = [player1, player2, player3, player4];
