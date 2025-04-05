import { users, type User, type InsertUser } from "@shared/schema";

// Storage Interface
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getStats(): Promise<any[]>;
  getProjects(): Promise<any[]>;
  getRecentProjects(): Promise<any[]>;
  getRecentActivities(): Promise<any[]>;
  getTeamMembers(): Promise<any[]>;
  createProject(project: any): Promise<any>;
}

// In-memory Storage Implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private stats: any[];
  private projects: any[];
  private activities: any[];
  private teamMembers: any[];
  private currentUserId: number;
  private currentProjectId: number;
  private currentActivityId: number;
  private currentTeamMemberId: number;

  constructor() {
    this.users = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentActivityId = 1;
    this.currentTeamMemberId = 1;

    // Initialize with mock data for demo
    this.stats = [
      { id: 1, name: "Total Projects", value: 12, change: 3.2, trend: "up" },
      { id: 2, name: "Team Members", value: 8, change: 2.0, trend: "up" },
      { id: 3, name: "Completed Tasks", value: 64, change: -1.5, trend: "down" },
      { id: 4, name: "Active Sprints", value: 3, change: 0, trend: "neutral" },
    ];

    this.projects = [
      { id: 1, name: "Website Redesign", updatedAt: "2d ago", status: "In Progress", colorClass: "green" },
      { id: 2, name: "Mobile App Development", updatedAt: "5d ago", status: "Planning", colorClass: "blue" },
      { id: 3, name: "API Integration", updatedAt: "1w ago", status: "Review", colorClass: "yellow" },
      { id: 4, name: "Database Migration", updatedAt: "2w ago", status: "Completed", colorClass: "green" },
      { id: 5, name: "E-commerce Platform", updatedAt: "1m ago", status: "On Hold", colorClass: "red" },
    ];

    this.activities = [
      { id: 1, type: "user-action", user: "Alex Johnson", action: "completed task", target: "Update documentation", time: "2 hours ago" },
      { id: 2, type: "status-change", note: "Website Redesign project moved to In Progress", time: "Yesterday" },
      { id: 3, type: "comment", user: "Sarah Miller", action: "commented on", target: "Mobile App Development", time: "3 days ago" },
      { id: 4, type: "user-action", user: "Michael Brown", action: "created", target: "API Integration project", time: "1 week ago" },
      { id: 5, type: "status-change", note: "E-commerce Platform put On Hold", time: "1 month ago" },
    ];

    this.teamMembers = [
      { id: 1, name: "John Doe", email: "john@example.com", role: "Project Manager", initials: "JD" },
      { id: 2, name: "Alex Johnson", email: "alex@example.com", role: "Frontend Developer", initials: "AJ" },
      { id: 3, name: "Sarah Miller", email: "sarah@example.com", role: "Backend Developer", initials: "SM" },
      { id: 4, name: "Michael Brown", email: "michael@example.com", role: "UI/UX Designer", initials: "MB" },
      { id: 5, name: "Emily Wilson", email: "emily@example.com", role: "QA Engineer", initials: "EW" },
      { id: 6, name: "David Lee", email: "david@example.com", role: "DevOps Engineer", initials: "DL" },
      { id: 7, name: "Lisa Chen", email: "lisa@example.com", role: "Product Owner", initials: "LC" },
      { id: 8, name: "Robert Taylor", email: "robert@example.com", role: "Database Administrator", initials: "RT" },
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
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getStats(): Promise<any[]> {
    return this.stats;
  }

  async getProjects(): Promise<any[]> {
    return this.projects;
  }

  async getRecentProjects(): Promise<any[]> {
    // Return only the 3 most recent projects
    return this.projects.slice(0, 3);
  }

  async getRecentActivities(): Promise<any[]> {
    // Return only the 3 most recent activities
    return this.activities.slice(0, 3);
  }

  async getTeamMembers(): Promise<any[]> {
    return this.teamMembers;
  }

  async createProject(projectData: any): Promise<any> {
    const id = this.currentProjectId++;
    const project = { 
      id, 
      ...projectData,
      updatedAt: "just now"
    };
    this.projects.unshift(project); // Add to beginning so it's most recent
    
    // Create an activity for this action
    const activityId = this.currentActivityId++;
    const activity = {
      id: activityId,
      type: "user-action",
      user: "John Doe", // Current user (hardcoded for demo)
      action: "created",
      target: `${projectData.name} project`,
      time: "just now"
    };
    this.activities.unshift(activity);
    
    return project;
  }
}

export const storage = new MemStorage();
