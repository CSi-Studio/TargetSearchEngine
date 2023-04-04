package net.csibio.tse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableAsync
@EnableCaching
@EnableScheduling
@EnableAspectJAutoProxy
public class TseApplication {

    public static final Logger logger = LoggerFactory.getLogger(TseApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(TseApplication.class, args);
    }
}
