import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#173B67',
      light: '#315B8D',
      dark: '#0F2948',
      contrastText: '#FFFFFF',
    },

    secondary: {
      main: '#C89B3C',
      light: '#E1BD6A',
      dark: '#9A7425',
      contrastText: '#FFFFFF',
    },

    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },

    text: {
      primary: '#172033',
      secondary: '#657084',
    },

    success: {
      main: '#238636',
    },

    warning: {
      main: '#C98616',
    },

    error: {
      main: '#C62828',
    },

    info: {
      main: '#1976D2',
    },

    divider: '#E2E7EF',
  },

  typography: {
    fontFamily: '"Inter", "Segoe UI", Arial, sans-serif',

    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },

    h2: {
      fontSize: '1.875rem',
      fontWeight: 700,
      lineHeight: 1.25,
    },

    h3: {
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },

    h4: {
      fontSize: '1.25rem',
      fontWeight: 700,
    },

    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
    },

    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },

    body1: {
      fontSize: '0.95rem',
      lineHeight: 1.6,
    },

    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },

    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          borderRadius: 8,
          minHeight: 42,
          paddingInline: 18,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #E2E7EF',
          boxShadow: '0 4px 20px rgba(23, 32, 51, 0.05)',
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'medium',
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#F5F7FA',
          color: '#657084',
          fontWeight: 700,
        },
      },
    },
  },
});