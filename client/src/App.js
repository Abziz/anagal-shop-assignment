import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import AuthPage from './pages/Auth';
import CartPage from './pages/Cart';
import HomePage from './pages/Home';

// some font awesome icons ( could narrow down the list of used icons for performance )
library.add(fas);

function App() {
	return (
		<Layout>
			<Switch>
				<Route path="/auth" component={AuthPage} />
				<Route path="/cart" component={CartPage} />
				<Route path="/" exact component={HomePage} />
			</Switch>
		</Layout>
	);
}

export default App;
