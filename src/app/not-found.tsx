import React from "react";
import { Button, Result } from "antd";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link href="/">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </div>
  );
}
