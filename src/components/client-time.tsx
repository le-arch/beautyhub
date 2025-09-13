
'use client';

import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';

interface ClientTimeProps {
  date: string;
  format: string;
  className?: string;
}

export function ClientTime({ date, format: formatString, className }: ClientTimeProps) {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    // This effect runs only on the client, after hydration
    setFormattedDate(format(parseISO(date), formatString));
  }, [date, formatString]);

  if (!formattedDate) {
    // Render a placeholder or nothing on the server and during initial client render
    return <span className={className}>...</span>;
  }

  return <span className={className}>{formattedDate}</span>;
}
