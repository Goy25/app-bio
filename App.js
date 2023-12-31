import Navigation from "./Navigation"
import { ContextProvider } from "./utils/context"

export default function App () {
  return (
    <ContextProvider>
      <Navigation />
    </ContextProvider>
  )
}