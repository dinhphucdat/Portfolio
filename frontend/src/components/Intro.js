import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import App from "../App";

const myImagePath = "/myImage.png";

const cues = [
    "Welcome to my website!", "How are you doing?", "Have fun visiting my site!"
];

function ProcessMyImage() {
    return (
        <div class='myimage'>
            <img src={myImagePath} alt="Myself" style={style.myImage} />
        </div>
    );
}

function Cue() {
    const [index, setIndex] = useState(0);

    const [cue, setCue] = useState("");

    const [isdelete, deleteCue] = useState(false);

    const speed = 150;

    const interval = 5000;


    useEffect(() => {
        const current = cues[index];
        
        const timer = setTimeout(() => {
            if (!isdelete) {
                if (cue.length < current.length) {
                    setCue(current.substring(0, cue.length + 1));
                }
                else {
                    setTimeout(() => deleteCue(true), interval);
                }
            } else {
                if (cue.length > 0) {
                    setCue(current.substring(0, cue.length - 1));
                } else {
                    setTimeout(() => {
                        deleteCue(false);
                        setIndex((index) => (index + 1) % cues.length);
                    }, 200);
                }
            }
        }, speed);
        return () => clearTimeout(timer);
    }, [cue, isdelete]
    );

    return (
        <div class='mycue' style={style.cue}>
            {cue}
            <span style={{ borderRight: "2px solid", animation: "blink 1s step-end infinite" }}></span>
        </div>
    );
}



export default function Intro() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 600);
        };
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const styles = {
        intro: {
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '5% 25% 5% 25%'
        }
    }

    return (
        <div className='intro' style={styles.intro}>
            <Cue /><ProcessMyImage />
        </div>
    );
}

const style = {
    myImage: {
        //position: 'relative',
        width: '250px',
        border: '4px solid #c71585',
        borderRadius: '8px',
        boxShadow: '8px 8px 0px rgba(0, 0, 0, 0.6)'
    },
    cue: {
        //position: 'relative',
        fontSize: '25pt',
        verticalAlign: 'middle',
        flex: '1'
    },
}
