import React from 'react';
import { Form, Input, Button, Switch, Space } from 'antd';

const ParametersForm = ({ setParameters, setTheme, theme, initialValues }) => {
  const [form] = Form.useForm();

  const onSubmit = (values) => {
    setParameters({ 
      //если значение не передано, использовать старое
      height: values.Height || initialValues.height, 
      width: values.Width || initialValues.width, 
      depth: values.Length || initialValues.depth });
  };

  const onSwitch = (checked) => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Form
      theme={theme}
      form={form}
      name='basic'
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onSubmit}
      autoComplete='off'
      style={{
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
        theme={theme}
        label={<span style={{ color: 'gray' }}>Width</span>}
        name='Width'
      >
        <Input
          type='number'
          style={{ marginLeft: '10px' }}
          defaultValue={initialValues.width} />
      </Form.Item>

      <Form.Item
        theme={theme}
        label={<span style={{ color: 'gray' }}>Height</span>}
        name='Height'
      >
        <Input
          type='number'
          style={{ marginLeft: '10px' }}
          defaultValue={initialValues.height}
        />
      </Form.Item>

      <Form.Item
        theme={theme}
        label={<span style={{ color: 'gray' }}>Length</span>}
        name='Length'
      >
        <Input
          type='number'
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
