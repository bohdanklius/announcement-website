import React, { useEffect, useState } from 'react';
import { getAnnouncementAPI } from './api';
import './App.css';
import { Header, AnnouncementsList, AnnouncementForm } from './components';
import { DASHBOARD, ANNOUNCEMENTFORM } from './variables';

function App() {
  const [announcements, setAnnouncements] = useState([]);
  const [navigationActive, setNavigationActive] = useState(DASHBOARD);
  const [editedAnnouncement, setEditedAnnouncement] = useState(/* {
    id: Date.now(),
    date: '',
    announcementTitle: '',
    announcementDescription: '',
  } */);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getAnnouncementAPI()
      .then((response) => setAnnouncements(response));
  }, []);

  const handleEdit = (announcementId) => {
    setNavigationActive(ANNOUNCEMENTFORM);
    setEditedAnnouncement(announcements.find(({ id }) => id === announcementId));
  };

  const handleRemove = (announcementId) => {
    setAnnouncements(announcements.filter((announcement) => announcement.id !== announcementId));
  };
  return (
    <div>
      <Header
        setNavigationActive={setNavigationActive}
        setEditedAnnouncement={setEditedAnnouncement}
        query={searchQuery}
        setQuery={setSearchQuery}
      />
      {navigationActive === DASHBOARD && (
        <AnnouncementsList
          handleRemove={handleRemove}
          handleEdit={handleEdit}
          announcements={!searchQuery.length 
            ? announcements 
            : announcements.filter(announcement => 
              announcement.announcementTitle.toLowerCase().includes(searchQuery.toLowerCase()
            ) ||
            announcement.announcementDescription.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3)}
        />
      )}

      {navigationActive === ANNOUNCEMENTFORM && (
        <AnnouncementForm
          setNavigationActive={setNavigationActive}
          setAnnouncements={setAnnouncements}
          editedAnnouncement={editedAnnouncement}
        />
      )}
    </div>
  );
}

export default App;
