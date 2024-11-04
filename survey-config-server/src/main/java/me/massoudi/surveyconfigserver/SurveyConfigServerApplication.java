package me.massoudi.surveyconfigserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
public class SurveyConfigServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(SurveyConfigServerApplication.class, args);
    }

}
