import React from 'react';
import { Form, InputNumber, Button, Switch, Space } from 'antd';

const ParametersForm = ({ setParameters, setTheme, theme, initialValues }) => {
  const [form] = Form.useForm();

  const onSubmit = (values) => {
    setParameters(
      {
        //если значение не передано, использовать старое
        height: values.Height || initialValues.height,
        width: values.Width || initialValues.width,
        depth: values.Length || initialValues.depth
      }
    );

  };

  const onSwitch = (checked) => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Form
      initialValues={initialValues}  // задаём значения для всех полей
      form={form}
      name='basic'
      onFinish={onSubmit}
      autoComplete='off'
      style={{
        width: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px',
      }}
    >
      <Space style={{ marginBottom: 50, color: 'gray' }}>
        <span>Тема:</span>
        <Switch defaultChecked onChange={onSwitch} style={{ background: 'gray' }} />
      </Space>


      <Form.Item
        label={<span style={{ color: 'gray' }}>Width</span>}
        name='Width'
      >
        <InputNumber
          min={1}
          max={100}
          style={{ marginLeft: '10px' }}
          defaultValue={initialValues.width}
        />
      </Form.Item>

      <Form.Item
        label={<span style={{ color: 'gray' }}>Height</span>}
        name='Height'
      >
        <InputNumber
          min={1}
          max={100}
          style={{ marginLeft: '10px' }}
          defaultValue={initialValues.height}
        />
      </Form.Item>

      <Form.Item
        label={<span style={{ color: 'gray' }}>Length</span>}
        name='Length'
      >
        <InputNumber
          min={1}
          max={100}
          style={{ marginLeft: '10px' }}
          defaultValue={initialValues.depth}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{ width: '100%' }}
        theme={theme}
      >
        <Button
          type='primary'
          htmlType='submit'
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