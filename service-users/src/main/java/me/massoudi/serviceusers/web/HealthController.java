package me.massoudi.serviceusers.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/health")
public class HealthController {

    @GetMapping("/")
    public String health() {
        return "users service is alive!";
    }
}
