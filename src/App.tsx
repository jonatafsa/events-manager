import Toast from './components/Toast';
import { EventContextProvider } from './contexts/events-context';
import { ModalContextProvider } from './contexts/modal-context';
import MyRoutes from './routes';
import './styles/global.scss'

function App() {
  return (
    <ModalContextProvider>
      <EventContextProvider>
        <MyRoutes />
        <Toast />
      </EventContextProvider>
    </ModalContextProvider>
  )
}

export default App;