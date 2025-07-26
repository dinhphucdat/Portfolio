import React from 'react';
import Header from './Header'
import Intro from './Intro';
import { BrowserRouter } from 'react-router-dom';
import ProjectHub from './ProjectHub';
import AboutMe from './AboutMe';

export default function Home() {
    return (
        <>
            <Header />
            <Intro />
            <ProjectHub />
            <AboutMe id='about-me-section' />
        </>
    );
}