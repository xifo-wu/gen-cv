import {
  TbTimeline,
  TbEgg,
  TbClock,
  TbSchool,
  TbTie,
  TbPhone,
  TbMail,
  TbWorld,
} from 'react-icons/tb';
import type { IconType } from 'react-icons';

const iconList: Record<string, IconType> = {
  email: TbMail,
  mobile: TbPhone,
  website: TbWorld,
  job: TbTie,
  age: TbClock,
  birthday: TbEgg,
  educational_qualifications: TbSchool,
  job_year: TbTimeline,
};

export default iconList;
