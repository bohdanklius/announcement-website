import { v4 as uuidv4 } from 'uuid';

const DASHBOARD = 'DASHBOARD';
const ANNOUNCEMENTFORM = 'ANNOUNCEMENTFORM';

const ANNOUNCEMENT = {
  id: uuidv4(),
  announcementTitle: '',
  announcementDescription: '',
  date: '',
};

export { ANNOUNCEMENT, DASHBOARD, ANNOUNCEMENTFORM };
