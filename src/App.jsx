import { SeeSantri } from "@/pages/admin";
import { SignIn } from "@/pages/auth";
import { ErrorPage } from "@/pages/Error";
import { Home } from "@/pages/Home";
// import { MyBooks } from "@/pages/MyBooks";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<SeeSantri />} />
        <Route
          path="*"
          element={<ErrorPage status="404" statusCode="Page Not Found" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;