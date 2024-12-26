import { FormLabel } from "@/components/ui/form";
import React from "react";

const RequiredFormLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <FormLabel className='text-primary'>
    {children} <span className='text-red-500'>*</span>
  </FormLabel>
);

export default RequiredFormLabel;
