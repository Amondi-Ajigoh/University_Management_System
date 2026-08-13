import {
  AddOutlined,
  DownloadOutlined,
  SearchOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import type { ReactNode } from 'react';

export interface ModulePageProps {
  title: string;
  description: string;

  addLabel?: string;
  searchPlaceholder?: string;

  onAdd?: () => void;
  onExport?: () => void;

  children?: ReactNode;

  [key: string]: unknown;
}

export default function ModulePage({
  title,
  description,
  addLabel = 'Add New',
  searchPlaceholder = 'Search...',
  onAdd,
  onExport,
  children,
}: ModulePageProps) {
  return (
    <Box>
      {/* Page header */}
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
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              mb: 0.75,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
          >
            {description}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          {onExport && (
            <Button
              variant="outlined"
              startIcon={<DownloadOutlined />}
              onClick={onExport}
            >
              Export
            </Button>
          )}

          {onAdd && (
            <Button
              variant="contained"
              startIcon={<AddOutlined />}
              onClick={onAdd}
            >
              {addLabel}
            </Button>
          )}
        </Box>
      </Box>

      {/* Search / filters */}
      <Card
        elevation={0}
        sx={{
          mb: 3,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
        }}
      >
        <CardContent
          sx={{
            p: 2,
            '&:last-child': {
              pb: 2,
            },
          }}
        >
          <TextField
            placeholder={searchPlaceholder}
            size="small"
            sx={{
              width: {
                xs: '100%',
                sm: 360,
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Module content */}
      {children ? (
        children
      ) : (
        <Card
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography
              variant="body1"
              color="text.secondary"
            >
              No records available.
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}