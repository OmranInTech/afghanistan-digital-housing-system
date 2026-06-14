package com.example.sales_agent_app;

import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

// These imports must match your actual package structure
import com.example.sales_agent_app.api.AuthService;
import com.example.sales_agent_app.model.LoginRequest;

// These are the imports that were failing
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {

    private EditText etEmail, etPassword, etGovCode;
    private Button btnSignIn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        etEmail = findViewById(R.id.etEmail);
        etPassword = findViewById(R.id.etPassword);
        etGovCode = findViewById(R.id.etGovCode);
        btnSignIn = findViewById(R.id.btnSignIn);

        btnSignIn.setOnClickListener(v -> performLogin());
    }

    private void performLogin() {
        String email = etEmail.getText().toString().trim();
        String password = etPassword.getText().toString().trim();
        String govCode = etGovCode.getText().toString().trim();

        if (email.isEmpty() || password.isEmpty() || govCode.isEmpty()) {
            Toast.makeText(this, "Please fill all fields", Toast.LENGTH_SHORT).show();
            return;
        }

        // Setup Retrofit
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://10.0.2.2:8000/") // 10.0.2.2 is the special IP for Android Emulator to hit localhost
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        AuthService authService = retrofit.create(AuthService.class);
        LoginRequest request = new LoginRequest(email, password, govCode);

        // Execute Request
        authService.login(request).enqueue(new Callback<Object>() {
            @Override
            public void onResponse(Call<Object> call, Response<Object> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(MainActivity.this, "Login Successful", Toast.LENGTH_SHORT).show();
                    // NAVIGATE TO NEXT ACTIVITY HERE
                } else {
                    Toast.makeText(MainActivity.this, "Login Failed: " + response.code(), Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Object> call, Throwable t) {
                Toast.makeText(MainActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }
}