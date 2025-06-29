package com.example.db

import com.example.dto.Priority
import com.example.dto.Task
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.Transaction
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction


object TaskTable : IntIdTable("task") {
  val title = varchar("title", 50)
  val description = varchar("description", 50)
  val priority = varchar("priority", 50)
  val completed = bool("completed").default(false)
}

class TaskDAO(id: EntityID<Int>) : IntEntity(id) {
  companion object : IntEntityClass<TaskDAO>(TaskTable)

  var title by TaskTable.title
  var description by TaskTable.description
  var priority by TaskTable.priority
  var completed by TaskTable.completed
}


suspend fun <T> suspendTransaction(block: Transaction.() -> T): T =
  newSuspendedTransaction(Dispatchers.IO, statement = block)

fun daoToModel(dao: TaskDAO) = Task(
  id = dao.id.value,
  title = dao.title,
  description = dao.description,
  priority = Priority.valueOf(dao.priority),
  completed = dao.completed,
)


