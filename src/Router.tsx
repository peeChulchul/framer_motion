import { createBrowserRouter } from 'react-router-dom';
import Home from './Routes/Home';
import Search from './Routes/Search';
import App from './App';
import Modal from './components/molecules/Modal';

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <Home />, children: [{ path: 'movies/:itemId', element: <Modal /> }] },
            {
                path: 'search/:keyword',
                element: <Search />,
                children: [{ path: ':itemId', element: <Modal /> }],
            },
        ],
    },
]);
