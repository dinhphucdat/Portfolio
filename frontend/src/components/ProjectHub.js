import React from 'react';
import { BrowserRouter, Link, Router, Routes, Route } from 'react-router-dom';

const style = {
    image: {
        width: '100%',
        height: '100%', // Takes 70% of container height
        objectFit: 'cover', // Maintains aspect ratio while filling the space
        objectPosition: 'center', 
    },
    linkimage: {
        width: '100%', 
        height: '80%',
        border: '4px solid #c71585',
        borderRadius: '8px'
    },
    project: {
        height: '20%', // Takes remaining 30% of container height
        padding: '0',
        overflow: 'auto', // In case text is too long
        display: 'flex',
        alignItems: 'center', // Centers text vertically
        justifyContent: 'center' // Centers text horizontally
    }, 
    eachproject: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        width: '300px', 
        height: '450px' // Fixed height for uniform cards
    },
    projecthub: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '30px',
        padding: '24px',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2ex 15%'
    }
}

const projectNames = [
    "Vending Machine", "Artificial Life Simulation", 
    "Accessibility Test", "Important Calculator For Modern People", 
    "Genes and Geography", "Algorithms for DNA Sequencing", 
    "Machine Shaman"
];

const thumbnails = [
    '/projectthumbnails/vendingmachine.png', 
    '/projectthumbnails/alifesim.png', 
    '/projectthumbnails/accessibility.png', 
    '/projectthumbnails/javacalc.png', 
    '/projectthumbnails/genegeo.png', 
    '/projectthumbnails/algdnaseq.png', 
    '/projectthumbnails/machineshaman.png'
];

const projectLinks = [
    'https://github.com/dinhphucdat/Vending-Machine', 
    'https://github.com/dinhphucdat/Artificial-Life-Simulation', 
    'https://github.com/dinhphucdat/Accessibility-Test', 
    'https://github.com/dinhphucdat/Important-Calculator-For-Modern-People', 
    'https://github.com/dinhphucdat/Genes-and-Geography', 
    'https://github.com/dinhphucdat/Algorithms-for-DNA-sequencing', 
    'https://github.com/dinhphucdat/machine_shaman'
];

function EachProject({name, thumbnail, link}) {
    return (
        <div class='projectthumbnail' style={style.eachproject}>
            <a href={link} style={style.linkimage} target='_blank'>
                <img src={thumbnail} alt='project' style={style.image} />
            </a>
            <div style={style.project}>
                <a href={link} className='fancy-link' style={{fontSize:'12pt', fontWeight:'500'}} target='_blank'>
                    {name}
                </a>
            </div>
        </div>
    );
}

export default function ProjectHub() {
    return (
        <>
        <p style={{fontSize : '30px', textAlign: 'center', paddingBottom: '0.2ex'}}>Projects</p>
        <hr />
        <div class='projecthub' style={style.projecthub}>
            {projectNames.map((projname, index) => 
            <EachProject key={projname} name={projname} thumbnail={thumbnails[index]} link={projectLinks[index]} />)}
        </div>
        </>
    );
}