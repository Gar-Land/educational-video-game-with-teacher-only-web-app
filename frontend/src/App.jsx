import { 
  RouterProvider, createBrowserRouter, createRoutesFromElements, Route
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/accounts/SignIn";
import LogIn from "./pages/accounts/LogIn";
import TeacherLayout from "./layouts/TeacherLayout";
import MatchesTable from "./pages/teachers/Matches";
import Level from "./pages/teachers/Level";
import Student from "./pages/teachers/Student";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<LandingPage />} />
      <Route path="accounts">
        <Route path="sign-in" element={<SignIn />} />
        <Route path="log-in" element={<LogIn />} />
      </Route>
      <Route path="teachers" element={<TeacherLayout />}>
        <Route path="matches" element={<MatchesTable />} />
        <Route path="levels" element={<Level />} />
        <Route path="search">
          <Route path="students" element={<Student />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />}/>
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router}/>
  );
};

export default App;