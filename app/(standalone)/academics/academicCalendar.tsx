import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BRAND = '#002855';
const TODAY = new Date();

type CalendarItem = {
  sn: string;
  activity: string;
  from: Date;
  to: Date;
};

type Semester = {
  title: string;
  from: Date;
  to: Date;
  items: CalendarItem[];
};

function d(dateStr: string) {
  return new Date(dateStr);
}

const SEMESTERS: Semester[] = [
  {
    title: 'First Semester',
    from: d('2026-01-06'),
    to: d('2026-04-25'),
    items: [
      { sn: '1.1',  activity: 'Online Course Registration: Continuing Students', from: d('2025-12-23'), to: d('2026-02-06') },
      { sn: '1.2',  activity: 'Virtual Orientation (Freshmen)',                   from: d('2026-01-02'), to: d('2026-01-02') },
      { sn: '1.3',  activity: 'Arrival of Freshmen',                              from: d('2026-01-06'), to: d('2026-01-06') },
      { sn: '1.4',  activity: 'Residential Orientation: Freshmen',                from: d('2026-01-07'), to: d('2026-01-07') },
      { sn: '1.5',  activity: 'Academic Orientation: College, Faculty',           from: d('2026-01-07'), to: d('2026-01-09') },
      { sn: '1.6',  activity: 'Arrival of Continuing Students',                   from: d('2026-01-10'), to: d('2026-01-10') },
      { sn: '1.7',  activity: 'Biometric Registration: All Students',             from: d('2026-01-12'), to: d('2026-02-06') },
      { sn: '1.8',  activity: 'Online Course Registration: Freshmen',             from: d('2026-01-05'), to: d('2026-01-29') },
      { sn: '1.9',  activity: 'Teaching Period: 1st Semester',                    from: d('2026-01-12'), to: d('2026-04-03') },
      { sn: '1.10', activity: 'Matriculation',                                    from: d('2026-01-30'), to: d('2026-01-31') },
      { sn: '1.11', activity: 'SGS Board: Postgrad Final Results',                from: d('2026-02-05'), to: d('2026-02-05') },
      { sn: '1.12', activity: 'Academic Board: Supplementary / Postgrad Results', from: d('2026-02-16'), to: d('2026-02-16') },
      { sn: '1.13', activity: 'Mid-Semester Examinations',                        from: d('2026-02-23'), to: d('2026-02-27') },
      { sn: '1.14', activity: 'Special Congregation',                             from: d('2026-03-25'), to: d('2026-03-28') },
      { sn: '1.15', activity: 'Assessment of Lecturers by Students',              from: d('2026-03-30'), to: d('2026-04-03') },
      { sn: '1.16', activity: 'First Semester Examinations',                      from: d('2026-04-07'), to: d('2026-04-24') },
      { sn: '1.17', activity: 'Students Depart',                                  from: d('2026-04-25'), to: d('2026-04-25') },
    ],
  },
  {
    title: 'Second Semester',
    from: d('2026-05-23'),
    to: d('2026-09-05'),
    items: [
      { sn: '2.1',  activity: 'Online Course Registration',              from: d('2026-05-18'), to: d('2026-06-19') },
      { sn: '2.2',  activity: 'Arrival of All Students',                 from: d('2026-05-23'), to: d('2026-05-23') },
      { sn: '2.3',  activity: 'Teaching Period: 2nd Semester',           from: d('2026-05-25'), to: d('2026-08-14') },
      { sn: '2.4',  activity: 'Biometric Registration',                  from: d('2026-05-25'), to: d('2026-06-19') },
      { sn: '2.5',  activity: 'Lectures Start',                          from: d('2026-05-25'), to: d('2026-05-25') },
      { sn: '2.6',  activity: 'Departmental Board: 1st Semester Results',from: d('2026-05-27'), to: d('2026-05-29') },
      { sn: '2.7',  activity: 'Faculty Board: 1st Semester Results',     from: d('2026-06-01'), to: d('2026-06-05') },
      { sn: '2.8',  activity: 'Auditing of 1st Semester Exam Results',   from: d('2026-06-08'), to: d('2026-06-23') },
      { sn: '2.9',  activity: 'College Boards: 1st Semester Results',    from: d('2026-06-15'), to: d('2026-06-26') },
      { sn: '2.10', activity: 'SGS Board: 1st Semester Postgrad Results',from: d('2026-07-02'), to: d('2026-07-02') },
      { sn: '2.11', activity: 'Mid-Semester Examinations',               from: d('2026-07-06'), to: d('2026-07-10') },
      { sn: '2.12', activity: 'Academic Board: 1st Semester Results',    from: d('2026-07-14'), to: d('2026-07-15') },
      { sn: '2.13', activity: 'Assessment of Lecturers by Students',     from: d('2026-08-10'), to: d('2026-08-14') },
      { sn: '2.14', activity: 'Second Semester Examinations',            from: d('2026-08-17'), to: d('2026-09-04') },
      { sn: '2.15', activity: 'Students Depart',                         from: d('2026-09-05'), to: d('2026-09-05') },
    ],
  },
];

function getStatus(from: Date, to: Date): 'active' | 'upcoming' | 'past' {
  const todayMs = TODAY.setHours(0, 0, 0, 0);
  const toMs = new Date(to).setHours(23, 59, 59, 999);
  const fromMs = from.getTime();
  if (todayMs > toMs) return 'past';
  if (todayMs >= fromMs) return 'active';
  return 'upcoming';
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function SemesterBadge({ from, to }: { from: Date; to: Date }) {
  const status = getStatus(from, to);
  if (status === 'active') {
    return (
      <View style={[badge.wrap, { backgroundColor: '#E6F4EA' }]}>
        <View style={[badge.dot, { backgroundColor: '#1E8C45' }]} />
        <Text style={[badge.text, { color: '#1E8C45' }]}>In progress</Text>
      </View>
    );
  }
  if (status === 'upcoming') {
    return (
      <View style={[badge.wrap, { backgroundColor: '#E6F1FB' }]}>
        <Text style={[badge.text, { color: '#185FA5' }]}>Upcoming</Text>
      </View>
    );
  }
  return (
    <View style={[badge.wrap, { backgroundColor: colors.gray[100] }]}>
      <Text style={[badge.text, { color: colors.gray[500] }]}>Completed</Text>
    </View>
  );
}

const badge = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  text: { fontSize: 11, fontWeight: '700' },
});

export default function AcademicCalendarScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={BRAND} />

      <View style={[styles.hero, { paddingTop: insets.top + 10 }]}>
        <View style={styles.heroDecor} />
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={12}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.heroTitle}>Academic Calendar</Text>
        <Text style={styles.heroSub}>2025 / 2026 Academic Year</Text>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.noSupp}>
          <Ionicons name="information-circle-outline" size={15} color="#185FA5" />
          <Text style={styles.noSuppText}>No supplementary examinations for 2025/2026</Text>
        </View>

        {SEMESTERS.map((sem) => (
          <View key={sem.title} style={styles.semesterBlock}>
            {/* Semester header */}
            <View style={styles.semHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.semTitle}>{sem.title}</Text>
                <Text style={styles.semDates}>
                  {formatDate(sem.from)} – {formatDate(sem.to)}
                </Text>
              </View>
              <SemesterBadge from={sem.from} to={sem.to} />
            </View>

            {/* Items */}
            <View style={styles.itemsCard}>
              {sem.items.map((item, index) => {
                const status = getStatus(item.from, item.to);
                const isActive = status === 'active';
                const isPast = status === 'past';

                return (
                  <View key={item.sn}>
                    <View style={[styles.row, isActive && styles.rowActive]}>
                      {/* Left: SN + active indicator */}
                      <View style={styles.snCol}>
                        {isActive ? (
                          <View style={styles.activeDot} />
                        ) : (
                          <Text style={[styles.sn, isPast && styles.snPast]}>{item.sn}</Text>
                        )}
                      </View>

                      {/* Content */}
                      <View style={styles.rowContent}>
                        <Text style={[
                          styles.activityText,
                          isActive && styles.activityActive,
                          isPast && styles.activityPast,
                        ]}>
                          {item.activity}
                        </Text>
                        <View style={styles.dateRow}>
                          <Ionicons
                            name="calendar-outline"
                            size={11}
                            color={isActive ? '#1E8C45' : colors.gray[400]}
                          />
                          <Text style={[styles.dateText, isActive && styles.dateActive]}>
                            {item.from.getTime() === item.to.getTime()
                              ? formatDate(item.from)
                              : `${formatDate(item.from)} – ${formatDate(item.to)}`}
                          </Text>
                        </View>
                      </View>

                      {/* Active badge */}
                      {isActive && (
                        <View style={styles.nowBadge}>
                          <Text style={styles.nowBadgeText}>Now</Text>
                        </View>
                      )}
                    </View>
                    {index < sem.items.length - 1 && (
                      <View style={[styles.divider, isActive && styles.dividerActive]} />
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.gray[100] },

  hero: {
    backgroundColor: BRAND,
    paddingHorizontal: 20,
    paddingBottom: 24,
    overflow: 'hidden',
  },
  heroDecor: {
    position: 'absolute', width: 200, height: 200, borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.06)', top: -50, right: -30,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 14,
  },
  heroTitle: { fontSize: 26, fontWeight: '800', color: '#fff', letterSpacing: -0.4 },
  heroSub: { fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 3 },

  scroll: { paddingHorizontal: 16, paddingTop: 16 },

  noSupp: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#E6F1FB', borderRadius: 10,
    padding: 12, marginBottom: 20,
    borderWidth: 0.5, borderColor: '#B5D4F4',
  },
  noSuppText: { fontSize: 12, color: '#185FA5', flex: 1, fontWeight: '500' },

  semesterBlock: { marginBottom: 24 },

  semHeader: {
    flexDirection: 'row', alignItems: 'center',
    marginBottom: 10, gap: 10,
  },
  semTitle: { fontSize: 16, fontWeight: '800', color: colors.text.primary },
  semDates: { fontSize: 12, color: colors.gray[500], marginTop: 1 },

  itemsCard: {
    backgroundColor: colors.white, borderRadius: 16, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
  },

  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 13, gap: 12,
  },
  rowActive: { backgroundColor: '#F0FBF4' },

  snCol: { width: 28, alignItems: 'center' },
  sn: { fontSize: 10, fontWeight: '600', color: colors.gray[400] },
  snPast: { color: colors.gray[300] },
  activeDot: {
    width: 8, height: 8, borderRadius: 4, backgroundColor: '#1E8C45',
  },

  rowContent: { flex: 1 },
  activityText: { fontSize: 13, fontWeight: '600', color: colors.text.primary, lineHeight: 18 },
  activityActive: { color: '#1E8C45' },
  activityPast: { color: colors.gray[400] },

  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  dateText: { fontSize: 11, color: colors.gray[400] },
  dateActive: { color: '#1E8C45' },

  nowBadge: {
    backgroundColor: '#1E8C45', borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  nowBadgeText: { fontSize: 10, fontWeight: '800', color: '#fff' },

  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.gray[100], marginLeft: 54 },
  dividerActive: { backgroundColor: '#D4EDD9' },
});