import React, { useMemo, useCallback } from "react";
import { InputNumber, Typography } from "antd";
import cn from "classnames";
import { InputNumberProps } from "antd/lib/input-number";

const { Text } = Typography;

interface InputNumberFormikProps {
  error?: string;
  touched?: boolean;
  onChange: (field: string, value: any) => void;
  fullWidth?: boolean;
}

export const InputNumberFormik: React.FC<InputNumberFormikProps &
  Omit<InputNumberProps, "onChange">> = ({
  error,
  touched,
  onChange,
  fullWidth,
  ...props
}) => {
  const isError = useMemo(() => Boolean(error) && touched, [
    error!.length,
    touched
  ]);
  const wrapperClasses = useMemo(() => {
    return cn({
      "has-error": isError
    });
  }, [isError]);

  const handleChange = useCallback((value?: number) => {
    onChange(props.name!, value);
  }, []);

  return (
    <div className={wrapperClasses}>
      <InputNumber
        {...props}
        onChange={handleChange}
        style={fullWidth ? { width: "100%" } : {}}
      />
      {isError && <Text type="danger">{error}</Text>}
    </div>
  );
};

InputNumberFormik.defaultProps = {
  error: "",
  touched: false,
  fullWidth: false
};
