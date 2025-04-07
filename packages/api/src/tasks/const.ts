export const TASK_STATUS = {
  OPEN: { name: "OPEN", value: "Open", color: "orange" },
  IN_PROGRESS: { name: "IN_PROGRESS", value: "In Progress", color: "blue" },
  DONE: { name: "DONE", value: "Done", color: "green" },
} as const;

export const TASK_POINTS = {
  EASY: 5,
  MEDIUM: 8,
  HARD: 10,
  VERY_HARD: 15,
} as const;

export const TASK_LABELS = {
  HOME: "Home",
  SCHOOL: "School",
  SPORTS: "Sports",
  ART: "Art",
  MUSIC: "Music",
  READING: "Reading",
  FRIENDS: "Friends",
  FAMILY: "Family",
  SCIENCE: "Science",
  CODING: "Coding",
  NATURE: "Nature",
} as const;
