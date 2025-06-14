import { createRoot } from 'react-dom/client'
import App from './App'
import './assets/App.css'
import  store  from '../store/store'
import { Provider } from 'react-redux'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <App />
    </Provider>,
)
