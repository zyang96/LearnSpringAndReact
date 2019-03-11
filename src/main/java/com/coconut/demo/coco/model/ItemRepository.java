package com.coconut.demo.coco.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long>{
    Item getItemByName(String name);
}
