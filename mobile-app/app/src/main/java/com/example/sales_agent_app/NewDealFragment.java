package com.example.sales_agent_app;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import androidx.fragment.app.Fragment;

public class NewDealFragment extends Fragment {

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_new_deal, container, false);

        Button btnRent = view.findViewById(R.id.btnRent);

        btnRent.setOnClickListener(v -> {
            // Navigate to the next step: Owner Info Form
            // We use the parent FragmentManager to swap this fragment
            getParentFragmentManager().beginTransaction()
                    .replace(R.id.fragment_container, new OwnerInfoFragment())
                    .addToBackStack(null)
                    .commit();
        });

        return view;
    }
}