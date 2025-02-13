package com.johndomnicgeorge.projects.order.service;

import com.johndomnicgeorge.projects.order.client.InventoryClient;
import com.johndomnicgeorge.projects.order.dto.OrderRequest;
import com.johndomnicgeorge.projects.order.model.Order;
import com.johndomnicgeorge.projects.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final InventoryClient inventoryClient;

    public void placeOrder(OrderRequest orderRequest) {
        var isProductInStock = inventoryClient.isInStock(orderRequest.skuCode(), orderRequest.quantity());
        if (isProductInStock) {
            Order order = Order.builder()
                    .orderNumber(UUID.randomUUID().toString())
                    .price(orderRequest.price())
                    .skuCode(orderRequest.skuCode())
                    .quantity(orderRequest.quantity())
                    .build();
            orderRepository.save(order);
        } else {
            throw new RuntimeException("Product with SkuCode " + orderRequest.skuCode() + " is not in stock.");
        }
    }
}
