const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const endpoints = {
  BASE_URL: BASE_URL,
  USER_URL: `${BASE_URL}/user`,
  OAUTH_URL: `${BASE_URL}/user/oauth2`,
  EVENT_URL: `${BASE_URL}/event`,
  TASK_URL: `${BASE_URL}/task`,
  CALENDAR_URL: `${BASE_URL}/calendar`,
};

export default endpoints;
