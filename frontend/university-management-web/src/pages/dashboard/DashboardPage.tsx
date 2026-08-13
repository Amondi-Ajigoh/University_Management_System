import {
  AssessmentOutlined,
  BookOutlined,
  CalendarMonthOutlined,
  GroupsOutlined,
  PaymentsOutlined,
  SchoolOutlined,
  TrendingUpOutlined,
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Typography,
} from '@mui/material';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
}: StatCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              {title}
            </Typography>

            <Typography
              variant="h4"
              color="text.primary"
              sx={{
                mt: 1,
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              {value}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.75 }}
            >
              {subtitle}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: `${color}15`,
              color,
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  status: 'success' | 'info' | 'warning';
}

function ActivityItem({
  title,
  description,
  time,
  status,
}: ActivityItemProps) {
  const statusColor =
    status === 'success'
      ? 'success.main'
      : status === 'warning'
        ? 'warning.main'
        : 'info.main';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        py: 2,
        '&:not(:last-child)': {
          borderBottom: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          mt: 0.8,
          flexShrink: 0,
          backgroundColor: statusColor,
        }}
      />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body2"
          color="text.primary"
          sx={{ fontWeight: 600 }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.25 }}
        >
          {description}
        </Typography>
      </Box>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ whiteSpace: 'nowrap' }}
      >
        {time}
      </Typography>
    </Box>
  );
}

interface ModuleItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const modules: ModuleItem[] = [
  {
    title: 'Students',
    description: 'Student profiles and academic information',
    icon: <GroupsOutlined />,
  },
  {
    title: 'Courses',
    description: 'Courses, departments and registrations',
    icon: <BookOutlined />,
  },
  {
    title: 'Academic Records',
    description: 'Grades, transcripts and performance',
    icon: <AssessmentOutlined />,
  },
  {
    title: 'Finance',
    description: 'Fees, payments and financial records',
    icon: <PaymentsOutlined />,
  },
];

export default function DashboardPage() {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          alignItems: {
            xs: 'flex-start',
            sm: 'center',
          },
          justifyContent: 'space-between',
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="h3"
            color="text.primary"
            component="h1"
            sx={{
              fontWeight: 700,
              letterSpacing: '-0.03em',
              fontSize: {
                xs: '2rem',
                md: '2.5rem',
              },
            }}
          >
            Dashboard
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Welcome back. Here is an overview of the university.
          </Typography>
        </Box>

        <Chip
          icon={<TrendingUpOutlined />}
          label="System operational"
          color="success"
          variant="outlined"
          sx={{
            fontWeight: 600,
            borderRadius: 2,
          }}
        />
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Students"
            value="8,426"
            subtitle="+8.2% from last semester"
            icon={<GroupsOutlined />}
            color="#1976d2"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Lecturers"
            value="384"
            subtitle="Across all departments"
            icon={<SchoolOutlined />}
            color="#7b1fa2"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Active Courses"
            value="217"
            subtitle="Current academic year"
            icon={<BookOutlined />}
            color="#00897b"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Fee Collection"
            value="KES 18.4M"
            subtitle="82.6% of expected fees"
            icon={<PaymentsOutlined />}
            color="#ed6c02"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper
            elevation={0}
            sx={{
              height: '100%',
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 3,
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  color="text.primary"
                  sx={{ fontWeight: 700 }}
                >
                  Academic Overview
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Current academic year performance
                </Typography>
              </Box>

              <AssessmentOutlined color="primary" />
            </Box>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    backgroundColor: 'action.hover',
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Registered Students
                  </Typography>

                  <Typography
                    variant="h5"
                    color="text.primary"
                    sx={{
                      mt: 1,
                      fontWeight: 700,
                    }}
                  >
                    7,982
                  </Typography>

                  <Typography
                    variant="caption"
                    color="success.main"
                    sx={{
                      mt: 0.5,
                      display: 'block',
                      fontWeight: 600,
                    }}
                  >
                    94.7% of students
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    backgroundColor: 'action.hover',
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Courses Registered
                  </Typography>

                  <Typography
                    variant="h5"
                    color="text.primary"
                    sx={{
                      mt: 1,
                      fontWeight: 700,
                    }}
                  >
                    14,638
                  </Typography>

                  <Typography
                    variant="caption"
                    color="info.main"
                    sx={{
                      mt: 0.5,
                      display: 'block',
                      fontWeight: 600,
                    }}
                  >
                    Across 217 courses
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    backgroundColor: 'action.hover',
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Average GPA
                  </Typography>

                  <Typography
                    variant="h5"
                    color="text.primary"
                    sx={{
                      mt: 1,
                      fontWeight: 700,
                    }}
                  >
                    3.42
                  </Typography>

                  <Typography
                    variant="caption"
                    color="success.main"
                    sx={{
                      mt: 0.5,
                      display: 'block',
                      fontWeight: 600,
                    }}
                  >
                    +0.18 this semester
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Box
              sx={{
                mt: 3,
                p: 2.5,
                borderRadius: 2,
                border: '1px dashed',
                borderColor: 'divider',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <CalendarMonthOutlined color="primary" />

                <Box>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ fontWeight: 600 }}
                  >
                    Current semester
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Semester 2 · 2026 Academic Year
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper
            elevation={0}
            sx={{
              height: '100%',
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h6"
              color="text.primary"
              sx={{ fontWeight: 700 }}
            >
              Recent Activity
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5, mb: 1 }}
            >
              Latest system events
            </Typography>

            <Box>
              <ActivityItem
                title="Course registration opened"
                description="Semester 2 registration is now active."
                time="10m"
                status="success"
              />

              <ActivityItem
                title="Grades submitted"
                description="Computer Science department submitted results."
                time="32m"
                status="info"
              />

              <ActivityItem
                title="Fee payment received"
                description="Payment recorded for student STU-2026-1048."
                time="1h"
                status="success"
              />

              <ActivityItem
                title="Timetable updated"
                description="Room allocation changed for CSC 402."
                time="2h"
                status="warning"
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper
        elevation={0}
        sx={{
          mt: 3,
          p: 3,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h6"
          color="text.primary"
          sx={{ fontWeight: 700 }}
        >
          System Modules
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5, mb: 3 }}
        >
          University management areas available to authorized users.
        </Typography>

        <Grid container spacing={2}>
          {modules.map((module) => (
            <Grid
              key={module.title}
              size={{ xs: 12, sm: 6, lg: 3 }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition:
                    'border-color 0.2s ease, background-color 0.2s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      color: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {module.icon}
                  </Box>

                  <Box>
                    <Typography
                      variant="body2"
                      color="text.primary"
                      sx={{ fontWeight: 700 }}
                    >
                      {module.title}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: 'block',
                        mt: 0.5,
                      }}
                    >
                      {module.description}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}