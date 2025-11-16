import { type UserProfile, type InsertUserProfile, type Task, type InsertTask } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User Profile methods
  getUserProfile(id: string): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  updateUserProfile(id: string, profile: Partial<InsertUserProfile>): Promise<UserProfile | undefined>;

  // Task methods
  getTask(id: string): Promise<Task | undefined>;
  getTasksByUser(userId: string): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: string, task: Partial<InsertTask>): Promise<Task | undefined>;
  deleteTask(id: string): Promise<boolean>;
  toggleTaskCompletion(id: string): Promise<Task | undefined>;
}

export class MemStorage implements IStorage {
  private userProfiles: Map<string, UserProfile>;
  private tasks: Map<string, Task>;

  constructor() {
    this.userProfiles = new Map();
    this.tasks = new Map();
  }

  // User Profile methods
  async getUserProfile(id: string): Promise<UserProfile | undefined> {
    return this.userProfiles.get(id);
  }

  async createUserProfile(insertProfile: InsertUserProfile): Promise<UserProfile> {
    const id = randomUUID();
    const profile: UserProfile = {
      id,
      occupation: insertProfile.occupation,
      workflowStyle: insertProfile.workflowStyle,
      shortTermGoal: insertProfile.shortTermGoal ?? null,
      longTermGoal: insertProfile.longTermGoal ?? null,
      motivationTriggers: insertProfile.motivationTriggers,
      theme: insertProfile.theme ?? "calm",
      createdAt: new Date(),
    };
    this.userProfiles.set(id, profile);
    return profile;
  }

  async updateUserProfile(id: string, updates: Partial<InsertUserProfile>): Promise<UserProfile | undefined> {
    const profile = this.userProfiles.get(id);
    if (!profile) return undefined;

    const updated: UserProfile = { ...profile, ...updates };
    this.userProfiles.set(id, updated);
    return updated;
  }

  // Task methods
  async getTask(id: string): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async getTasksByUser(userId: string): Promise<Task[]> {
    return Array.from(this.tasks.values())
      .filter((task) => task.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = randomUUID();
    const task: Task = {
      id,
      userId: insertTask.userId,
      title: insertTask.title,
      purpose: insertTask.purpose ?? null,
      deadline: insertTask.deadline ? new Date(insertTask.deadline) : null,
      category: insertTask.category,
      breakdown: insertTask.breakdown ?? null,
      reminderCount: insertTask.reminderCount ?? null,
      completed: false,
      completedAt: null,
      createdAt: new Date(),
    };
    this.tasks.set(id, task);
    return task;
  }

  async updateTask(id: string, updates: Partial<InsertTask>): Promise<Task | undefined> {
    const task = this.tasks.get(id);
    if (!task) return undefined;

    const updated: Task = {
      ...task,
      ...updates,
      deadline: updates.deadline ? new Date(updates.deadline) : task.deadline,
    };
    this.tasks.set(id, updated);
    return updated;
  }

  async deleteTask(id: string): Promise<boolean> {
    return this.tasks.delete(id);
  }

  async toggleTaskCompletion(id: string): Promise<Task | undefined> {
    const task = this.tasks.get(id);
    if (!task) return undefined;

    const updated: Task = {
      ...task,
      completed: !task.completed,
      completedAt: !task.completed ? new Date() : null,
    };
    this.tasks.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
