import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Footer, Navbar } from "./components";
import { Listing, Article } from "./pages";
import ScrollToTopButton from "./components/ScrollTopBtn";
import TermsCondition from "./pages/TermsCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy";

// outlet setup

const Layout = (
  <main>
    <Navbar />
    <ScrollToTopButton />
    <Outlet />
    <Footer />
  </main>
);

const router = createBrowserRouter([
  {
    basename: "/",
    path: "/",
    element: Layout,
    children: [
      {
        path: "/",
        element: <Listing />,
      },
      {
        path: "/a/:blogUrl",
        element: <Article />,
      },
      {
        path: "/term-condition",
        element: <TermsCondition />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
