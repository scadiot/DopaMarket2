import { useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux';
import reactLogo from './assets/react.svg'
import { State } from './models';
import { ADD_PRODUCT, SET_PRODUCTS } from './reducers';
import './App.css'

function App() {
  const articles = useSelector((state: State) => state.products)
  const dispatch = useDispatch()
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3005/api/products');
      const data = await response.json();
      dispatch({ type: SET_PRODUCTS, payload: data })
    }
    fetchData();
  }, [])
  return (
    <div className="App">
      test
      {articles.map(a => 
        <div key={a.id}>
          {a.name}
        </div>
      )}
      <button onClick={() => {}}>ADD</button>
    </div>
  )
}

export default App
