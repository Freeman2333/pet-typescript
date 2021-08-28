import React, { useCallback, useMemo } from "react";
import { DatePickerProps } from "antd/lib/date-picker/interface";
import { DatePicker, Typography } from "antd";
import { Moment } from "moment";
import cn from "classnames";

const { Text } = Typography;

interface DatePickerFormikProps {
  handleChange: (field: string, value: Moment | null) => void;
  error?: string;
  touched?: boolean;
}

export const DatePickerFormik: React.FC<DatePickerFormikProps &
  Omit<DatePickerProps, "onChange">> = ({
  handleChange,
  error,
  touched,
  ...props
}) => {
  const onChange = useCallback((date: Moment | null, dateString: string) => {
    handleChange(props.name!, date);
  }, []);

  const isError = useMemo(() => Boolean(error) && touched, [
    error!.length,
    touched
  ]);
  const wrapperClasses = cn({
    "has-error": isError
  });

  return (
    <div className={wrapperClasses}>
      <DatePicker {...props} onChange={onChange} />
      {isError && <Text type="danger">{error}</Text>}
    </div>
  );
};

DatePickerFormik.defaultProps = {
  error: "",
  touched: false
};
