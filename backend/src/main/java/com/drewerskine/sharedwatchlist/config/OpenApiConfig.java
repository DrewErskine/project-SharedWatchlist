package com.drewerskine.sharedwatchlist.config;

import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Shared Watchlist API")
                        .version("1.0")
                        .description("API for managing shared watchlists for movies and TV shows")
                        .contact(new Contact()
                                .name("Drew Erskine")
                                .email("drew@example.com")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080")
                                .description("Local ENV")))
                .schemaRequirement("bearerAuth",
                        new SecurityScheme()
                                .name("bearerAuth")
                                .description("JWT auth description")
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT"))
                .security(List.of(
                        new SecurityRequirement().addList("bearerAuth")));
    }
}
