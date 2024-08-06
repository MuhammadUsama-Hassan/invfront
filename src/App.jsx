import React from 'react'

import { Provider } from 'react-redux';

import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Router from './Components/Router';


import store from './store/store';







function App(){

return(

<>


<br />
<Provider store={store}>
<BrowserRouter>


<Router />

    
    </BrowserRouter>

    {/* <Footer /> */}
    </Provider>
</>


)

}

export default App;