package com.example

import com.example.model.TaskRepositoryImpl
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.cors.routing.*

fun main(args: Array<String>) {
  io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {
  install(CORS) {
    allowHost("localhost:3333", schemes = listOf("http", "https"))
    allowMethod(HttpMethod.Options)
    allowMethod(HttpMethod.Get)
    allowMethod(HttpMethod.Post)
    allowMethod(HttpMethod.Put)
    allowMethod(HttpMethod.Delete)
    allowHeader(HttpHeaders.ContentType)
    allowHeader(HttpHeaders.Accept)
    allowHeader(HttpHeaders.Authorization)
    allowCredentials = true
  }

  val task = TaskRepositoryImpl()
  configureSerialization(task)
  configureDatabases()
  //  TODO REMOVE

  
  configureRouting()
}
