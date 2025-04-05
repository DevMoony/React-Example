import { users, type User, type InsertUser } from "@shared/schema";

// Storage Interface
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getStats(): Promise<any[]>;
  getProjects(): Promise<any[]>;
  getLeaderboard(): Promise<any[]>;
  getBoosters(): Promise<any[]>;
  getAfkUsers(): Promise<any[]>;
  getBotCommands(): Promise<any[]>;
  getRecentProjects(): Promise<any[]>;
  getRecentActivities(): Promise<any[]>;
  getCommandsByCategory(category: string): Promise<any[]>;
  getTeamMembers(): Promise<any[]>;
  getServerStats(): Promise<any[]>;
  createProject(project: any): Promise<any>;
}

// In-memory Storage Implementation
export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private stats: any[] = [];
  private projects: any[] = []; // Keep for backwards compatibility
  private leaderboard: any[] = [];
  private boosters: any[] = [];
  private afkUsers: any[] = [];
  private botCommands: any[] = [];
  private activities: any[] = [];
  private serverStats: any[] = [];
  private teamMembers: any[] = [];
  private currentUserId: number = 1;
  private currentProjectId: number = 1;
  private currentActivityId: number = 1;
  private currentTeamMemberId: number = 1;

  constructor() {
    this.users = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentActivityId = 1; 
    this.currentTeamMemberId = 1;
    
    // Initialize projects array for backwards compatibility
    this.projects = [];

    // Initialize with Discord bot data for demo
    this.stats = [
      { id: 1, name: "Total Servers", value: 124, change: 8.5, trend: "up" },
      { id: 2, name: "Total Users", value: 12450, change: 12.3, trend: "up" },
      { id: 3, name: "Commands Used", value: 45862, change: 5.7, trend: "up" },
      { id: 4, name: "Bot Uptime", value: 99.8, change: 0.2, trend: "up" },
    ];

    this.leaderboard = [
      { id: 1, username: "DragonSlayer", level: 50, xp: 12500, xpNeeded: 15000, rank: 1, colorClass: "purple" },
      { id: 2, username: "ShadowNinja", level: 48, xp: 11200, xpNeeded: 15000, rank: 2, colorClass: "blue" },
      { id: 3, username: "MoonlightWizard", level: 45, xp: 10800, xpNeeded: 15000, rank: 3, colorClass: "green" },
      { id: 4, username: "StarGazer", level: 42, xp: 9500, xpNeeded: 15000, rank: 4, colorClass: "yellow" },
      { id: 5, username: "PhoenixRising", level: 40, xp: 9100, xpNeeded: 15000, rank: 5, colorClass: "red" },
      { id: 6, username: "ThunderBolt", level: 38, xp: 8700, xpNeeded: 10000, rank: 6, colorClass: "blue" },
      { id: 7, username: "CosmicVoyager", level: 35, xp: 7800, xpNeeded: 10000, rank: 7, colorClass: "purple" },
      { id: 8, username: "MysticHunter", level: 32, xp: 7200, xpNeeded: 10000, rank: 8, colorClass: "green" },
    ];

    this.boosters = [
      { id: 1, username: "CrystalBoost", boostTier: 3, boostDuration: "3 months", initials: "CB", perks: ["Custom Role", "Priority Support", "Profile Badge"], colorClass: "purple" },
      { id: 2, username: "NeonPulse", boostTier: 2, boostDuration: "2 months", initials: "NP", perks: ["Custom Role", "Profile Badge"], colorClass: "blue" },
      { id: 3, username: "StarDust", boostTier: 2, boostDuration: "1 month", initials: "SD", perks: ["Custom Role", "Profile Badge"], colorClass: "green" },
      { id: 4, username: "GalaxyGlow", boostTier: 1, boostDuration: "3 weeks", initials: "GG", perks: ["Profile Badge"], colorClass: "yellow" },
      { id: 5, username: "LunarLight", boostTier: 1, boostDuration: "2 weeks", initials: "LL", perks: ["Profile Badge"], colorClass: "red" },
    ];

    this.afkUsers = [
      { id: 1, username: "VacationMode", afkDuration: "3 days", reason: "On vacation", initials: "VM", colorClass: "blue" },
      { id: 2, username: "StudyHard", afkDuration: "12 hours", reason: "Studying for exams", initials: "SH", colorClass: "green" },
      { id: 3, username: "WorkingLate", afkDuration: "8 hours", reason: "At work", initials: "WL", colorClass: "yellow" },
      { id: 4, username: "SleepyHead", afkDuration: "5 hours", reason: "Sleeping", initials: "SH", colorClass: "purple" },
      { id: 5, username: "TravelingAway", afkDuration: "2 days", reason: "Traveling", initials: "TA", colorClass: "red" },
    ];

    this.botCommands = [
      // Moderation commands
      { id: 1, name: "ban", description: "Ban a user from the server", usage: "!ban @user [reason]", category: "moderation", examples: ["!ban @user Spamming"] },
      { id: 2, name: "kick", description: "Kick a user from the server", usage: "!kick @user [reason]", category: "moderation", examples: ["!kick @user Breaking rules"] },
      { id: 3, name: "mute", description: "Mute a user in the server", usage: "!mute @user [duration] [reason]", category: "moderation", examples: ["!mute @user 1h Excessive noise"] },
      { id: 4, name: "clear", description: "Clear messages in a channel", usage: "!clear [amount]", category: "moderation", examples: ["!clear 50"] },
      
      // Customization commands
      { id: 5, name: "prefix", description: "Change the bot prefix", usage: "!prefix [new prefix]", category: "customization", examples: ["!prefix ?"] },
      { id: 6, name: "welcome", description: "Set welcome message", usage: "!welcome [message]", category: "customization", examples: ["!welcome Welcome {user} to our server!"] },
      { id: 7, name: "autorole", description: "Set auto role for new members", usage: "!autorole @role", category: "customization", examples: ["!autorole @Member"] },
      { id: 8, name: "levelmsg", description: "Customize level up messages", usage: "!levelmsg [message]", category: "customization", examples: ["!levelmsg Congrats {user}, you reached level {level}!"] },
      
      // Fun commands
      { id: 9, name: "8ball", description: "Ask the magic 8ball a question", usage: "!8ball [question]", category: "fun", examples: ["!8ball Will I win the lottery?"] },
      { id: 10, name: "meme", description: "Get a random meme", usage: "!meme", category: "fun", examples: ["!meme"] },
      { id: 11, name: "roll", description: "Roll a dice", usage: "!roll [sides]", category: "fun", examples: ["!roll 20"] },
      { id: 12, name: "cat", description: "Get a random cat picture", usage: "!cat", category: "fun", examples: ["!cat"] },
      
      // Utility commands
      { id: 13, name: "help", description: "Show help information", usage: "!help [command]", category: "utility", examples: ["!help ban"] },
      { id: 14, name: "ping", description: "Check bot latency", usage: "!ping", category: "utility", examples: ["!ping"] },
      { id: 15, name: "userinfo", description: "Get info about a user", usage: "!userinfo [@user]", category: "utility", examples: ["!userinfo @user"] },
      { id: 16, name: "serverinfo", description: "Get info about the server", usage: "!serverinfo", category: "utility", examples: ["!serverinfo"] },
    ];

    this.activities = [
      { id: 1, type: "command-used", user: "DragonSlayer", action: "used command", target: "!roll 20", time: "5 minutes ago" },
      { id: 2, type: "level-up", user: "ShadowNinja", action: "leveled up to", target: "Level 48", time: "30 minutes ago" },
      { id: 3, type: "server-joined", note: "Bot joined a new server: Gaming Community", time: "2 hours ago" },
      { id: 4, type: "command-used", user: "MoonlightWizard", action: "used command", target: "!ban @SpamBot", time: "3 hours ago" },
      { id: 5, type: "bot-update", note: "Bot updated to version 2.5.0", time: "1 day ago" },
    ];

    this.serverStats = [
      { id: 1, name: "Gaming Central", memberCount: 3250, botPrefix: "!", features: ["Leveling", "Moderation", "Music"] },
      { id: 2, name: "Anime Club", memberCount: 1842, botPrefix: "?", features: ["Roles", "Welcome", "Anime Quotes"] },
      { id: 3, name: "Developer Hub", memberCount: 950, botPrefix: ".", features: ["Code Snippets", "GitHub Integration"] },
    ];

    this.teamMembers = [
      { id: 1, name: "John Doe", email: "john@discordbot.com", role: "Lead Developer", initials: "JD" },
      { id: 2, name: "Alex Johnson", email: "alex@discordbot.com", role: "Bot Engineer", initials: "AJ" },
      { id: 3, name: "Sarah Miller", email: "sarah@discordbot.com", role: "UI Designer", initials: "SM" },
      { id: 4, name: "Michael Brown", email: "michael@discordbot.com", role: "Support Lead", initials: "MB" },
    ];
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    // Ensure all required fields are set with proper nullability
    const user: User = { 
      ...insertUser, 
      id,
      name: insertUser.name || null,
      email: insertUser.email || null,
      avatar: insertUser.avatar || null
    };
    this.users.set(id, user);
    return user;
  }

  async getStats(): Promise<any[]> {
    return this.stats;
  }

  async getProjects(): Promise<any[]> {
    return this.projects;
  }

  async getLeaderboard(): Promise<any[]> {
    return this.leaderboard;
  }

  async getBoosters(): Promise<any[]> {
    return this.boosters;
  }

  async getAfkUsers(): Promise<any[]> {
    return this.afkUsers;
  }

  async getBotCommands(): Promise<any[]> {
    return this.botCommands;
  }

  async getCommandsByCategory(category: string): Promise<any[]> {
    return this.botCommands.filter(command => command.category === category);
  }

  async getServerStats(): Promise<any[]> {
    return this.serverStats;
  }

  async getRecentProjects(): Promise<any[]> {
    // Maintain compatibility with original API
    return this.leaderboard.slice(0, 3);
  }

  async getRecentActivities(): Promise<any[]> {
    // Return only the 3 most recent activities
    return this.activities.slice(0, 3);
  }

  async getTeamMembers(): Promise<any[]> {
    return this.teamMembers;
  }

  async createProject(projectData: any): Promise<any> {
    // For backwards compatibility, we'll add new users to the leaderboard
    const id = this.leaderboard.length + 1;
    const leaderboardEntry = {
      id,
      username: projectData.name,
      level: Math.floor(Math.random() * 20) + 1,
      xp: Math.floor(Math.random() * 5000),
      xpNeeded: 5000,
      rank: this.leaderboard.length + 1,
      colorClass: projectData.colorClass || "blue"
    };
    
    this.leaderboard.push(leaderboardEntry);
    
    // Create an activity for this action
    const activityId = this.currentActivityId++;
    const activity = {
      id: activityId,
      type: "level-up",
      user: leaderboardEntry.username,
      action: "joined the",
      target: "server",
      time: "just now"
    };
    this.activities.unshift(activity);
    
    return leaderboardEntry;
  }
}

export const storage = new MemStorage();
