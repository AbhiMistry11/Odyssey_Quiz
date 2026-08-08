export const EVENT_NAME = 'TCS Knowledge Odyssey';
export const EVENT_SHORT_NAME = 'Knowledge Odyssey';
export const EVENT_BRAND = 'TCS';
export const EVENT_TAGLINE =
  'A guided knowledge odyssey — solve, get verified, and race the clock.';

export const MAX_QUIZ_SECONDS = 10 * 60; // 10-minute hard cap, auto-submits on timeout

export const RULES = [
  {
    title: 'One attempt per team',
    body: 'Each registered team gets a single run at the full sequence. Make it count.',
  },
  {
    title: "Don't refresh the page",
    body: 'There is no server behind this site — your progress lives only in this browser tab.',
  },
  {
    title: 'Refreshing resets the attempt',
    body: 'Closing the tab or reloading wipes your timer, your progress, and your team back to zero.',
  },
  {
    title: 'Human judges verify answers',
    body: 'A volunteer checks your answer in person and hands you the code to unlock the next step.',
  },
  {
    title: 'Hints cost time',
    body: 'Every hint you reveal adds a fixed penalty straight onto your final clock.',
  },
  {
    title: '10-minute clock',
    body: 'The whole run is capped at 10 minutes — hit the limit and your attempt auto-submits.',
  },
];

export const TEAM_SIZE = 3;
