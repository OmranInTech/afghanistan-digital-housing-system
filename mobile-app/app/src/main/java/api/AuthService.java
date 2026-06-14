package com.example.sales_agent_app.api;

import com.example.sales_agent_app.model.LoginRequest;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface AuthService {
    @POST("api/v1/auth/login/")
    Call<Object> login(@Body LoginRequest request);
}