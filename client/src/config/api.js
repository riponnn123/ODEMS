export const BASE_URL = 'http://localhost:7777/api';

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
  },

  // Student endpoints
  STUDENT: {
    BASE: `${BASE_URL}/students`,
    DASHBOARD: `${BASE_URL}/students/dashboard`,
    LOGIN: `${BASE_URL}/students/student-login`,
    REGISTER: `${BASE_URL}/students/create-student`,
    GET_INFO: `${BASE_URL}/students/info`,
  },

  // Faculty endpoints
  FACULTY: {
    BASE: `${BASE_URL}/faculties`,
    DASHBOARD: `${BASE_URL}/faculties/dashboard`,
    LOGIN: `${BASE_URL}/faculties/faculty-login`,
    REGISTER: `${BASE_URL}/faculties/create-faculty`,
    GET_INFO: `${BASE_URL}/faculties/info`,
    GET_REQUESTS: `${BASE_URL}/faculties/see-all-req`,
  },

  // Admin endpoints
  ADMIN: {
    BASE: `${BASE_URL}/admin`,
    DASHBOARD: `${BASE_URL}/admin/dashboard`,
    LOGIN: `${BASE_URL}/admin/admin-login`,
    GET_INFO: `${BASE_URL}/admin/info`,
    APPROVE_REQUEST: (eventId) => `${BASE_URL}/admin/approveRequest/${eventId}`,
    REJECT_REQUEST: (eventId) => `${BASE_URL}/admin/rejectRequest/${eventId}`,
  },

  // Event endpoints
  EVENTS: {
    GET_ALL: `${BASE_URL}/events`,
    CREATE: `${BASE_URL}/events/create`,
    GET_PENDING: `${BASE_URL}/events/pending`,
    GET_STATS: `${BASE_URL}/events/stats`,
  },

  // Meeting endpoints
  MEETINGS: {
    CREATE: `${BASE_URL}/meetings/create-meeting`,
  },

  // Conference endpoints
  CONFERENCES: {
    CREATE: `${BASE_URL}/conferences/create-conference`,
  },

  // Workshop endpoints
  WORKSHOPS: {
    CREATE: `${BASE_URL}/workshops/create-workshop`,
  },

  // Participant endpoints
  PARTICIPANTS: {
    GET_BY_EVENT: (eventId) => `${BASE_URL}/participants/event/${eventId}`,
    REGISTER: `${BASE_URL}/participants/register`,
    GET_STUDENT_EVENTS: (studentId) => `${BASE_URL}/participants/student/${studentId}`,
  },
}; 