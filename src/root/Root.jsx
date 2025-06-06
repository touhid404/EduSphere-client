import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../components/Footer/Footer';
import NavBar from '../components/Header/NavBar';

const Root = () => {
    return (
        <div>
            <header>
                <NavBar></NavBar>
            </header>
           
            <main>
                <Outlet></Outlet>

            </main>
            <footer>
                <Footer></Footer>
            </footer>

            
            
        </div>
    );
};

export default Root;