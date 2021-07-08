import PropTypes from 'prop-types';
import React from 'react';
import { Announcement } from '../Announcement';
import './AnnouncementsList.scss';

export const AnnouncementsList = ({ announcements, handleEdit, handleRemove }) => (
  <div className="Announcements">
    {announcements.map(({
      id, date, announcementTitle, announcementDescription,
    }) => (
      <Announcement
        handleRemove={handleRemove}
        handleEdit={handleEdit}
        key={id}
        id={id}
        date={date}
        announcementTitle={announcementTitle}
        announcementDescription={announcementDescription}
      />
    ))}
  </div>
);

AnnouncementsList.propTypes = {
  announcements: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    announcementTitle: PropTypes.string.isRequired,
    announcementDescription: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })).isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};
