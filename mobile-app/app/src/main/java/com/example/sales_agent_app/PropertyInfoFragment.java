package com.example.sales_agent_app;

import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import com.google.android.material.textfield.TextInputEditText;

public class PropertyInfoFragment extends Fragment {

    public PropertyInfoFragment() { super(R.layout.fragment_property_info); }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        DealViewModel viewModel = new ViewModelProvider(requireActivity()).get(DealViewModel.class);

        // Bindings
        AutoCompleteTextView actvType = view.findViewById(R.id.RenPrActvType);
        TextInputEditText etProv = view.findViewById(R.id.RenPrEtProv), etDist = view.findViewById(R.id.RenPrEtDist), etVillage = view.findViewById(R.id.RenPrEtVillage), etAddress = view.findViewById(R.id.RenPrEtAddress), etCoords = view.findViewById(R.id.RenPrEtCoords);
        TextInputEditText etLand = view.findViewById(R.id.RenPrEtLandArea), etBuild = view.findViewById(R.id.RenPrEtBuildArea);
        TextInputEditText etFloors = view.findViewById(R.id.RenPrEtFloors), etRooms = view.findViewById(R.id.RenPrEtRooms), etBeds = view.findViewById(R.id.RenPrEtBedrooms), etBaths = view.findViewById(R.id.RenPrEtBathrooms), etKitchens = view.findViewById(R.id.RenPrEtKitchens);
        TextInputEditText etNorth = view.findViewById(R.id.RenPrEtBoundNorth), etSouth = view.findViewById(R.id.RenPrEtBoundSouth), etEast = view.findViewById(R.id.RenPrEtBoundEast), etWest = view.findViewById(R.id.RenPrEtBoundWest);
        TextInputEditText etYear = view.findViewById(R.id.RenPrEtConstYear), etElec = view.findViewById(R.id.RenPrEtElecMeter), etWater = view.findViewById(R.id.RenPrEtWaterMeter);
        Button btnSubmit = view.findViewById(R.id.RenPrBtnSubmit);

        // Dropdown setup
        String[] types = {"House", "Apartment", "Commercial", "Land"};
        actvType.setAdapter(new ArrayAdapter<>(requireContext(), android.R.layout.simple_dropdown_item_1line, types));

        btnSubmit.setOnClickListener(v -> {
            viewModel.propType = actvType.getText().toString();
            viewModel.propProv = etProv.getText().toString();
            viewModel.propDist = etDist.getText().toString();
            viewModel.propVillage = etVillage.getText().toString();
            viewModel.propAddress = etAddress.getText().toString();
            viewModel.propCoords = etCoords.getText().toString();
            viewModel.propLandArea = etLand.getText().toString();
            viewModel.propBuildArea = etBuild.getText().toString();
            viewModel.propFloors = etFloors.getText().toString();
            viewModel.propRooms = etRooms.getText().toString();
            viewModel.propBedrooms = etBeds.getText().toString();
            viewModel.propBathrooms = etBaths.getText().toString();
            viewModel.propKitchens = etKitchens.getText().toString();
            viewModel.propNorth = etNorth.getText().toString();
            viewModel.propSouth = etSouth.getText().toString();
            viewModel.propEast = etEast.getText().toString();
            viewModel.propWest = etWest.getText().toString();
            viewModel.propConstYear = etYear.getText().toString();
            viewModel.propElecMeter = etElec.getText().toString();
            viewModel.propWaterMeter = etWater.getText().toString();

            Toast.makeText(getContext(), "Deal Finalized!", Toast.LENGTH_SHORT).show();
        });
    }
}