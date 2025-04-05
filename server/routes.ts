import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - Dashboard stats
  app.get("/api/stats", async (_req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Error fetching stats" });
    }
  });

  // Discord bot specific routes
  app.get("/api/leaderboard", async (_req, res) => {
    try {
      const leaderboard = await storage.getLeaderboard();
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: "Error fetching leaderboard" });
    }
  });

  app.get("/api/boosters", async (_req, res) => {
    try {
      const boosters = await storage.getBoosters();
      res.json(boosters);
    } catch (error) {
      res.status(500).json({ message: "Error fetching boosters" });
    }
  });

  app.get("/api/afk", async (_req, res) => {
    try {
      const afkUsers = await storage.getAfkUsers();
      res.json(afkUsers);
    } catch (error) {
      res.status(500).json({ message: "Error fetching AFK users" });
    }
  });

  app.get("/api/commands", async (_req, res) => {
    try {
      const commands = await storage.getBotCommands();
      res.json(commands);
    } catch (error) {
      res.status(500).json({ message: "Error fetching commands" });
    }
  });

  app.get("/api/commands/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const commands = await storage.getCommandsByCategory(category);
      res.json(commands);
    } catch (error) {
      res.status(500).json({ message: "Error fetching commands by category" });
    }
  });

  app.get("/api/servers", async (_req, res) => {
    try {
      const servers = await storage.getServerStats();
      res.json(servers);
    } catch (error) {
      res.status(500).json({ message: "Error fetching server stats" });
    }
  });
  
  // Legacy routes - keep for compatibility
  app.get("/api/projects", async (_req, res) => {
    try {
      // Now returns leaderboard instead of projects
      const projects = await storage.getLeaderboard();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Error fetching projects" });
    }
  });

  app.get("/api/projects/recent", async (_req, res) => {
    try {
      const projects = await storage.getRecentProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Error fetching recent projects" });
    }
  });

  app.get("/api/activity/recent", async (_req, res) => {
    try {
      const activities = await storage.getRecentActivities();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Error fetching recent activities" });
    }
  });

  app.get("/api/team", async (_req, res) => {
    try {
      const team = await storage.getTeamMembers();
      res.json(team);
    } catch (error) {
      res.status(500).json({ message: "Error fetching team members" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const project = await storage.createProject(req.body);
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ message: "Error creating project" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
