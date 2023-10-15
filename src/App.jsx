import { lazy } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Suspense } from "react";
import { Loader } from "./layouts";
import { Navbar } from "./components";
const Article = lazy(() => import("./pages/Article"));
import { Listing } from "./pages/";
const TermsCondition = lazy(() => import("./pages/TermsCondition"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

// const router = createBrowserRouter([
//   {
//     basename: "/",
//     path: "/",
//     element: Layout,
//     children: [
//       {
//         path: "/",
//         element: <Listing />,
//       },
//       {
//         path: "/a/:blogUrl",
//         element: <Article />,
//       },
//       {
//         path: "/term-condition",
//         element: <TermsCondition />,
//       },
//       {
//         path: "/privacy-policy",
//         element: <PrivacyPolicy />,
//       },
//       {
//         path: "/test",
//         element: <ListingLoader />,
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route index element={<Listing />} />

      <Route
        path="/a/:blogUrl"
        element={
          <Suspense fallback={<Loader />}>
            <Article />
          </Suspense>
        }
      />
      <Route
        path="/term-condition"
        element={
          <Suspense fallback={<Loader />}>
            <TermsCondition />
          </Suspense>
        }
      />
      <Route
        path="/privacy-policy"
        element={
          <Suspense fallback={<Loader />}>
            <PrivacyPolicy />
          </Suspense>
        }
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
