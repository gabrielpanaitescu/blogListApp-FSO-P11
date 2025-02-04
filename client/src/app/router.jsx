import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useMatch,
  useParams,
} from "react-router-dom";
import AppRoot from "./routes/root";
import Home from "./routes/Home";
import BlogList from "./routes/BlogList";
import Blog from "./routes/Blog";
import Users from "./routes/Users";
import User from "./routes/User";
import Authentication from "./routes/Authentication";
import { useGetUsers } from "../hooks/query/useUsers";
import { useBlogs } from "../hooks/query/useBlogs";
import { useAuthState } from "../contexts/AuthContext";
import { useInitializeAuth } from "../hooks/query/useAuth";
import ErrorElement from "./routes/ErrorElement";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useLogout } from "../hooks/query/useAuth.js";

const ProtectedRoute = ({ children }) => {
  const user = useAuthState();

  return user ? children : <Navigate to={"/login"} replace />;
};

const UserLoader = () => {
  const { users, isPending, isError, error } = useGetUsers();
  const match = useMatch("/users/:id");
  const matchedUser = match
    ? users.find((user) => user.id === match.params.id)
    : null;

  return (
    <User
      user={matchedUser}
      isPending={isPending}
      isError={isError}
      error={error}
    />
  );
};

const BlogLoader = () => {
  const { blogs } = useBlogs();
  const { id } = useParams();

  const matchedBlog = blogs.find((blog) => blog.id === id);

  return <Blog blog={matchedBlog} />;
};

const router = createBrowserRouter([
  {
    element: <AppRoot />,
    path: "/",
    errorElement: <ErrorElement />,
    children: [
      {
        errorElement: <ErrorElement />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/users",
            element: (
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            ),
          },
          {
            path: "/users/:id",
            element: (
              <ProtectedRoute>
                <UserLoader />
              </ProtectedRoute>
            ),
          },
          {
            path: "/blogs",
            element: (
              <ProtectedRoute>
                <BlogList />
              </ProtectedRoute>
            ),
          },
          {
            path: "/blogs/:id",
            element: (
              <ProtectedRoute>
                <BlogLoader />
              </ProtectedRoute>
            ),
          },
          {
            path: "/login",
            element: <Authentication />,
          },
        ],
      },
    ],
  },
]);

export const AppRouter = () => {
  const { authInitializing } = useInitializeAuth();
  const { logout } = useLogout();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        console.log("error queryCache", error);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        console.log("error mutationCache", error);

        if (error.status === 401) {
          logout();
        }
      },
    }),
  });

  if (authInitializing) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
