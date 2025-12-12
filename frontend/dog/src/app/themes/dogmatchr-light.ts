import { definePreset } from '@primeuix/themes';
import Material from '@primeuix/themes/material';

export const DogMatchrLight = definePreset(Material, {
  semantic: {
    primary: {
      50: '#FFEFE4',
      100: '#FFD5B8',
      200: '#FFBB8C',
      300: '#FFA160',
      400: '#FF9734',
      500: '#FF8D08', // botón principal / acento naranja
      600: '#E07B07',
      700: '#C26906',
      800: '#A25705',
      900: '#804204',
      950: '#603104',
    },
    secondary: {
      50: '#F0FDF4', // fondo de success
      100: '#D0F6DC',
      200: '#A0EDB7',
      300: '#7DF1A9', // success principal
      400: '#5EE497',
      500: '#3ED883',
    },
    surface: {
      50: '#F9FAFB', // fondo general app y cards de datos
      100: '#FFFFFF', // color principal de cards
      200: '#F9FAFB', // cards internos/gris suave
    },
    info: {
      500: '#42A5F5', // iconos y badges
    },
    warning: {
      500: '#FFB300', // alertas suaves
    },
    danger: {
      500: '#E53935', // errores
    },
  },
  typography: {
    fontFamily: "'Elms Sans', sans-serif",
    color: '#4A5565', // color de fuente general
    headingsColor: '#0A0A0A', // color de títulos
  },
  radius: {
    small: '4px',
    medium: '8px',
    large: '12px',
  },
  shadow: {
    small: '0 1px 3px rgba(237, 238, 239, 0.5)',
    medium: '0 2px 6px rgba(237, 238, 239, 0.5)',
    large: '0 4px 12px rgba(237, 238, 239, 0.5)',
  },
  checkbox: {
    backgroundColor: '#3B3B3B',
  },
});
