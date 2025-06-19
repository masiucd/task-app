import "./App.css"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TaskApp />
    </QueryClientProvider>
  )
}

function TaskApp() {
  return <div>Task app!</div>
}

export default App
