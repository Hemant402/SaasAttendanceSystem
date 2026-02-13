        import { useState, useEffect } from "react";
        import {Card, CardContent, TextField, Button,
          Typography,
          Box,
          Select,
          FormControl,
          InputLabel,
          MenuItem,
          Checkbox,
          FormControlLabel,
        } from "@mui/material";
        import http from "../../api/http";
        import { API } from "../../api/endpoints";
        import AppSnackbar from "../../components/AppSnackbar";

        export default function CreateOffice() {
          const [form, setForm] = useState({
              officeNameEng: "",
              officeNameNep: "",
              adminName: "",
              adminMobile: "",
              officeAdminPost: "",
              contactEmail: "",
              wardNumber: "",
              tole: "",
              province: "",
              district: "",
              localArea: "",
              password: "",
              allowBranch: false,
              logoFile: null,
          });

          const [errors, setErrors] = useState({});
          const [loading, setLoading] = useState(false);
          const [logoPreview, setLogoPreview] = useState(null);
          const [districts, setDistricts] = useState([]);
          const [localAreas, setLocalAreas] = useState([]);

          const [snack, setSnack] = useState({
            open: false,
            message: "",
            severity: "success",
          });

             const provinces = ["Bagmati Pradesh","Gandaki Pradesh","Karnali Pradesh","Koshi Pradesh","Lumbini Pradesh",
                 "Madhesh Pradesh","Sudurpashchim Pradesh",];


          // ---------------- VALIDATION ----------------
          const validate = () => {
            const newErrors = {};

            if (!form.officeNameEng.trim())
              newErrors.officeNameEng = "Office name is required";

             if (!form.officeNameNep.trim())
              newErrors.officeNameNep = "कार्यालयको नाम आवश्यक छ";

            if (!form.adminName.trim())
              newErrors.adminName = "Admin name is required";

            if (!form.adminMobile.trim())
              newErrors.adminMobile = "Mobile number is required";
            else if (!/^\d{10}$/.test(form.adminMobile))
              newErrors.adminMobile = "Enter valid 10-digit mobile number";

            if (!form.password)
              newErrors.password = "Password is required";
            else if (form.password.length < 6)
              newErrors.password = "Password must be at least 6 characters";
            if (!form.province)
                newErrors.province = "Province is required";
            if (!form.district)
              newErrors.district = "District is required";

            if (!form.localArea)
              newErrors.localArea = "Local area is required";
            if (!form.officeAdminPost.trim())
            newErrors.officeAdminPost = "Admin post is required";
            if (!form.contactEmail.trim())
              newErrors.contactEmail = "Email is required";
            else if (!/^\S+@\S+\.\S+$/.test(form.contactEmail))
              newErrors.contactEmail = "Enter valid email";
            if (!form.wardNumber)
              newErrors.wardNumber = "Ward number is required";
            else if (!Number.isInteger(Number(form.wardNumber)))
              newErrors.wardNumber = "Ward number must be an integer";
            if (!form.tole.trim())
              newErrors.tole = "Tole is required";


            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
          };

                const handleChange = (e) => {
                  const { name, value, type, checked } = e.target;

                  if (type === "checkbox") {
                    setForm((prev) => ({
                      ...prev,
                      [name]: checked,
                    }));
                  }
                  else if (name === "province") {
                    setForm((prev) => ({
                      ...prev,
                      province: value,
                      district: "",
                      localArea: "",
                    }));
                    setDistricts([]);
                    setLocalAreas([]);
                  }
                  else if (name === "district") {
                    setForm((prev) => ({
                      ...prev,
                      district: value,
                      localArea: "",
                    }));
                    setLocalAreas([]);
                  }
                  else {
                    setForm((prev) => ({
                      ...prev,
                      [name]: value,
                    }));
                  }

                  setErrors((prev) => ({ ...prev, [name]: "" }));
                };

                useEffect(() => {
                  if (!form.province) return;

                  const fetchDistricts = async () => {
                    try {
                      const res = await http.get(
                        API.GET_DISTRICTS(encodeURIComponent(form.province))
                      );
                      setDistricts(Array.isArray(res.data) ? res.data : []);
                      console.log("District response:", res.data);
                    } catch (error) {
                      console.error("Failed to fetch districts");
                      setDistricts([]);
                    }
                  };

                  fetchDistricts();
                }, [form.province]);

                useEffect(() => {
                  if (!form.district) return;

                  const fetchLocalAreas = async () => {
                    try {
                      const res = await http.get(
                        API.GET_LOCAL_AREAS(encodeURIComponent(form.district))

                      );
                      setLocalAreas(Array.isArray(res.data) ? res.data : []);
                      console.log("District response:", res.data);
                    } catch (error) {
                      console.error("Failed to fetch local areas");
                      setLocalAreas([]);
                    }
                  };

                  fetchLocalAreas();
                }, [form.district]);

          const handleFileChange = (e) => {
              const file = e.target.files[0];
              if (!file) return;

              setForm((prev) => ({
                ...prev,
                logoFile: file,
              }));

              setErrors((prev) => ({ ...prev, logoFile: "" }));

              // Create preview URL
              const previewUrl = URL.createObjectURL(file);
              setLogoPreview(previewUrl);
            };


//           const handleSubmit = async () => {
//             if (!validate()) return;
//
//             try {
//               setLoading(true);
//
//               const payload = new FormData();
//               payload.append("OfficeNameEng", form.officeNameEng);
//               payload.append("OfficeNameNep", form.officeNameNep);
//               payload.append("Province", form.province);
//               payload.append("District", form.district);
//               payload.append("LocalBody", form.localArea);
//               payload.append("WardNumber", Number(form.wardNumber));
//               payload.append("Tole", form.tole);
//               payload.append("OfficeAdminName", form.adminName);
//               payload.append("OfficeAdminPost", form.officeAdminPost);
//               payload.append("AdminMobile", form.adminMobile);
//               payload.append("ContactEmail", form.contactEmail);
//               payload.append("Password", form.password);
//               payload.append("AllowBranch", form.allowBranch? "true" : "false");
//               payload.append("Logo", form.logoFile);
//               for (let pair of payload.entries()) {
//                   console.log(pair[0], pair[1]);
//                 }
//               await http.post(API.CREATE_OFFICE, payload);
//
//               setSnack({
//                 open: true,
//                 message: "Office सफलतापूर्वक सिर्जना भयो",
//                 severity: "success",
//               });
//
//               setForm({
//                   officeNameEng: "",
//                   officeNameNep: "",
//                   adminName: "",
//                   adminMobile: "",
//                   officeAdminPost: "",
//                   contactEmail: "",
//                   wardNumber: "",
//                   tole: "",
//                   province: "",
//                   district: "",
//                   localArea: "",
//                   password: "",
//                   allowBranch: false,
//                   logoFile: null,
//               });
//             setDistricts([]);
//             setLocalAreas([]);
//             } catch (err) {
//               setSnack({
//                 open: true,
//                 message: "Office सिर्जना गर्न असफल भयो",
//                 severity: "error",
//               });
//             } finally {
//               setLoading(false);
//             }
//           };
            const handleSubmit = async () => {
  if (!validate()) return;

  try {
    setLoading(true);
    const payload = new FormData();

    // Key हरूलाई Backend DTO को Property Name सँग हुबहु मिलाउनुहोस्
    payload.append("OfficeNameEng", form.officeNameEng);
    payload.append("OfficeNameNep", form.officeNameNep);
    payload.append("Province", form.province);
    payload.append("District", form.district);

    // यहाँ "LocalBody" हुनुपर्छ (DTO अनुसार)
    payload.append("LocalBody", form.localArea);

    payload.append("WardNumber", Number(form.wardNumber));
    payload.append("Tole", form.tole);

    // यहाँ "OfficeAdminName" हुनुपर्छ (DTO अनुसार)
    payload.append("OfficeAdminName", form.adminName);

    payload.append("OfficeAdminPost", form.officeAdminPost);
    payload.append("AdminMobile", form.adminMobile);
    payload.append("ContactEmail", form.contactEmail);
    payload.append("Password", form.password);

    // Boolean लाई string "true"/"false" पठाउँदा FromForm ले राम्रोसँग बुझ्छ
    payload.append("AllowBranch", form.allowBranch ? "true" : "false");

    // File Key "Logo" हुनुपर्छ (DTO अनुसार)
    payload.append("Logo", form.logoFile);
    for (let pair of payload.entries()) {
  console.log(pair[0], pair[1]);
}
    await http.post(API.CREATE_OFFICE, payload);
    setSnack({
                open: true,
                message: "Office सफलतापूर्वक सिर्जना भयो",
                severity: "success",
              });
  } catch (err) {
   setSnack({
                open: true,
                message: "Office सिर्जना गर्न असफल भयो",
                severity: "error",
              });
  }
};
          return (
        <Box
          maxWidth="1000px"
          mx="auto"
          px={{ xs: 2, md: 4 }}
          py={4}
        >
          {/* Header */}
          <Box mb={4}>
            <Typography variant="h5" fontWeight={600}>
              Create New Office
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fill in the details below to register a new office.
            </Typography>
          </Box>

          {/* Form Grid */}
          <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
            gap={3}
          >
            <TextField
              label="English Office Name"
              name="officeNameEng"
              fullWidth
              value={form.officeNameEng}
              onChange={handleChange}
              error={!!errors.officeNameEng}
              helperText={errors.officeNameEng}
            />

            <TextField
              label="नेपालीमा कार्यालयको नाम"
              name="officeNameNep"
              fullWidth
              value={form.officeNameNep}
              onChange={handleChange}
              error={!!errors.officeNameNep}
              helperText={errors.officeNameNep}
            />

            <TextField
              label="Admin Name"
              name="adminName"
              fullWidth
              value={form.adminName}
              onChange={handleChange}
              error={!!errors.adminName}
              helperText={errors.adminName}
            />

            <TextField
              label="Admin Mobile"
              name="adminMobile"
              fullWidth
              value={form.adminMobile}
              onChange={handleChange}
              error={!!errors.adminMobile}
              helperText={errors.adminMobile}
            />

            {/* Province */}
            <FormControl fullWidth error={!!errors.province}>
              <InputLabel>Province</InputLabel>
              <Select
                name="province"
                value={form.province || ""}
                label="Province"
                onChange={handleChange}
              >
                {provinces.map((province) => (
                  <MenuItem key={province} value={province}>
                    {province}
                  </MenuItem>
                ))}
              </Select>
              {errors.province && (
                <Typography color="error" variant="caption">
                  {errors.province}
                </Typography>
              )}
            </FormControl>

            {/* District */}
            <FormControl fullWidth error={!!errors.district}>
              <InputLabel>District</InputLabel>
              <Select
                name="district"
                value={form.district || ""}
                label="District"
                onChange={handleChange}
                disabled={!form.province}
              >
                {districts.map((district, index) => (
                  <MenuItem key={index} value={district}>
                    {district}
                  </MenuItem>
                ))}
              </Select>
              {errors.district && (
                <Typography color="error" variant="caption">
                  {errors.district}
                </Typography>
              )}
            </FormControl>

            {/* Local Area */}
            <FormControl fullWidth error={!!errors.localArea}>
              <InputLabel>Local Area</InputLabel>
              <Select
                name="localArea"
                value={form.localArea || ""}
                label="Local Area"
                onChange={handleChange}
                disabled={!form.district}
              >
                {localAreas.map((area) => (
                  <MenuItem key={area.id} value={area.localBody}>
                    {area.localBody} ({area.type})
                  </MenuItem>
                ))}
              </Select>
              {errors.localArea && (
                <Typography color="error" variant="caption">
                  {errors.localArea}
                </Typography>
              )}
            </FormControl>

        <TextField
          label="Ward Number"
          name="wardNumber"
          type="number"
          fullWidth
          value={form.wardNumber}
          onChange={handleChange}
          error={!!errors.wardNumber}
          helperText={errors.wardNumber}
        />

        <TextField
          label="Tole"
          name="tole"
          fullWidth
          value={form.tole}
          onChange={handleChange}
          error={!!errors.tole}
          helperText={errors.tole}
        />

        <TextField
          label="Admin Post"
          name="officeAdminPost"
          fullWidth
          value={form.officeAdminPost}
          onChange={handleChange}
          error={!!errors.officeAdminPost}
          helperText={errors.officeAdminPost}
        />
        <TextField
          label="Contact Email"
          name="contactEmail"
          fullWidth
          value={form.contactEmail}
          onChange={handleChange}
          error={!!errors.contactEmail}
          helperText={errors.contactEmail}
        />
         <TextField
            label="Password"
            type="password"
            name="password"
            fullWidth
            value={form.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
         />
        </Box>
        <Box mt={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={form.allowBranch}
                onChange={handleChange}
                name="allowBranch"
              />
            }
            label="Allow Branch Creation"
        />
        </Box>

            <Box
              mt={5}
              display="flex"
              alignItems="center"
              gap={4}
              flexWrap="wrap"
            >
              {/* Upload Button */}
              <Box>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{ height: 56, px: 4 }}
                >
                  Upload Office Logo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>

                {form.logoFile && (
                  <Typography variant="caption" display="block" mt={1}>
                    {form.logoFile.name}
                  </Typography>
                )}

                {errors.logoFile && (
                  <Typography color="error" variant="caption">
                    {errors.logoFile}
                  </Typography>
                )}
              </Box>

              {/* Preview Box */}
              {logoPreview && (
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fafafa",
                  }}
                >
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              )}
            </Box>


  {/* Submit Button */}
  <Box mt={4}>
    <Button
      variant="contained"
      size="large"
      sx={{ px: 6 }}
      onClick={handleSubmit}
      disabled={loading}
    >
      {loading ? "Creating..." : "Create Office"}
    </Button>
  </Box>

  <AppSnackbar
    {...snack}
    onClose={() => setSnack({ ...snack, open: false })}
  />
</Box>

  );
}
