import React, { useState, useEffect } from "react";

const myImagePath = "/myImage.png";

const cues = [
    "Welcome to my website!", 
    "How are you doing?", 
    "Have fun visiting my site!",
    "Check out my projects!",
    "Let's connect!"
];

function ProcessMyImage() {
    return (
        <div className='myimage'>
            <img 
                src={myImagePath} 
                alt="Profile" 
                style={styles.myImage}
                onError={(e) => {
                    e.target.style.display = 'none';
                }}
            />
        </div>
    );
}

function Cue() {
    const [index, setIndex] = useState(0);
    const [cue, setCue] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseDuration = 2000;

    useEffect(() => {
        if (isPaused) return;

        const currentCue = cues[index];
        
        const timer = setTimeout(() => {
            if (!isDeleting) {
                if (cue.length < currentCue.length) {
                    setCue(currentCue.substring(0, cue.length + 1));
                } else {
                    setIsPaused(true);
                    setTimeout(() => {
                        setIsPaused(false);
                        setIsDeleting(true);
                    }, pauseDuration);
                }
            } else {
                if (cue.length > 0) {
                    setCue(currentCue.substring(0, cue.length - 1));
                } else {
                    setIsDeleting(false);
                    setIndex((prevIndex) => (prevIndex + 1) % cues.length);
                }
            }
        }, isDeleting ? deleteSpeed : typeSpeed);

        return () => clearTimeout(timer);
    }, [cue, isDeleting, isPaused, index]);

    return (
        <div className='mycue' style={styles.cue}>
            <span>{cue}</span>
            <span style={styles.cursor}></span>
        </div>
    );
}

export default function Intro() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <div className='intro' style={{...styles.intro, flexDirection: isMobile ? 'column' : 'row'}}>
            <div style={styles.textSection}>
                <Cue />
            </div>
            <div style={styles.imageSection}>
                <ProcessMyImage />
            </div>
        </div>
    );
}

const styles = {
    intro: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5% 10%',
        minHeight: '60vh',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    textSection: {
        flex: '1',
        minWidth: '300px'
    },
    imageSection: {
        flex: '0 0 auto'
    },
    myImage: {
        width: '250px',
        height: '250px',
        objectFit: 'cover',
        border: '4px solid #c71585',
        borderRadius: '12px',
        boxShadow: '12px 12px 0px rgba(199, 21, 133, 0.3)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer'
    },
    cue: {
        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
        fontWeight: '600',
        color: '#333',
        minHeight: '3rem',
        display: 'flex',
        alignItems: 'center'
    },
    cursor: {
        borderRight: '3px solid #c71585',
        animation: 'blink 1s step-end infinite',
        marginLeft: '2px'
    }
}

// Add this CSS to your global styles or create a separate CSS file
const globalStyles = `
@keyframes blink {
    0%, 50% { border-color: #c71585; }
    51%, 100% { border-color: transparent; }
}

.myimage img:hover {
    transform: translateY(-5px);
    box-shadow: 16px 16px 0px rgba(199, 21, 133, 0.4);
}

@media (max-width: 768px) {
    .intro {
        text-align: center;
        padding: 5% 5% !important;
    }
    
    .myimage img {
        width: 200px !important;
        height: 200px !important;
    }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = globalStyles;
    document.head.appendChild(styleSheet);
}