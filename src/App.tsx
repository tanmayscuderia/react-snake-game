import './App.css';
import store from "./store";
import Score from './components/Score';
import Board from './components/Board';

import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <Score />
      <Board height={600} width={1000} />
    </Provider>
  )
}
export default App;
