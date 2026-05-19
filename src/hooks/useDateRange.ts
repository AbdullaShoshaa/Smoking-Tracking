import { useMemo } from 'react';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

export function useDateRange() {
  return useMemo(() => {
    const now = new Date();
    return {
      today:      format(now, 'yyyy-MM-dd'),
      yearMonth:  format(now, 'yyyy-MM'),
      weekStart:  format(startOfWeek(now, { weekStartsOn: 1 }), 'yyyy-MM-dd'),
      weekEnd:    format(endOfWeek(now,   { weekStartsOn: 1 }), 'yyyy-MM-dd'),
      monthStart: format(startOfMonth(now), 'yyyy-MM-dd'),
      monthEnd:   format(endOfMonth(now),   'yyyy-MM-dd'),
    };
  }, []);
}
