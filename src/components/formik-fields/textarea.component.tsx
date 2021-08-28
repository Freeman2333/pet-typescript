import React, { useMemo } from "react";
import { TextAreaProps } from "antd/lib/input";
import { Input, Typography } from "antd";
import cn from "classnames";

const { Text } = Typography;
const { TextArea } = Input;

interface TextAreaFormikProps {
  error?: string;
  touched?: boolean;
}

export const TextAreaFormik: React.FC<TextAreaFormikProps & TextAreaProps> = ({
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
      <TextArea {...props} />
      {isError && <Text type="danger">{error}</Text>}
    </div>
  );
};

TextAreaFormik.defaultProps = {
  error: "",
  touched: false
};
