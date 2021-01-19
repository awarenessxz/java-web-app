package com.javawebapp.web.model

import com.javawebapp.web.util.WebConstants

data class UserInfo(
        var userId: String? = null,
        var userRole: String? = WebConstants.USER_ROLE_NORMAL
)