// Dashboard types
export interface Stat {
  id: number;
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface Project {
  id: number;
  name: string;
  updatedAt: string;
  status: string;
  colorClass: string;
}

export type ActivityType = 'user-action' | 'status-change' | 'comment';

export interface Activity {
  id: number;
  type: ActivityType;
  user?: string;
  action?: string;
  target?: string;
  note?: string;
  time: string;
}

// Team types
export interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  initials: string;
}
