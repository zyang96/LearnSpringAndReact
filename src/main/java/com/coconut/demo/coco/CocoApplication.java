package com.coconut.demo.coco;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//this Meta-annotation encapsulated a lot of spring configuration, e.g. @Configuration, @ComponentScan, etc.
public class CocoApplication {

	public static void main(String[] args) {
		SpringApplication.run(CocoApplication.class, args);
	}

}
