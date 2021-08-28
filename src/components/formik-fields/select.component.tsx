import React, { useMemo, useCallback } from "react";
import { Select, Typography } from "antd";
import { SelectProps, SelectValue } from "antd/lib/select";
import cn from "classnames";

const { Text } = Typography;
const { Option } = Select;

interface SelectFormikProps {
  handleChange: (field: string, value: any) => void;
  name: string;
  data: any[];
  optValue: string;
  optLabel: string;
  error?: string;
  touched?: boolean;
}

export const SelectFormik: React.FC<SelectFormikProps &
  Omit<SelectProps, "onChange">> = ({
  error,
  touched,
  handleChange,
  name,
  data,
  optValue,
  optLabel,
  ...props
}) => {
  const isError = useMemo(() => Boolean(error) && touched, [
    error!.length,
    touched
  ]);
  const wrapperClasses = cn({
    "has-error": isError
  });

  const onChange = useCallback((value: SelectValue) => {
    handleChange(name, value);
  }, []);

  const renderOptions = useCallback((option: any) => {
    return (
      <Option value={option[optValue]} key={option[optValue]}>
        {option[optLabel]}
      </Option>
    );
  }, []);

  return (
    <div className={wrapperClasses}>
      <Select {...props} onChange={onChange}>
        {data.map(renderOptions)}
      </Select>
      {isError && <Text type="danger">{error}</Text>}
    </div>
  );
};

SelectFormik.defaultProps = {
  error: "",
  touched: false
};
