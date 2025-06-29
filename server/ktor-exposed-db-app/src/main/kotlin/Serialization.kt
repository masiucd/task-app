package com.example

import com.example.dto.CreateTask
import com.example.dto.IdData
import com.example.dto.Priority
import com.example.dto.ResponseWrapper
import com.example.dto.Task
import com.example.model.TaskRepository
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureSerialization(repository: TaskRepository) {
  install(ContentNegotiation) {
    json()
  }
  routing {
    route("/tasks/api/v1") {
      get {
        val tasks = repository.allTasks()
        call.respond(HttpStatusCode.OK, ResponseWrapper<List<Task>>(
          ok = false,
          message = "Task data list",
          data = tasks))
      }

      get("/{title}") {
        val titleParam = call.parameters["title"]
        if (titleParam == null) {
          call.respond(HttpStatusCode.BadRequest, ResponseWrapper<Nothing>(
            ok = false,
            message = "Title param is required"))
          return@get
        }
        val task = repository.taskByTitle(titleParam)
        if (task == null) {
          call.respond(HttpStatusCode.NotFound, ResponseWrapper<Nothing>(
            ok = false,
            message = "Task can't be found"))
          return@get
        }
        call.respond(HttpStatusCode.OK, ResponseWrapper<Task>(
          ok = false,
          message = "Task data is required",
          data = task))
      }


      get("/task/{id}") {
        val idParam = call.parameters["id"]
        if (idParam == null) {
          call.respond(HttpStatusCode.BadRequest, ResponseWrapper<Nothing>(
            ok = false,
            message = "ID is required"))
          return@get
        }
        val id = idParam.toIntOrNull()
        if (id == null) {
          call.respond(HttpStatusCode.BadRequest, ResponseWrapper<Nothing>(
            ok = false,
            message = "ID has wrong type"))
          return@get
        }
        val task = repository.taskById(id)
        if (task == null) {
          call.respond(HttpStatusCode.NotFound, ResponseWrapper<Nothing>(
            ok = false,
            message = "Task with id $id not found"))
          return@get
        }
        call.respond(HttpStatusCode.OK, task)
      }

      get("/by-priority/{priority}") {
        val priorityParam = call.parameters["priority"]
        println(priorityParam)
        if (priorityParam == null) {
          call.respond(
            HttpStatusCode.BadRequest,
            ResponseWrapper<Nothing>(
              ok = false,
              message = "Priority param is required")
          )
          return@get
        }
        val priorityResult = runCatching { Priority.valueOf(priorityParam.uppercase()) }
        val priority = priorityResult.getOrNull()
        if (priority == null) {
          call.respond(HttpStatusCode.BadRequest, ResponseWrapper<Nothing>(
            ok = false,
            message = "Priority must be one of: HIGH, MEDIUM, LOW, VITAL"))
          return@get
        }

        val tasks = repository.tasksByPriority(priority)
        call.respond(HttpStatusCode.OK, ResponseWrapper<List<Task>>(
          ok = true,
          message = "Tasks with priority $priority",
          data = tasks
        ))

      }


      post {
        val task = runCatching { call.receive<CreateTask>() }
          .getOrNull()
        if (task == null) {
          call.respond(HttpStatusCode.BadRequest,
                       ResponseWrapper<Nothing>(
                         ok = false,
                         message = "Task data is required"))
          return@post
        }
        repository.createTask(task)
        call.respond(HttpStatusCode.Created,
                     ResponseWrapper<CreateTask>(
                       ok = true,
                       message = "Task created successfully",
                       data = task))
        return@post
      }


      put("/update/{id}") {
        val idParam = call.parameters["id"]
        if (idParam == null) {
          call.respond(HttpStatusCode.BadRequest,
                       ResponseWrapper<Nothing>(
                         ok = false,
                         message = "id is required"))

          return@put
        }
        val id = runCatching { idParam.toInt() }.getOrNull()
        if (id == null) {
          call.respond(HttpStatusCode.BadRequest,
                       ResponseWrapper<Nothing>(
                         ok = false,
                         message = "id must be an integer"))
          return@put
        }
        val task = runCatching { call.receive<Task>() }
          .getOrNull()
        if (task == null) {
          call.respond(HttpStatusCode.BadRequest,
                       ResponseWrapper<Nothing>(
                         ok = false,
                         message = "Task data is required"
                       ))
          return@put
        }
        if (id != task.id) {
          call.respond(HttpStatusCode.BadRequest,
                       ResponseWrapper<Nothing>(ok = false,
                                                message = "Id in the path ($id) does not match id in the task data (${task.id})"))
          return@put
        }
        val updatedTask = repository.updateTask(task)
        updatedTask?.let {
          call.respond(HttpStatusCode.OK,
                       ResponseWrapper<Task>(
                         ok = true,
                         message = "Task with id ${task.id} updated successfully",
                         data = updatedTask
                       ))
          return@put
        }

        call.respond(HttpStatusCode.NotFound,
                     ResponseWrapper<Nothing>(
                       ok = false,
                       message = "Task with id $id not found"))
        return@put
      }


      put("/toggle-completed") {
        val dataRequest = runCatching { call.receive<IdData>() }.getOrNull()
        if (dataRequest == null) {
          call.respond(HttpStatusCode.BadRequest,
                       ResponseWrapper<Nothing>(
                         ok = false,
                         message = "Id data is required"))
          return@put
        }

        val ok = repository.toggleCompleted(dataRequest.id)
        if (ok) {
          call.respond(HttpStatusCode.OK,
                       ResponseWrapper<Boolean>(
                         ok = true,
                         message = "Task with id ${dataRequest.id} toggled successfully",
                         data = true
                       ))
          return@put
        }
        call.respond(HttpStatusCode.NotFound,
                     ResponseWrapper<Nothing>(
                       ok = false,
                       message = "Task with id ${dataRequest.id} not found",
                     )
        )
        return@put
      }


      delete("/{id}") {
        val idParam = call.parameters["id"]
        if (idParam == null) {
          call.respond(HttpStatusCode.BadRequest,
                       ResponseWrapper<Nothing>(
                         ok = false,
                         message = "id is required"))
          return@delete
        }
        val id = runCatching { idParam.toInt() }.getOrNull()
        if (id == null) {
          call.respond(HttpStatusCode.BadRequest,
                       ResponseWrapper<Nothing>(
                         ok = false,
                         message = "id must be an integer"))
          return@delete
        }
        val ok = repository.deleteTask(id)
        if (!ok) {
          call.respond(HttpStatusCode.NotFound, ResponseWrapper<Nothing>(
            ok = false,
            message = "Task with id $id not found"
          ))
          return@delete
        }
        call.respond(HttpStatusCode.OK, ResponseWrapper<Boolean>(
          ok = true,
          message = "Task with id $id deleted successfully",
          data = true))
        return@delete
      }


    }
  }
}
