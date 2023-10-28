import { COLORS } from "@/app/constants/color";
import { CircularProgress } from "@mui/material";
import * as React from "react";

export default function CircularProgressSpinner() {
  return <CircularProgress size={20} sx={{ color: "#fff" }} />;
}
