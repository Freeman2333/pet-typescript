import React, { useMemo } from "react";
import { InputProps } from "antd/lib/input";
import { Input, Typography } from "antd";
import cn from "classnames";

const { Text } = Typography;

interface InputFormikProps {
  error?: string;
  touched?: boolean;
}

export const InputFormik: React.FC<InputFormikProps & InputProps> = ({
  error,
  touched,
  ...props
}) => {
  const isError = useMemo(() => Boolean(error) && touched, [
    error!.length,
    touched
  ]);
  const wrapperClasses = cn({
    "has-error": isError
  });

  return (
    <div className={wrapperClasses}>
      <Input {...props} />
      {isError && <Text type="danger">{error}</Text>}
    </div>
  );
};

InputFormik.defaultProps = {
  error: "",
  touched: false
};
