/* eslint-disable import/prefer-default-export */
const API = 'http://localhost:3005/announcements';

async function setAnnouncementsAPI(data = {}) {
  const response = await fetch(API, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  return response.json();
}

const removeAnnouncementAPI = (id) => {
  fetch(`${API}/${id}`, {
    method: 'DELETE',
  })
    .then((response) => response.text());
};

const editAnnouncementAPI = (id, data) => {
  fetch(`${API}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json());
};

const getAnnouncementAPI = () => fetch(API)
  .then((response) => response.json())
  .then((json) => json);

export {
  getAnnouncementAPI,
  setAnnouncementsAPI,
  removeAnnouncementAPI,
  editAnnouncementAPI,
};
