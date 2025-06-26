import { NextResponse } from "next/server";

export async function GET(data?: Record<string, string>) {
  const encoder = new TextEncoder();
  const readableStream = new ReadableStream({
    start(controller) {
      // const intervalId = setInterval(() => {
      //   // 检查流是否已关闭
      //   if (controller.desiredSize === null) {
      //     // 流已关闭，停止发送数据
      //     clearInterval(intervalId);
      //     return;
      //   }

      //   const data = JSON.stringify({ time: new Date().toISOString() });
      //   try {
      //     // console.log(data);
      //     controller.enqueue(encoder.encode(`data: ${data}\n\n`)); // 推送数据
      //   } catch (error) {
      //     console.error("Error enqueueing data:", error);
      //     clearInterval(intervalId);
      //   }
      // }, 1000);

      // // 设置连接保持时间（可选）
      // const keepAlive = setTimeout(() => {
      //   clearInterval(intervalId);
      //   controller.close();
      // }, 30000); // 30 秒后自动关闭连接

      // // 使用 request.signal 监听客户端断开连接
      // request.signal.addEventListener("abort", () => {
      //   clearInterval(intervalId);
      //   clearTimeout(keepAlive);
      //   controller.close();
      // });

      // const data = JSON.stringify({ time: new Date().toISOString() });
      console.log("message");
      console.log(data);
      if (data) controller.enqueue(encoder.encode(`data: ${data}\n\n`));
    },
  });
  return new NextResponse(readableStream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
