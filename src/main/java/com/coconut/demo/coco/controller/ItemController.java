package com.coconut.demo.coco.controller;

import com.coconut.demo.coco.model.Item;
import com.coconut.demo.coco.model.ItemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("api")
public class ItemController {

    final private Logger log = LoggerFactory.getLogger(ItemController.class);
    final private ItemRepository itemRepository;

    public ItemController(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @GetMapping("items")
    Collection<Item> Items() {
        return itemRepository.findAll();
    }

    @GetMapping("item")
    ResponseEntity<Item> getItem(@RequestParam("name") String itemName) {
        Item item = itemRepository.getItemByName(itemName);
        return ResponseEntity.ok().body(item);
    }
}
