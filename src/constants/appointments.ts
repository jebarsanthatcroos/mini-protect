import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiXCircle,
} from 'react-icons/fi';
import { StatusConfig } from '@/types/appointment';

export const STATUS_COLORS: Record<string, StatusConfig> = {
  SCHEDULED: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    icon: FiClock,
  },
  CONFIRMED: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    icon: FiCheckCircle,
  },
  COMPLETED: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
    icon: FiCheckCircle,
  },
  CANCELLED: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    icon: FiXCircle,
  },
  NO_SHOW: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    icon: FiAlertCircle,
  },
  scheduled: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    icon: FiClock,
  },
  confirmed: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    icon: FiCheckCircle,
  },
  completed: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
    icon: FiCheckCircle,
  },
  cancelled: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    icon: FiXCircle,
  },
  'no-show': {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    icon: FiAlertCircle,
  },
};
