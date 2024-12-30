
import { Provider } from 'react-redux'
import './App.css'
import store from './store/store'

function App() {

  return (
    <>
    <Provider store={store}>
    <h1>Hello world</h1>
    </Provider>
    </>
  )
}

export default App
