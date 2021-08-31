import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/layout/header/Header';
import Content from './components/layout/Content';
import Footer from './components/layout/Footer';
import MainContainer from './components/layout/MainContainer';
import CreatTransaction from './components/pages/CreatTransaction';
import EditTransaction from './components/pages/EditTransactios';
import Home from './components/pages/Home';
import { TransactionProvider } from './contexts/transactionContext';
import { SearchProvider } from './contexts/searchContext';
import { PaginationProvider } from './components/ui/paginationContext';

function App() {
  return (
    <BrowserRouter>
      <PaginationProvider>
        <SearchProvider>
          <TransactionProvider>
            <MainContainer>
              <Header />
              <Content>
                <Switch>
                  <Route path='/create-transaction' component={CreatTransaction} />
                  <Route path='/edit-transaction/:id' component={EditTransaction} />
                  {/* <Route path='/create-transaction' render={props => <CreatTransaction state={state} />} />สามารถส่ง props ไปได้*/}
                  <Route exact path='/' component={Home} />
                  <Route
                    path='/not-found'
                    render={() => (
                      <h1 style={{ color: 'white' }}>This page is not found</h1>
                    )}
                  />
                  <Redirect to='/not-found' />
                </Switch>
              </Content>
              <Footer />
            </MainContainer>
          </TransactionProvider>
        </SearchProvider>
      </PaginationProvider>
    </BrowserRouter>
  );
}

export default App;
