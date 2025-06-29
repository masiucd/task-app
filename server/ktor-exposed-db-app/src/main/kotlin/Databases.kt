package com.example

import io.github.cdimascio.dotenv.dotenv
import io.ktor.server.application.*
import org.jetbrains.exposed.sql.Database

fun Application.configureDatabases() {
  val dotenv = dotenv()
  println(dotenv["DB_USER"])
  Database.connect(
    url = dotenv["DB_URL"] ?: "jdbc:h2:mem:test;DB_CLOSE_DELAY=-1;",
    user = dotenv["DB_USER"] ?: "sa",
    password = dotenv["DB_PASSWORD"] ?: ""
  )
}
