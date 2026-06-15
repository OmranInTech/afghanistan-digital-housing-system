package com.example.sales_agent_app;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import com.google.android.material.bottomnavigation.BottomNavigationView;

public class DashboardActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);

        BottomNavigationView bottomNav = findViewById(R.id.bottom_navigation);

        // 1. Safety check to ensure bottomNav was found in XML
        if (bottomNav != null) {
            // Set default fragment
            if (savedInstanceState == null) {
                getSupportFragmentManager().beginTransaction()
                        .replace(R.id.fragment_container, new HomeFragment())
                        .commit();
            }

            bottomNav.setOnItemSelectedListener(item -> {
                Fragment selectedFragment = null;
                int id = item.getItemId();

                // Using switch for better readability
                if (id == R.id.nav_home) {
                    selectedFragment = new HomeFragment();
                } else if (id == R.id.nav_new_deal) {
                    selectedFragment = new NewDealFragment();
                } else if (id == R.id.nav_pending) {
                    selectedFragment = new PendingFragment();
                } else if (id == R.id.nav_notif) {
                    selectedFragment = new NotificationFragment();
                } else if (id == R.id.nav_profile) {
                    selectedFragment = new ProfileFragment();
                }

                if (selectedFragment != null) {
                    getSupportFragmentManager().beginTransaction()
                            .replace(R.id.fragment_container, selectedFragment)
                            .commit();
                    return true; // Return true to show the item as selected
                }
                return false;
            });
        }
    }
}