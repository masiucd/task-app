package com.example.dto

import kotlinx.serialization.Serializable

@Serializable
data class ResponseWrapper<T>(
  val ok: Boolean,
  val message: String,
  val data: T? = null,
)
