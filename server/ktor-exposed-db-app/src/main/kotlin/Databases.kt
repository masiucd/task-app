package com.example

import io.ktor.server.application.*
import org.jetbrains.exposed.sql.Database

fun Application.configureDatabases() {
    Database.connect(
        url = "jdbc:postgresql://localhost:5432/taskdb",
        user = "user",
        password = "password",
//        url = "jdbc:postgresql://localhost:5432/postgres",
//        user = "postgres",
//        password = "root",
    )
}
