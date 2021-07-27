import React from 'react'
import { Result, Button } from 'antd';
function NotFound() {
    return (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary">ត្រលប់ក្រោយ</Button>}
  />
    )
}

export default NotFound
