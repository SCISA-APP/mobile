export type AcademicEvent = {
  sn: string;
  activity: string;
  from: Date;
  to: Date;
};

export const academicCalendar: AcademicEvent[] = [
  // FIRST SEMESTER
  { sn: "1", activity: "FIRST SEMESTER", from: new Date("2026-01-06"), to: new Date("2026-04-25") },
  { sn: "1.1", activity: "Online Course Registration: Continuing Students", from: new Date("2025-12-23"), to: new Date("2026-02-06") },
  { sn: "1.2", activity: "Virtual Orientation (Freshmen)", from: new Date("2026-01-03"), to: new Date("2026-01-03") },
  { sn: "1.3", activity: "Arrival of Freshmen", from: new Date("2026-01-06"), to: new Date("2026-01-06") },
  { sn: "1.4", activity: "Residential Orientation: Freshmen", from: new Date("2026-01-07"), to: new Date("2026-01-07") },
  { sn: "1.5", activity: "Academic Orientation: College, Faculty", from: new Date("2026-01-07"), to: new Date("2026-01-09") },
  { sn: "1.6", activity: "Arrival of Continuing Students", from: new Date("2026-01-10"), to: new Date("2026-01-10") },
  { sn: "1.7", activity: "Biometric Registration: All Students", from: new Date("2026-01-12"), to: new Date("2026-02-06") },
  { sn: "1.8", activity: "Online Course Registration: Freshmen", from: new Date("2026-01-05"), to: new Date("2026-01-29") },
  { sn: "1.9", activity: "Teaching Period: 1st Semester", from: new Date("2026-01-12"), to: new Date("2026-04-03") },
  { sn: "1.10", activity: "Matriculation", from: new Date("2026-01-30"), to: new Date("2026-01-31") },
  { sn: "1.11", activity: "SGS Board: Postgrad Final Results", from: new Date("2026-02-05"), to: new Date("2026-02-05") },
  { sn: "1.12", activity: "Academic Board: Supplementary Exam Results/ Postgrad Results", from: new Date("2026-02-16"), to: new Date("2026-02-16") },
  { sn: "1.13", activity: "Mid-Semester Examinations", from: new Date("2026-02-23"), to: new Date("2026-02-27") },
  { sn: "1.14", activity: "Special Congregation", from: new Date("2026-03-25"), to: new Date("2026-03-28") },
  { sn: "1.15", activity: "Assessment of Lecturers by Students", from: new Date("2026-03-30"), to: new Date("2026-04-03") },
  { sn: "1.16", activity: "First Semester Examinations", from: new Date("2026-04-07"), to: new Date("2026-04-24") },
  { sn: "1.17", activity: "Students Depart", from: new Date("2026-04-25"), to: new Date("2026-04-25") },

  // SECOND SEMESTER
  { sn: "2", activity: "SECOND SEMESTER", from: new Date("2026-05-23"), to: new Date("2026-09-05") },
  { sn: "2.1", activity: "Online Course Registration", from: new Date("2026-05-18"), to: new Date("2026-06-19") },
  { sn: "2.2", activity: "Arrival of All Students", from: new Date("2026-05-23"), to: new Date("2026-05-23") },
  { sn: "2.3", activity: "Teaching Period: 2nd Semester", from: new Date("2026-05-25"), to: new Date("2026-08-14") },
  { sn: "2.4", activity: "Biometric Registration", from: new Date("2026-05-25"), to: new Date("2026-06-19") },
  { sn: "2.5", activity: "Lectures Start", from: new Date("2026-05-25"), to: new Date("2026-05-25") },
  { sn: "2.6", activity: "Departmental Board: 1st Semester Results", from: new Date("2026-05-27"), to: new Date("2026-05-29") },
  { sn: "2.7", activity: "Faculty Board: 1st Semester Results", from: new Date("2026-06-01"), to: new Date("2026-06-05") },
  { sn: "2.8", activity: "Auditing of 1st Semester Exam Results", from: new Date("2026-06-08"), to: new Date("2026-06-23") },
  { sn: "2.9", activity: "College Boards: 1st Semester Results", from: new Date("2026-06-15"), to: new Date("2026-06-26") },
  { sn: "2.10", activity: "Mid-Semester Examinations", from: new Date("2026-07-06"), to: new Date("2026-07-10") },
  { sn: "2.11", activity: "Academic Board: 1st Semester Results", from: new Date("2026-07-14"), to: new Date("2026-07-15") },
  { sn: "2.12", activity: "Assessment of Lecturers by Students", from: new Date("2026-08-10"), to: new Date("2026-08-14") },
  { sn: "2.13", activity: "Second Semester Examinations", from: new Date("2026-08-17"), to: new Date("2026-09-04") },
  { sn: "2.14", activity: "Students Depart", from: new Date("2026-09-05"), to: new Date("2026-09-05") },
  { sn: "2.15", activity: "Auditing of Final Year Results", from: new Date("2026-10-05"), to: new Date("2026-10-14") },
  { sn: "2.16", activity: "College Boards: Final Year Results", from: new Date("2026-10-12"), to: new Date("2026-10-16") },
  { sn: "2.17", activity: "Auditing of Continuing Students' Results", from: new Date("2026-10-12"), to: new Date("2026-10-23") },
  { sn: "2.18", activity: "SGS Board: Final Results", from: new Date("2026-10-19"), to: new Date("2026-10-19") },
  { sn: "2.19", activity: "Academic Board: Final Year Results", from: new Date("2026-10-28"), to: new Date("2026-10-28") },
  { sn: "2.20", activity: "College Boards: Continuing Students Results", from: new Date("2026-10-19"), to: new Date("2026-10-29") },
  { sn: "2.21", activity: "Academic Staff Break", from: new Date("2026-10-16"), to: new Date("2026-11-09") },
  { sn: "2.22", activity: "Congregation", from: new Date("2026-11-23"), to: new Date("2026-11-28") },
  { sn: "2.23", activity: "Supplementary Examination", from: new Date("2026-11-16"), to: new Date("2026-11-27") },
  { sn: "2.24", activity: "Auditing of Supplementary Results", from: new Date("2026-12-14"), to: new Date("2026-12-30") },
];
