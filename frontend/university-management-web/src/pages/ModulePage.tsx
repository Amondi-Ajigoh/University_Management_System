import { Card, CardContent, Stack, Typography } from '@mui/material';

interface ModulePageProps {
  title: string;
  description: string;
}

export function ModulePage({ title, description }: ModulePageProps) {
  return (
    <Stack spacing={3}>
      <Typography variant="h2">{title}</Typography>

      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5">{title} Module</Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}