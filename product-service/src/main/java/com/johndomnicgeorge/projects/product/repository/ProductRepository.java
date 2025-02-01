package com.johndomnicgeorge.projects.product.repository;

import com.johndomnicgeorge.projects.product.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, String> {
}
