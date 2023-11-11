import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate,
  Outlet,
} from "react-router-dom";
import Layout from "./components/Layout";
import NewNote from "./components/NewNote";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<h1>Home</h1>} />
          <Route path="/new" element={<Outlet />}>
            <Route index element={<NewNote />} />
            <Route path=":showId" element={<h1>Show</h1>} />
            <Route path=":editId" element={<h1>Edit</h1>} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
