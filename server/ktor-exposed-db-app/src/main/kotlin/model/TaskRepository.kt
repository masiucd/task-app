package com.example.model

import com.example.dto.CreateTask
import com.example.dto.Priority
import com.example.dto.Task

interface TaskRepository {
  suspend fun allTasks(): List<Task>
  suspend fun taskByTitle(title: String): Task?
  suspend fun tasksByPriority(priority: Priority): List<Task>
  suspend fun taskById(id: Int): Task?
  suspend fun createTask(task: CreateTask): Unit
  suspend fun deleteTask(id: Int): Boolean
  suspend fun toggleCompleted(id: Int): Boolean
  suspend fun updateTask(task: Task): Task?
}


