import { EventItem } from "@/types/models/event";

export const occasions: EventItem[] = [
  {
    id: 1,
    title: 'New Academic Year Orientation',
    description:
      'Kick off the new academic year with a full orientation day for all incoming and returning students. The session includes a welcome address from the Dean of Student Affairs, department briefings, timetable distribution, and a campus tour for first-years. Students are encouraged to come with their student IDs and registration documents. Refreshments will be provided after the formal programme.',
    date: '2026-07-20',  // ~6 weeks from now (future)
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'Inter-House Sports Day',
    description:
      'The annual SCISA Inter-House Sports Day returns with track and field events, team relays, and friendly competition between all four houses. Points earned count toward the annual House Championship Shield. All students are expected to participate in at least one event. Spectators are welcome and house colours are encouraged. The day ends with an awards ceremony and a braai.',
    date: '2026-08-15',  // ~2 months from now (future)
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    title: 'Annual Science & Technology Fair',
    description:
      'Students from all departments are invited to present original research, experiments, and prototype projects at the SCISA Science & Technology Fair. Judged by a panel of academic staff and industry guests, top entries will be eligible for the SCISA Innovation Award and a recommendation letter for external competitions. Registration for exhibitors closes two weeks before the event.',
    date: '2026-06-25',  // ~2 weeks from now (future)
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzBrrFV427Uvvpbr9s5MgEadvUK_x8ubegJg&s',
  },
  {
    id: 4,
    title: 'End-of-Year Graduation Ceremony',
    description:
      'Join us in celebrating the graduating class at the SCISA Annual Graduation Ceremony. The event will be held in the main auditorium and is open to all graduating students, their families, and the broader SCISA community. Gowns and mortarboards will be available for collection from the admin block one week prior. Seating is limited — family tickets must be reserved in advance through the student portal.',
    date: '2026-11-28',  // ~5 months from now (future)
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJW1oKLXU99SK8FirR9lFdlBqLATfxmwnqSg&s',
  },
  // ── Past events (dates before today) ──────────────────────────────────────
  {
    id: 5,
    title: 'Student Representative Council Elections',
    description:
      'Students exercised their democratic right to elect the 2026/2027 SRC. Campaigning ran for two weeks prior, with candidates presenting manifestos at a public debate held in the main hall. Voting took place electronically via the student portal over a 48-hour window. Results were announced by the Electoral Officer and ratified by Student Affairs.',
    date: '2026-03-10',  // ~3 months ago (past)
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 6,
    title: 'Heritage Day Cultural Showcase',
    description:
      'In celebration of Heritage Day, SCISA hosted a vibrant showcase of South African culture. Students performed traditional dances, prepared cultural dishes, and displayed traditional attire from their home communities. The event was attended by staff, students, and invited guests from the local community, and served as a reminder of the rich diversity that defines SCISA.',
    date: '2026-05-02',  // ~5 weeks ago (past)
    image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=1200&q=80',
  },
];