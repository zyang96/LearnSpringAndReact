package com.coconut.demo.coco;

import com.coconut.demo.coco.model.Event;
import com.coconut.demo.coco.model.Group;
import com.coconut.demo.coco.model.GroupRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Collections;
import java.util.stream.Stream;

@Component
public class Initializer implements CommandLineRunner {


    private final GroupRepository repository;

    public Initializer(GroupRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        Stream.of("Seattle COCO", "Atlanta COCO", "LA COCO")
                .forEach(n -> repository.save(new Group(n)));
        Group group = repository.findByName("Seattle COCO");
        Event e = Event.builder().title("Full Stack Reactive")
                .description("Reactive with Spring Boot + React")
                .date(Instant.now())
                .build();
        group.setEvents(Collections.singleton(e));

        repository.findAll().forEach(System.out::println);
    }
}
