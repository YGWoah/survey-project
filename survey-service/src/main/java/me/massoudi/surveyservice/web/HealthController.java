package me.massoudi.surveyservice.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RefreshScope
@RestController
@RequestMapping("/health")
public class HealthController {

    @Value("${server.port}")
    private String serverPort;
    @Value("${test}")
    private String test;

    @GetMapping("/")
    public String health() {
        return "Survey Service is up and running!";
    }

    @GetMapping("/test")
    public String test() {
        return "Server port: " + serverPort + " Test: " + test;
    }
}

