import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { App } from "../App";
import Home from "./Home";

// internal routes names
const headerNameInternal = [
    "Home"
];

// external routes names
const headerNameExternal = [
    "LinkedIn", "GitHub"
];

// internal routes
const headerLinkInternal = [
    "/"
];

// external links
const headerLinkExternal = [
    "https://www.linkedin.com/in/dat-dinh-688242317/", 
    "https://github.com/dinhphucdat"
];

// return link elements for internal routes
function LinkInternal({to, name}) {
    return <Link to={to} className='fancy-link' style={style.link}>{name}</Link>;
}

// return href for external links
function LinkExternal({href, name}) {
    return <a href={href} className='fancy-link' style={style.link} target="_blank">{name}</a>;
}

function StringAll() {
    return (
    <div style={style.links}>
        {
            headerNameInternal.map((name, Index) => 
            <LinkInternal key={name} class='rightmostlinks' to={headerLinkInternal[Index]} name={name} />
        )}
        <HeaderLink />
        {
            headerNameExternal.map((name, Index) => 
            <LinkExternal key={name} class='rightmostlinks' href={headerLinkExternal[Index]} name={name} />
        )}
    </div>
    );
}

// Function to handle header click - navigate to home then scroll to About Me
function HeaderLink() {
    const navigate = useNavigate();
    
    const handleClick = (e) => {
        e.preventDefault();
        
        // Navigate to home page
        navigate('/');
        
        // Wait for navigation to complete, then scroll to about section
        setTimeout(() => {
            const aboutSection = document.getElementById('about-me-section');
            if (aboutSection) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 100);
    };
    
    return (
        <a 
            href="/" 
            className='fancy-link' 
            style={style.link}
            onClick={handleClick}
        >
            About Me
        </a>
    );
}

// link style
const style = {
    links: {
        display: 'flex',
        flexDirection: 'row', // optional, default for flex
        gap: '1.5rem',         // space between links
        // marginLeft: 'auto',    // pushes this group to the right if inside a flex container
        alignItems: 'center',   // vertically center the links
        flexWrap: 'wrap'
    },
    link : {
        fontFamily: '"Open Sans", sans-serif',
        fontOpticalSizing: 'auto',
        display: 'flex', 
        flexDirection: 'row',
        fontWeight: 600,
        fontSize: '24pt',
        fontStyle: 'normal',
        fontVariationSettings: '"wdth" 100',
        flexWrap: 'wrap'
    }, 
    superlink : {
        fontFamily: '"Open Sans", sans-serif',
        fontOpticalSizing: 'auto',
        display: 'flex', 
        flexDirection: 'row',
        fontWeight: 600,
        fontSize: '45pt',
        fontStyle: 'normal',
        fontVariationSettings: '"wdth" 100'
    }, 
    nav: {
        display: 'flex',
        flexDirection: 'row', 
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '3ex 15ex 3ex 15ex', // top right bottom left
        backgroundColor: 'lightpink'
    }
};

export default function Header() {
    return (
        <nav style={style.nav}>
            <Link to="/" className='fancy-link' style={style.superlink}>Dat Dinh</Link>
            <StringAll class='stringall'/>
        </nav>
    );
}
