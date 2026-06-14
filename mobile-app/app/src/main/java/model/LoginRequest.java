package com.example.sales_agent_app.model;

public class LoginRequest {
    private String email;
    private String password;
    private String auth_code;

    public LoginRequest(String email, String password, String auth_code) {
        this.email = email;
        this.password = password;
        this.auth_code = auth_code;
    }
}