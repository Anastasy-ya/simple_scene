import React, { useState } from 'react';
import { Form, Input, Button, Switch, Space } from 'antd';

const ParametersForm = ({setParameters}) => {
  const [form] = Form.useForm();
  const [theme, setTheme] = useState('light');

  // Функция, которая срабатывает при успешной отправке формы
  const onSubmit = (values) => {
    console.log( values.Width, values.Height, values.Length)
    setParameters({ width: values.Width, height: values.Height, depth: values.Length })
  };

  // Функция для смены темы
  const changeTheme = (checked) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onSubmit}  // Обработчик события отправки формы
      autoComplete="off"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <Space style={{ marginBottom: 16 }}>
        <span>Тема:</span>
        <Switch checked={theme === 'dark'} onChange={changeTheme} />
      </Space>

      <Form.Item
        label="Height"
        name="Height"
        rules={[{
          required: true,
          message: 'Введите только числа!',
          type: 'number', // Правило: только числа
          transform: value => Number(value), // Преобразование значения в число
        }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Width"
        name="Width"
        rules={[{
          required: true,
          message: 'Введите только числа!',
          type: 'number',
          transform: value => Number(value),
        }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Length"
        name="Length"
        rules={[{
          required: true,
          message: 'Введите только числа!',
          type: 'number',
          transform: value => Number(value),
        }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ width: '100%' }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: '100%' }}
          block
        >
          Calculate
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ParametersForm;
