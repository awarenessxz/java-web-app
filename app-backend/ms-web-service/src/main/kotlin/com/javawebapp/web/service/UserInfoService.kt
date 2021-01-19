package com.javawebapp.web.service

import com.javawebapp.web.model.UserInfo
import org.springframework.stereotype.Service

@Service
class UserInfoService {
    fun getAuthenticatedUserInfo(): UserInfo {
        return UserInfo(userId = "user123")
    }
}