package com.example.model

import com.example.db.TaskDAO
import com.example.db.TaskTable
import com.example.db.daoToModel
import com.example.db.suspendTransaction
import com.example.dto.CreateTask
import com.example.dto.Priority
import com.example.dto.Task
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.lowerCase

class TaskRepositoryImpl : TaskRepository {
  override suspend fun allTasks(): List<Task> = suspendTransaction {
    TaskDAO.all()
      .sortedBy { it.id.value }
      .map(::daoToModel)
  }

  override suspend fun taskByTitle(title: String): Task? = suspendTransaction {
    TaskDAO.find { TaskTable.title.lowerCase() eq title.lowercase() }
      .limit(1)
      .map(::daoToModel)
      .getOrNull(0)
  }

  override suspend fun tasksByPriority(priority: Priority): List<Task> = suspendTransaction {
    TaskDAO.find { TaskTable.priority eq priority.toString() }
      .map(::daoToModel)
  }


  override suspend fun taskById(id: Int): Task? = suspendTransaction {
    TaskDAO.find { TaskTable.id eq id }
      .map(::daoToModel)
      .getOrNull(0)
  }

  override suspend fun createTask(task: CreateTask): Unit = suspendTransaction {
    TaskDAO.new {
      title = task.title
      description = task.description
      priority = task.priority.toString()
      completed = task.completed
    }
  }


  override suspend fun toggleCompleted(id: Int) = suspendTransaction {
    TaskDAO.findByIdAndUpdate(id) {
      it.completed = !it.completed
    } != null
  }


  override suspend fun deleteTask(id: Int): Boolean = suspendTransaction {
    val rowsDeleted = TaskTable.deleteWhere { TaskTable.id eq id }
    rowsDeleted == 1
  }


  override suspend fun updateTask(task: Task): Task? = suspendTransaction {
    TaskDAO.findByIdAndUpdate(task.id) {
      it.title = task.title
      it.description = task.description
      it.priority = task.priority.toString()
      it.completed = task.completed
    }
      ?.let { daoToModel(it) }
  }

}