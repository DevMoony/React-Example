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

  // Discord bot specific routes - Leaderboard CRUD operations
  app.get("/api/leaderboard", async (_req, res) => {
    try {
      const leaderboard = await storage.getLeaderboard();
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: "Error fetching leaderboard" });
    }
  });
  
  // Get a specific leaderboard user by ID
  app.get("/api/leaderboard/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const user = await storage.getLeaderboardUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching leaderboard user" });
    }
  });
  
  // Add a new user to the leaderboard
  app.post("/api/leaderboard", async (req, res) => {
    try {
      // Basic validation
      if (!req.body.username) {
        return res.status(400).json({ message: "Username is required" });
      }
      
      const newUser = await storage.addLeaderboardUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Error adding leaderboard user" });
    }
  });
  
  // Update a leaderboard user
  app.patch("/api/leaderboard/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      // Don't allow changing the ID
      const userData = { ...req.body };
      delete userData.id;
      
      const updatedUser = await storage.updateLeaderboardUser(id, userData);
      res.json(updatedUser);
    } catch (error: any) {
      // If user not found, return 404
      if (error.message && error.message.includes("not found")) {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: "Error updating leaderboard user" });
    }
  });
  
  // Delete a leaderboard user
  app.delete("/api/leaderboard/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const success = await storage.deleteLeaderboardUser(id);
      if (!success) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting leaderboard user" });
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
