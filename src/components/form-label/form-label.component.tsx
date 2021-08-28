import React from "react";
import { Typography } from "antd";

export const FormLabel: React.FC = ({ children }) => (
  <Typography style={{ marginBottom: 8, marginTop: 16, fontWeight: "bold" }}>
    {children}
  </Typography>
);
