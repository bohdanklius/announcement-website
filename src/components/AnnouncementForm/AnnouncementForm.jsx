import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
} from 'semantic-ui-react';
import { editAnnouncementAPI, setAnnouncementsAPI } from '../../api';
import { ANNOUNCEMENT, DASHBOARD } from '../../variables';
import './AnnouncementForm.scss';

export const AnnouncementForm = ({ setAnnouncements, editedAnnouncement, setNavigationActive }) => {
  const [newAnnouncement, setNewAnnouncement] = useState(ANNOUNCEMENT);

  useEffect(() => {
    if (editedAnnouncement.length) {
      setNewAnnouncement({ ...newAnnouncement, ...editedAnnouncement });
    }
    
    if (!editedAnnouncement.length) {
      setNewAnnouncement({ ...newAnnouncement, id: Date.now() });
    }

  }, []);

  const [hasError, setHasError] = useState({
    announcementTitle: false,
    announcementDescription: false,
    date: false,
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setNewAnnouncement({ ...newAnnouncement, [name]: value });
    setHasError({ ...hasError, [name]: false });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newAnnouncement.announcementTitle === '') {
      setHasError((prevState) => ({ ...prevState, announcementTitle: true }));
    }

    if (newAnnouncement.announcementDescription === '') {
      setHasError((prevState) => ({ ...prevState, announcementDescription: true }));
    }

    if (newAnnouncement.date === '') {
      setHasError((prevState) => ({ ...prevState, date: true }));
    }

    if (
      newAnnouncement.id
      && newAnnouncement.announcementTitle.length
      && newAnnouncement.announcementDescription.length
      && newAnnouncement.date.length
    ) {
      setAnnouncements((prevState) => {
        if (prevState.some((announcement) => announcement.id === newAnnouncement.id)) {
          editAnnouncementAPI(newAnnouncement.id, newAnnouncement);
          return prevState.map((announcement) => (announcement.id === newAnnouncement.id ? newAnnouncement : announcement));
        }
        return [...prevState, newAnnouncement];
      });

      setAnnouncementsAPI(newAnnouncement);

      setNewAnnouncement(ANNOUNCEMENT);

      setNavigationActive(DASHBOARD);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group widths="equal">
        <div className="wrapper">
          <Form.Field
            className={hasError.announcementTitle ? 'error' : ''}
            value={newAnnouncement.announcementTitle}
            onChange={handleChange}
            name="announcementTitle"
            control={Input}
            label="Announcement"
            placeholder="Announcement"
          />
          {hasError.announcementTitle && (
            <p className="error__title">
              Pleace enter the Announcement
            </p>
          )}
        </div>
        <div className="wrapper">
          <Form.Field
            className={hasError.announcementDescription ? 'error' : ''}
            value={newAnnouncement.announcementDescription}
            onChange={handleChange}
            name="announcementDescription"
            control={Input}
            label="Announcement Description"
            placeholder="Announcement Description"
          />
          {hasError.announcementDescription && (
            <p className="error__title">
              Pleace enter the Description
            </p>
          )}
        </div>
        <div className="wrapper">
          <Form.Field
            className={hasError.date ? 'error' : ''}
            value={newAnnouncement.date}
            onChange={handleChange}
            name="date"
            control={Input}
            label="Date"
            type="date"
          />
          {hasError.date && (
            <p className="error__title">
              Pleace enter the date
            </p>
          )}
        </div>
      </Form.Group>

      <Form.Field control={Button}>Add a Announcement</Form.Field>
    </Form>
  );
};

AnnouncementForm.propTypes = {
  setAnnouncements: PropTypes.func.isRequired,
  editedAnnouncement: PropTypes.shape({
    id: PropTypes.number,
    announcementTitle: PropTypes.string,
    announcementDescription: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
  setNavigationActive: PropTypes.func.isRequired,
};
