package com.johndomnicgeorge.projects.gateway.routes;

import org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions;
import org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.RequestPredicate;
import org.springframework.web.servlet.function.RequestPredicates;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

@Configuration
public class Routes {
    private final String LOCALHOST_ADDR = "http://127.0.0.1:";
    private final String PRODUCT_SERVICE_PORT = "8080";
    private final String ORDER_SERVICE_PORT = "8081";
    private final String INVENTORY_SERVICE_PORT = "8082";


    @Bean
    public RouterFunction<ServerResponse> productServiceRoute() {
        return GatewayRouterFunctions.route("product-service")
                .route(RequestPredicates.path("/api/product"), HandlerFunctions.http(LOCALHOST_ADDR + PRODUCT_SERVICE_PORT))
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> orderServiceRoute() {
        return GatewayRouterFunctions.route("order-service")
                .route(RequestPredicates.path("/api/order"), HandlerFunctions.http(LOCALHOST_ADDR + ORDER_SERVICE_PORT))
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> inventoryServiceRoute() {
        return GatewayRouterFunctions.route("inventory-service")
                .route(RequestPredicates.path("/api/inventory"), HandlerFunctions.http(LOCALHOST_ADDR + INVENTORY_SERVICE_PORT))
                .build();
    }
}
