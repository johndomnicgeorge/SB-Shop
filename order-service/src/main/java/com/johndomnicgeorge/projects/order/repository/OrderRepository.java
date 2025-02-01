package com.johndomnicgeorge.projects.order.repository;

import com.johndomnicgeorge.projects.order.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
