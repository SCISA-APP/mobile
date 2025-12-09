export type AcademicButton = {
  title: string;
  image: any; // require(...) type
  route: string;
};

export const academicsButtonsData: AcademicButton[] = [
  {
    title: 'Timetable',
    image: require('../../../assets/images/timetable.jpg'),
    route: '/(standalone)/academics/timetable',
  },
  {
    title: 'Academic Resources',
    image: require('../../../assets/images/academic_resources.png'),
    route: '/(standalone)/academics/academicResources',
  },
  {
    title: 'Academic Calendar',
    image: require('../../../assets/images/academic_calendar.png'),
    route: '/(standalone)/academics/academicCalendar',
  },
];

