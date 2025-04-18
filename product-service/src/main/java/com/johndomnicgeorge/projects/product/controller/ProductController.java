package com.johndomnicgeorge.projects.product.controller;

import com.johndomnicgeorge.projects.product.dto.ProductRequest;
import com.johndomnicgeorge.projects.product.dto.ProductResponse;
import com.johndomnicgeorge.projects.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductResponse createProduct(@RequestBody ProductRequest productRequest) {
        return productService.createProduct(productRequest);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponse> getAllProducts() {
        // Uncomment the thread below to test Resilience4j Timeouts
        /*
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        */
        return productService.getAllProducts();
    }
}
