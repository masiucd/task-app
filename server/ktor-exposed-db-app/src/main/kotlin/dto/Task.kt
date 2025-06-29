package com.example.dto

import kotlinx.serialization.Serializable


enum class Priority {
  HIGH,
  MEDIUM,
  LOW,
  VITAL
}

@Serializable
data class Task(
  val id: Int,
  val title: String,
  val description: String,
  val priority: Priority,
  val completed: Boolean = false,
)


@Serializable
data class CreateTask(
  val title: String,
  val description: String,
  val priority: Priority = Priority.MEDIUM,
  val completed: Boolean = false,
)