package com.konsul.partyrank;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.konsul.partyrank.model.User;
import com.konsul.partyrank.repository.UserRepository;

@SpringBootApplication
@RestController
public class PartyrankApplication implements CommandLineRunner {
    public static void main(String[] args) {
      SpringApplication.run(PartyrankApplication.class, args);
    }
    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
      return String.format("Hello %s!", name);
    }
    
    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
      this.userRepository.save(new User("Chris", "King", "chriis.santanaa@gmail.com"));
      this.userRepository.save(new User("Konsul", "Queen", "khris.sama@gmail.com"));
    }
}