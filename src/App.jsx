import "./App.css";
import AppRouter from "./component/Routes/router.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ایجاد Query Client
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </>
  );
}

export default App;
