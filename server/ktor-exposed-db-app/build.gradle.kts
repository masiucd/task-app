plugins {
  alias(libs.plugins.kotlin.jvm)
  alias(libs.plugins.ktor)
  alias(libs.plugins.kotlin.plugin.serialization)
}

group = "com.example"
version = "0.0.1"

application {
  mainClass = "io.ktor.server.netty.EngineMain"
}

repositories {
  mavenCentral()
}

dependencies {
  implementation(libs.ktor.server.core)
  implementation(libs.ktor.server.host.common)
  implementation(libs.ktor.server.status.pages)
  implementation(libs.ktor.serialization.kotlinx.json)
  implementation(libs.ktor.server.content.negotiation)
  implementation(libs.exposed.core)
  implementation(libs.exposed.jdbc)
  implementation(libs.h2)
  implementation(libs.postgresql)
  implementation(libs.ktor.server.netty)
  implementation(libs.logback.classic)
  implementation(libs.ktor.server.config.yaml)
  implementation(libs.exposed.dao)
  implementation("io.ktor:ktor-server-cors:3.2.0") // Adjust version as needed


  testImplementation(libs.ktor.server.test.host)
  testImplementation(libs.kotlin.test.junit)
  testImplementation(libs.ktor.client.content.negotiation)
}
