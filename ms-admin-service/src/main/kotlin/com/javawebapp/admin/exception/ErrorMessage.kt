package com.javawebapp.admin.exception

import java.util.*

data class ErrorMessage(
        val timestamp: Date,
        val message: String,
        val errorType: ErrorTypes? = null
)
