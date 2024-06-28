import React from 'react';
import './LandingPage.css'; // Importa el archivo de estilos CSS para LandingPage
import Logo from '../../LogoSH.svg'; // Ajusta la ruta según la estructura de tu proyecto

const LandingPage = () => {
    return (
        <div>
            <nav className="navbar">
                <div className="navbar-left">
                    <button><a href="/signup">SignUp</a></button>
                    <button><a href="/login">LogIn</a></button>
                </div>
                <div className="navbar-center">
                    <a href="/" className="logo"><img src={Logo} alt="Logo" /></a>
                </div>
                <div className="navbar-right">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="#appointments">Appointments</a></li>
                        <li><a href="#health-blog">Health Blog</a></li>
                        <li><a href="#reviews">Reviews</a></li>
                    </ul>
                </div>
            </nav>

            <section className="hero-section">
                <div>
                    <div data-aos="fade-up" className="flex-hero">
                        <h1>
                            Your Health<br />
                            <span className="text-gradient">
                                Our Responsibility
                            </span>
                        </h1>
                        <div className="blob-cont">
                            <div className="blue blob"></div>
                        </div>
                        <div className="blob-cont">
                            <div className="blue1 blob"></div>
                        </div>
                        <h4>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque at quae ducimus. Suscipit omnis quibusdam non cum rem voluptatem!
                        </h4>
                        <a href="#services">
                            <button className="button">Get Started</button>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LandingPage;


