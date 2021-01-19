package com.javawebapp.web.controller

import com.javawebapp.web.model.UserInfo
import com.javawebapp.web.service.UserInfoService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/user")
class UserInfoController(
        private val userInfoService: UserInfoService
) {

    @GetMapping("/info")
    fun getAuthenticatedUserInfo(): UserInfo {
        return userInfoService.getAuthenticatedUserInfo()
    }
}