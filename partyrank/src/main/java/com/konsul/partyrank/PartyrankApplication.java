package com.konsul.partyrank;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class PartyrankApplication implements CommandLineRunner {
  public static void main(String[] args) {
    SpringApplication.run(PartyrankApplication.class, args);
  }

  @Override
  public void run(String... args) throws Exception {

  }
}