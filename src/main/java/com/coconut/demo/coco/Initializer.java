package com.coconut.demo.coco;

import com.coconut.demo.coco.model.Event;
import com.coconut.demo.coco.model.Group;
import com.coconut.demo.coco.model.GroupRepository;
import com.coconut.demo.coco.model.Item;
import com.coconut.demo.coco.model.ItemRepository;
import com.coconut.demo.coco.model.ProductType;
import com.coconut.demo.coco.model.ProductTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Stream;

@Component
public class Initializer implements CommandLineRunner {


    private final GroupRepository repository;
    @Autowired
    private final ProductTypeRepository productTypeRepository;
    @Autowired
    private final ItemRepository itemRepository;

    public Initializer(GroupRepository repository, ProductTypeRepository productTypeRepository, ItemRepository itemRepository) {
        this.repository = repository;
        this.productTypeRepository = productTypeRepository;
        this.itemRepository = itemRepository;
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


        InitialEntities initialEntities = new InitialEntities();
        // Insert product type
        initialEntities.getProductTypeList().forEach(pt -> {
            productTypeRepository.save(pt);
        });

        // Insert Item
        initialEntities.getItemList().forEach(it -> {
            itemRepository.save(it);
        });

    }

    private List<ProductType> initializeProductType() {
        ProductType drink = new ProductType(null, "Drink");
        ProductType snack = new ProductType(null, "Snack");
        ProductType meat = new ProductType(null, "Meat");
        ProductType vegetable = new ProductType(null, "Vegetable");
        return Arrays.asList(drink, snack, meat, vegetable);
    }

    static class InitialEntities {
        private ProductType drink = new ProductType(null, "Drink");
        private ProductType meat = new ProductType(null, "Meat");
        private ProductType vegetable = new ProductType(null, "Vegetable");
        private ProductType fruit = new ProductType(null, "Fruit");

        private Item item1 = new Item(null, "Coca Cola", "望月湖店", drink);
        private Item item2 = new Item(null, "Apple Juice", "望月湖店", drink);
        private Item item3 = new Item(null, "Bubble Tea", "黄新路店", drink);
        private Item item4 = new Item(null, "Frappchino", "黄新路店", drink);
        private Item item5 = new Item(null, "Pork", "望月湖店", meat);
        private Item item6 = new Item(null, "Kobe", "望月湖店", meat);
        private Item item7 = new Item(null, "Chicken Wing", "黄新路店", meat);
        private Item item8 = new Item(null, "Carrot", "望月湖店", vegetable);
        private Item item9 = new Item(null, "Lettuce", "黄新路店", vegetable);
        private Item item10 = new Item(null, "Onion", "望月湖店", vegetable);
        private Item item11 = new Item(null, "Banana", "望月湖店", fruit);

        public List<ProductType> getProductTypeList() {
            return Arrays.asList(drink, meat, vegetable, fruit);
        }

        public List<Item> getItemList() {
            return Arrays.asList(item1,
                    item2,
                    item3,
                    item4,
                    item5,
                    item6,
                    item7,
                    item8,
                    item9,
                    item10,
                    item11);
        }
    }
}
