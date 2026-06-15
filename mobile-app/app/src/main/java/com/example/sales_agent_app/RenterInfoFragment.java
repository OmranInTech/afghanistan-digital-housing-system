package com.example.sales_agent_app;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.TextView;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import com.google.android.material.textfield.TextInputEditText;

public class RenterInfoFragment extends Fragment {

    private String selectedRenterPhotoUri = "";

    public RenterInfoFragment() { super(R.layout.fragment_renter_info); }

    private final ActivityResultLauncher<Intent> pickFileLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(), result -> {
                if (result.getResultCode() == Activity.RESULT_OK && result.getData() != null) {
                    Uri uri = result.getData().getData();
                    if (uri != null) {
                        requireContext().getContentResolver().takePersistableUriPermission(uri, Intent.FLAG_GRANT_READ_URI_PERMISSION);
                        selectedRenterPhotoUri = uri.toString();
                        if (getView() != null) {
                            TextView tvFileName = getView().findViewById(R.id.RenRenterTvFileName);
                            tvFileName.setText("Photo Selected Successfully");
                        }
                    }
                }
            });

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        DealViewModel viewModel = new ViewModelProvider(requireActivity()).get(DealViewModel.class);

        // Bind UI Elements with RenRenter prefix
        Button btnChooseFile = view.findViewById(R.id.RenRenterBtnChooseFile);
        TextInputEditText etFullName = view.findViewById(R.id.RenRenterEtFullName);
        TextInputEditText etFatherName = view.findViewById(R.id.RenRenterEtFatherName);
        TextInputEditText etGrandfatherName = view.findViewById(R.id.RenRenterEtGrandfatherName);
        AutoCompleteTextView actvGender = view.findViewById(R.id.RenRenterActvGender);
        TextInputEditText etPhone = view.findViewById(R.id.RenRenterEtPhone);
        TextInputEditText etEmail = view.findViewById(R.id.RenRenterEtEmail);
        TextInputEditText etNationalId = view.findViewById(R.id.RenRenterEtNationalId);
        TextInputEditText etOriginProv = view.findViewById(R.id.RenRenterEtOriginProv);
        TextInputEditText etOriginDist = view.findViewById(R.id.RenRenterEtOriginDist);
        TextInputEditText etOriginVillage = view.findViewById(R.id.RenRenterEtOriginVillage);
        TextInputEditText etResProv = view.findViewById(R.id.RenRenterEtResProv);
        TextInputEditText etResDist = view.findViewById(R.id.RenRenterEtResDist);
        TextInputEditText etResVillage = view.findViewById(R.id.RenRenterEtResVillage);
        TextInputEditText etGpsCoords = view.findViewById(R.id.RenRenterEtGpsCoords);
        Button btnNext = view.findViewById(R.id.RenRenterBtnNext);

        // Setup Gender Dropdown
        String[] genders = {"Male", "Female", "Other"};
        actvGender.setAdapter(new ArrayAdapter<>(requireContext(), android.R.layout.simple_dropdown_item_1line, genders));

        // File Picker
        btnChooseFile.setOnClickListener(v -> {
            Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
            intent.setType("image/*");
            intent.addCategory(Intent.CATEGORY_OPENABLE);
            pickFileLauncher.launch(Intent.createChooser(intent, "Select Renter Photo"));
        });

        // Navigation
        btnNext.setOnClickListener(v -> {
            viewModel.renterPhotoUri = selectedRenterPhotoUri;
            viewModel.renterFullName = etFullName.getText().toString();
            viewModel.renterFatherName = etFatherName.getText().toString();
            viewModel.renterGrandfatherName = etGrandfatherName.getText().toString();
            viewModel.renterGender = actvGender.getText().toString();
            viewModel.renterPhone = etPhone.getText().toString();
            viewModel.renterEmail = etEmail.getText().toString();
            viewModel.renterNationalId = etNationalId.getText().toString();
            viewModel.renterOriginProv = etOriginProv.getText().toString();
            viewModel.renterOriginDist = etOriginDist.getText().toString();
            viewModel.renterOriginVillage = etOriginVillage.getText().toString();
            viewModel.renterResProv = etResProv.getText().toString();
            viewModel.renterResDist = etResDist.getText().toString();
            viewModel.renterResVillage = etResVillage.getText().toString();
            viewModel.renterGpsLocation = etGpsCoords.getText().toString();

            getParentFragmentManager().beginTransaction()
                    .replace(R.id.fragment_container, new PropertyInfoFragment())
                    .addToBackStack(null).commit();
        });
    }
}