import React from "react";
import { Form, InputNumber, Button, Switch, Space } from "antd";
import { saveParameters, saveTheme} from "../Services/Api";

interface ParametersFormProps {
  setParameters: (parameters: any) => void; // замените `any` на более конкретный тип
  setTheme: (theme: string) => void;
  theme: string;
  initialValues: {
    height: number;
    width: number;
    depth: number;
  };
}

const ParametersForm: React.FC<ParametersFormProps> = ({
  setParameters,
  setTheme,
  theme,
  initialValues,
}) => {
  const [form] = Form.useForm();

  const saveThemeData = (newTheme: string) => {
    saveTheme({ theme: newTheme })
      .then((response) => {
        console.log(response, "Theme saved");
        console.log(newTheme, "newTheme");
        setTheme(newTheme);
        localStorage.setItem("theme", JSON.stringify(newTheme));
      })
      .catch((err) => {
        console.error("Ошибка при сохранении темы:", err);
      });
  };

  const saveParameterseData = (parameters: { height: number; width: number; depth: number }) => {
    saveParameters(parameters)
      .then((response) => {
        console.log(response, "Parameters saved");
        setParameters(parameters);
        localStorage.setItem("parameters", JSON.stringify(parameters));
      })
      .catch((err) => {
        console.error("Ошибка при сохранении параметров:", err);
      });
  };

  const onSubmit = (values: { height?: number; width?: number; depth?: number }) => {
    const inputData = {
      height: values.height || initialValues.height,
      width: values.width || initialValues.width,
      depth: values.depth || initialValues.depth,
    };
    saveParameterseData(inputData);
  };

  const onSwitch = (checked: boolean) => {
    const inputData = theme === "light" ? "dark" : "light";
    setTheme(inputData);
    localStorage.setItem("theme", JSON.stringify(inputData));
    saveThemeData(inputData);
  };

  return (
    <Form
      initialValues={initialValues}
      form={form}
      name="basic"
      onFinish={onSubmit}
      autoComplete="off"
      style={{
        width: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <Space style={{ marginBottom: 50, color: "gray" }}>
        <span>Тема:</span>
        <Switch defaultChecked onChange={onSwitch} style={{ background: "gray" }} />
      </Space>


      <Form.Item
        label={<span style={{ color: "gray" }}>Width</span>}
        name="width"
      >
        <InputNumber
          min={1}
          max={100}
          style={{ marginLeft: "10px" }}
        />
      </Form.Item>

      <Form.Item
        label={<span style={{ color: "gray" }}>Height</span>}
        name="height"
      >
        <InputNumber
          min={1}
          max={100}
          style={{ marginLeft: "10px" }}
        />
      </Form.Item>

      <Form.Item
        label={<span style={{ color: "gray" }}>Length</span>}
        name="depth"
      >
        <InputNumber
          min={1}
          max={100}
          style={{ marginLeft: "10px" }}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{ width: "100%" }}
        theme={theme}
      >
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          block
        >
          Calculate
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ParametersForm;