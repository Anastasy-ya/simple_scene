import React from "react";
import { Form, InputNumber, Button, Switch, Space } from "antd";
import { saveParameters, saveTheme } from "../Services/Api";

interface ParametersFormProps {
  setParameters: (params: {
    width: number;
    height: number;
    depth: number;
  }) => void;
  setTheme: (theme: string) => void;
  theme: string;
  initialValues: { width: number; height: number; depth: number };
  dataReceived: boolean;
}

const ParametersForm: React.FC<ParametersFormProps> = ({
  setParameters,
  setTheme,
  theme,
  initialValues,
  dataReceived,
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

  const saveParameterseData = (parameters: {
    height: number;
    width: number;
    depth: number;
  }) => {
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

  const onSubmit = (values: {
    height?: number;
    width?: number;
    depth?: number;
  }) => {
    const inputData = {
      height: values.height || initialValues.height,
      width: values.width || initialValues.width,
      depth: values.depth || initialValues.depth,
    };
    saveParameterseData(inputData);
  };

  const onSwitch = (checked: boolean) => {
    const inputData = theme === "light" ? "dark" : "light";
    saveThemeData(inputData);
  };

  console.log(theme, "theme попадает в форму");

  //отрисовка после получения всех данных
  return (
    <>
      {dataReceived ? (
        <Form
          // theme={theme}
          initialValues={initialValues}
          form={form}
          name="basic"
          onFinish={onSubmit}
          autoComplete="off"
          style={{
            width: "auto",
            height: "100%",
            padding: "30px",
          }}
        >
          <Space style={{ marginBottom: 50, color: "gray" }}>
            <span>Тема:</span>
            <Switch
              // defaultChecked
              onChange={onSwitch}
              style={{ background: "gray" }}
            />
          </Space>

          <Form.Item
            label={<span style={{ color: "gray" }}>Width</span>}
            name="width"
          >
            <InputNumber
              min={1}
              max={100}
              style={{ marginLeft: "10px" }}
              className={theme === "dark" ? "dark-input" : "light-input"}
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
              className={theme === "dark" ? "dark-input" : "light-input"}
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
              className={theme === "dark" ? "dark-input" : "light-input"}
            />
          </Form.Item>

          <Form.Item style={{ width: "100%", paddingTop: "20px" }}>
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
      ) : (
        <></>
      )}
    </>
  );
};

export default ParametersForm;
