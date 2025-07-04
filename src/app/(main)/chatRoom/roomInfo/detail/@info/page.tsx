import { Suspense } from "react";
import Main from "./components";

export default function Page() {
  return (
    <Suspense>
      <Main></Main>
    </Suspense>
  );
}
