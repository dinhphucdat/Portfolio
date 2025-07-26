import React, { useState, useEffect, useRef } from 'react';

export default function AboutMe({id}) {
    const [visibleItems, setVisibleItems] = useState([]);
    const [hoveredDot, setHoveredDot] = useState(null);
    const itemRefs = useRef([]);

    const titles = [
        'Education', 
        'Evolution Simulation Research', 
        'Statistical Reconstruction of Moose Population Intern', 
        'Field-Programmable Gate Array Hardware Deployment', 
        'First-Year Experience Mentor', 
        'Sports Multimedia Production'
    ];

    const dates = [
        'Sep 2023 - Present',
        '12/2024 - Present', 
        '06/2025 - 09/2025',
        '02/2025 - Present',
        '08/2024 – 12/2024',
        '02/2024 - Present'
    ];

    const descriptions = [
        [
            'Computer Science minoring in Data Science and Biology at University of St. Thomas', 
            'GPA: 4.00', 
            'Courseworks: Intro to Computer Science & Prob-Solving, Intro to Statistics, Applied Regression Statistics, Data Structures, Discrete Maths, Genetic and Evolution Biology, Object-Oriented Programming, Biocommunication-Energetic', 
        ], [
            'Successfully used sPEGG (simulating Phenotypic Evolution on General-purpose Graphics processing units) software to compute the evolutionary pattern in the Moth species, with the technical accuracy up to 90%', 
            'Incorporated CUDA to improve simulation efficiency with parallelizing algorithms'
        ], [
            'Reconstructed moose population using Integrated Population Models (IBM) before 2005, where moose records were limited', 
            'Collaborated with Minnesota Department of Natural Resources (MNDNR) to perform moose data analysis and updated estimates to their cloud'
        ], [
            'Automated the system installation & configuration process with PowerShell', 
            'Refactored the efficiency test scripts from the experiment lab to an actual modular and user-friendly software to track the cell\'s electrophysiology'
        ], [
            'Collaborated with the UST First-Year Experience Team and successfully designed a program that supports freshmen while also mentoring and teaching them in class'
        ], [
            'Videotaping, directing, and doing the live graphics for TV-live college sports games such as soccer, basketball'
        ]
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = parseInt(entry.target.dataset.index);
                    if (entry.isIntersecting) {
                        setVisibleItems(prev => [...new Set([...prev, index])]);
                    }
                });
            },
            {
                threshold: 0.3,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        itemRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div style={styles.container} id={id}>
            <div style={styles.header}>
                About Me
            </div>
            
            <div style={styles.timelineContainer}>
                <div style={styles.timelineLine}></div>
                
                {titles.map((title, index) => (
                    <div 
                        key={index}
                        ref={el => itemRefs.current[index] = el}
                        data-index={index}
                        style={{
                            ...styles.timelineItem,
                            ...(visibleItems.includes(index) ? styles.timelineItemVisible : {})
                        }}
                    >
                        <div 
                            style={styles.timelineDot}
                            onMouseEnter={() => setHoveredDot(index)}
                            onMouseLeave={() => setHoveredDot(null)}
                        >
                            <div style={styles.timelineDotInner}></div>
                            <div style={{
                                ...styles.tooltip,
                                opacity: hoveredDot === index ? 1 : 0,
                                visibility: hoveredDot === index ? 'visible' : 'hidden',
                                transform: hoveredDot === index 
                                    ? 'translateX(-50%) translateY(-5px)' 
                                    : 'translateX(-50%) translateY(0px)'
                            }}>
                                {dates[index]}
                            </div>
                        </div>
                        
                        <div style={styles.timelineContent}>
                            <AboutFrame 
                                title={title}
                                description={<ProcessDescription descriptionArray={descriptions[index]} />}
                                isVisible={visibleItems.includes(index)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ProcessDescription({ descriptionArray }) {
    return (
        <ul style={styles.descriptionList}>
            {descriptionArray.map((item, index) => (
                <li key={index} style={styles.descriptionItem}>{item}</li>
            ))}
        </ul>
    );
}

function AboutFrame({ title, description, isVisible }) {
    return (
        <div style={{
            ...styles.aboutFrame,
            ...(isVisible ? styles.aboutFrameVisible : {})
        }}>
            <div style={styles.titleEach}>{title}</div>
            <div style={styles.descriptionEach}>{description}</div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: '"Open Sans", sans-serif'
    },
    header: {
        color: 'white',
        backgroundColor: '#c71585',
        fontSize: '1.8rem',
        textAlign: 'center',
        padding: '1rem 0',
        marginBottom: '1.0rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    timelineContainer: {
        position: 'relative',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
    },
    timelineLine: {
        position: 'absolute',
        left: '2rem',
        top: '0',
        bottom: '0',
        width: '4px',
        backgroundColor: '#c71585',
        opacity: 0.3,
        borderRadius: '2px'
    },
    timelineItem: {
        position: 'relative',
        marginBottom: '4rem',
        opacity: 0,
        transform: 'translateY(50px)',
        transition: 'all 0.6s ease-out'
    },
    timelineItemVisible: {
        opacity: 1,
        transform: 'translateY(0)'
    },
    timelineDot: {
        position: 'absolute',
        left: '1rem',
        top: '2rem',
        width: '24px',
        height: '24px',
        backgroundColor: '#c71585',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 0 8px #f8f9fa, 0 0 0 12px #c71585',
        zIndex: 10,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        ':hover': {
            transform: 'scale(1.2)',
            boxShadow: '0 0 0 8px #f8f9fa, 0 0 0 16px #c71585'
        }
    },
    timelineDotInner: {
        width: '4px',
        height: '4px',
        backgroundColor: 'white',
        borderRadius: '50%'
    },
    timelineContent: {
        marginLeft: '5rem'
    },
    aboutFrame: {
        backgroundColor: 'white',
        border: '4px solid #c71585',
        borderRadius: '12px',
        padding: '0.3rem 1rem',
        boxShadow: '8px 8px 0px rgba(199, 21, 133, 0.2)',
        transform: 'scale(0.95)',
        transition: 'all 0.4s ease-out',
        opacity: 0.7
    },
    aboutFrameVisible: {
        transform: 'scale(1)',
        opacity: 1,
        boxShadow: '8px 8px 0px rgba(199, 21, 133, 0.4)'
    },
    titleEach: {
        fontSize: '1.8rem',
        fontWeight: '600',
        color: '#c71585',
        marginBottom: '1rem',
        lineHeight: '1.3'
    },
    descriptionEach: {
        fontSize: '1rem',
        fontWeight: '400',
        color: '#333',
        lineHeight: '1.6'
    },
    descriptionList: {
        margin: 0,
        paddingLeft: '1.0rem'
    },
    descriptionItem: {
        marginBottom: '0.8rem',
        lineHeight: '1.2'
    },
    tooltip: {
        position: 'absolute',
        bottom: '35px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#333',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '0.8rem',
        fontWeight: '500',
        whiteSpace: 'nowrap',
        opacity: 0,
        visibility: 'hidden',
        transition: 'all 0.3s ease',
        zIndex: 1000,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    'tooltip::after': {
        content: '""',
        position: 'absolute',
        top: '100%',
        left: '50%',
        marginLeft: '-5px',
        borderWidth: '5px',
        borderStyle: 'solid',
        borderColor: '#333 transparent transparent transparent'
    }
};