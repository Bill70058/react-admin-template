import React, { memo } from "react";
import { Spin } from "antd";

const Loading = memo(() => {
  return (
    <Spin size="large" />
  );
});

export default Loading;
