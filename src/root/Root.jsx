import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../components/Footer/Footer';
import NavBar from '../components/Header/NavBar';

const Root = () => {
    return (
        <div>
            <header className='sticky top-0 z-50  shadow-md'>
                <NavBar></NavBar>
            </header>
           
            <main className='max-w-7xl mx-auto'>
                <Outlet></Outlet>

            </main>
            <footer>
                <Footer></Footer>
            </footer>

            
            
        </div>
    );
};

export default Root;