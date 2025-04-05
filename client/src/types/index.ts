// Dashboard types
export interface Stat {
  id: number;
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

// Leaderboard types
export interface LeaderboardUser {
  id: number;
  username: string;
  level: number;
  xp: number;
  xpNeeded: number;
  avatar?: string;
  rank: number;
  colorClass: string;
}

// Booster types
export interface Booster {
  id: number;
  username: string;
  boostTier: number;
  boostDuration: string;
  avatar?: string;
  initials: string;
  perks: string[];
  colorClass: string;
}

// AFK types
export interface AfkUser {
  id: number;
  username: string;
  afkDuration: string;
  reason?: string;
  avatar?: string;
  initials: string;
  colorClass: string;
}

// Command types
export interface BotCommand {
  id: number;
  name: string;
  description: string;
  usage: string;
  category: 'moderation' | 'customization' | 'fun' | 'utility';
  examples?: string[];
}

export type ActivityType = 'command-used' | 'level-up' | 'server-joined' | 'bot-update';

export interface Activity {
  id: number;
  type: ActivityType;
  user?: string;
  action?: string;
  target?: string;
  note?: string;
  time: string;
}

// Server types
export interface ServerStat {
  id: number;
  name: string;
  memberCount: number;
  botPrefix: string;
  features: string[];
  icon?: string;
}

// Team types (for bot developers)
export interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  initials: string;
}
