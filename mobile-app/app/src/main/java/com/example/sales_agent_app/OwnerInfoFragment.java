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

public class OwnerInfoFragment extends Fragment {

    private String selectedPhotoUri = "";

    public OwnerInfoFragment() { super(R.layout.fragment_owner_info); }

    private final ActivityResultLauncher<Intent> pickFileLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(), result -> {
                if (result.getResultCode() == Activity.RESULT_OK && result.getData() != null) {
                    Uri uri = result.getData().getData();
                    if (uri != null) {
                        requireContext().getContentResolver().takePersistableUriPermission(uri, Intent.FLAG_GRANT_READ_URI_PERMISSION);
                        selectedPhotoUri = uri.toString();
                        if (getView() != null) {
                            TextView tvFileName = getView().findViewById(R.id.RenOwnerTvFileName);
                            tvFileName.setText("Photo Selected Successfully");
                        }
                    }
                }
            });

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        DealViewModel viewModel = new ViewModelProvider(requireActivity()).get(DealViewModel.class);

        // Bind UI elements with updated RenOwner IDs
        Button btnChooseFile = view.findViewById(R.id.RenOwnerBtnChooseFile);
        TextInputEditText etFullName = view.findViewById(R.id.RenOwnerEtFullName);
        TextInputEditText etFatherName = view.findViewById(R.id.RenOwnerEtFatherName);
        TextInputEditText etGrandfatherName = view.findViewById(R.id.RenOwnerEtGrandfatherName);
        AutoCompleteTextView actvGender = view.findViewById(R.id.RenOwnerActvGender);
        TextInputEditText etPhone = view.findViewById(R.id.RenOwnerEtPhone);
        TextInputEditText etEmail = view.findViewById(R.id.RenOwnerEtEmail);
        TextInputEditText etNationalId = view.findViewById(R.id.RenOwnerEtNationalId);
        TextInputEditText etOriginProv = view.findViewById(R.id.RenOwnerEtOriginProv);
        TextInputEditText etOriginDist = view.findViewById(R.id.RenOwnerEtOriginDist);
        TextInputEditText etOriginVillage = view.findViewById(R.id.RenOwnerEtOriginVillage);
        TextInputEditText etResProv = view.findViewById(R.id.RenOwnerEtResProv);
        TextInputEditText etResDist = view.findViewById(R.id.RenOwnerEtResDist);
        TextInputEditText etResVillage = view.findViewById(R.id.RenOwnerEtResVillage);
        TextInputEditText etGpsCoords = view.findViewById(R.id.RenOwnerEtGpsCoords);
        Button btnNext = view.findViewById(R.id.RenOwnerBtnNext);

        String[] genders = {"Male", "Female", "Other"};
        actvGender.setAdapter(new ArrayAdapter<>(requireContext(), android.R.layout.simple_dropdown_item_1line, genders));

        btnChooseFile.setOnClickListener(v -> {
            Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
            intent.setType("image/*");
            intent.addCategory(Intent.CATEGORY_OPENABLE);
            pickFileLauncher.launch(Intent.createChooser(intent, "Select Owner Photo"));
        });

        btnNext.setOnClickListener(v -> {
            viewModel.ownerPhotoUri = selectedPhotoUri;
            viewModel.ownerFullName = etFullName.getText().toString();
            viewModel.ownerFatherName = etFatherName.getText().toString();
            viewModel.ownerGrandfatherName = etGrandfatherName.getText().toString();
            viewModel.ownerGender = actvGender.getText().toString();
            viewModel.ownerPhone = etPhone.getText().toString();
            viewModel.ownerEmail = etEmail.getText().toString();
            viewModel.ownerNationalId = etNationalId.getText().toString();
            viewModel.ownerOriginProv = etOriginProv.getText().toString();
            viewModel.ownerOriginDist = etOriginDist.getText().toString();
            viewModel.ownerOriginVillage = etOriginVillage.getText().toString();
            viewModel.ownerResProv = etResProv.getText().toString();
            viewModel.ownerResDist = etResDist.getText().toString();
            viewModel.ownerResVillage = etResVillage.getText().toString();
            viewModel.ownerGpsLocation = etGpsCoords.getText().toString();

            getParentFragmentManager().beginTransaction()
                    .replace(R.id.fragment_container, new RenterInfoFragment())
                    .addToBackStack(null).commit();
        });
    }
}