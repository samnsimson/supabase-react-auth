import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useUserStore } from "./store";
import { LoginPage, RegisterPage, RootView } from "./views";

function App() {
    const { user } = useUserStore();

    const router = createBrowserRouter([
        {
            path: "/",
            element: user ? <RootView /> : <LoginPage />,
        },
        {
            path: "/register",
            element: <RegisterPage />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
