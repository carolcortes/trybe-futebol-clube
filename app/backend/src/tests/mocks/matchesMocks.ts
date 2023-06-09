const matches = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      id: 16,
      teamName: "São Paulo",
    },
    teamAway: {
      id: 8,
      teamName: "Grêmio",
    },
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      id: 9,
      teamName: "Internacional",
    },
    teamAway: {
      id: 14,
      teamName: "Santos",
    },
  },
  {
    id: 41,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      id: 16,
      teamName: "São Paulo",
    },
    teamAway: {
      id: 9,
      teamName: "Internacional",
    },
  },
];

export const matchesInProgress = [
  {
    id: 41,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      id: 16,
      teamName: "São Paulo",
    },
    teamAway: {
      id: 9,
      teamName: "Internacional",
    },
  },
];

export const matchesNotInProgress = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      id: 16,
      teamName: "São Paulo",
    },
    teamAway: {
      id: 8,
      teamName: "Grêmio",
    },
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      id: 9,
      teamName: "Internacional",
    },
    teamAway: {
      id: 14,
      teamName: "Santos",
    },
  },
];

export const newMatch = {
    id: 49,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 8,
    awayTeamGoals: 2,
    inProgress: true
};

export const newMatchBody = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

export const incorrectIdMatch = {
  homeTeam: 166,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

export default matches;