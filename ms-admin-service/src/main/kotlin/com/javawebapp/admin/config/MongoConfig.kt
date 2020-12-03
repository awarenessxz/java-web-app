package com.javawebapp.admin.config

import com.javawebapp.admin.util.ZonedDateTimeReadConverter
import com.javawebapp.admin.util.ZonedDateTimeWriteConverter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.convert.converter.Converter
import org.springframework.data.mongodb.core.convert.MongoCustomConversions
import kotlin.collections.ArrayList

@Configuration
class MongoConfig {

    @Bean
    fun customConversions(): MongoCustomConversions {
        val converters: MutableList<Converter<*, *>?> = ArrayList()
        converters.add(ZonedDateTimeReadConverter())
        converters.add(ZonedDateTimeWriteConverter())
        return MongoCustomConversions(converters)
    }
}
