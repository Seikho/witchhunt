import 'babel-polyfill'
import './styles/vars.scss'
import './styles/elements.scss'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as h from 'history'
import { Provider } from 'react-redux'
import { store } from './state'
import { Route, Router, Switch } from 'react-router-dom'
import { Home } from './pages/home'
import { Layout } from './comps/layout'

const history = h.createBrowserHistory()

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Layout>
        <Switch>
          <Route path={['/', '/home']} exact={true} component={Home} />
        </Switch>
      </Layout>
    </Router>
  </Provider>
)

ReactDOM.render(<App />, document.querySelector('#root'))
