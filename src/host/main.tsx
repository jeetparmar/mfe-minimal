import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";

const Header = lazy(() => import("header/Header"));
const Content = lazy(() => import("content/Content"));

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<p>Loading...</p>}>
    <Header />
    <Content />
    <footer>
      <p>This footer is in the host app (port 3000).</p>
    </footer>
  </Suspense>
);
