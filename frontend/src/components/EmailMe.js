import React, { useState, useEffect } from "react";

export default function EmailMe({ id }) {
    const [formData, setFormData] = useState({
        name: '', 
        email: '', 
        subject: '', 
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
    
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev, 
            [name]: value
        }));
    };

    const handleFocus = (fieldName) => {
        setFocusedField(fieldName);
    };

    const handleBlur = () => {
        setFocusedField(null);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!isFormValid) return;

        setIsSubmitting(true);
        setSubmitStatus('');

        try {
            // Create mailto link
            const subject = encodeURIComponent(formData.subject || 'Contact from Portfolio');
            const body = encodeURIComponent(
                `Hi Dat,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\nBest regards,\n${formData.name}`
            );
            const mailtoLink = `mailto:dinhphucdat005@gmail.com?subject=${subject}&body=${body}`;

            // Open email client
            window.open(mailtoLink, '_self');

            // Show success message
            setSubmitStatus('Email client opened! Thank you for reaching out.');

            // Reset form after a delay
            setTimeout(() => {
                setFormData({ name: '', email: '', subject: '', message: '' });
                setSubmitStatus('');
                setIsSubmitting(false);
            }, 3000);
        } catch (error) {
            setSubmitStatus('Something went wrong. Please try again or email me directly.');
            setIsSubmitting(false);
        }
    };

    // Copy email to clipboard
    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText('dinhphucdat005@gmail.com');
            setSubmitStatus('Email copied to clipboard!');
            setTimeout(() => setSubmitStatus(''), 2000);
        } catch (err) {
            console.log('Failed to copy email');
        }
    };

    const getInputStyle = (fieldName, hasError = false) => ({
        ...styles.input,
        borderColor: hasError ? '#dc3545' : 
                    focusedField === fieldName ? '#c71585' : '#e9ecef',
        boxShadow: focusedField === fieldName ? '0 0 0 3px rgba(199, 21, 133, 0.1)' : 'none'
    });

    const getTextareaStyle = (fieldName, hasError = false) => ({
        ...styles.textarea,
        borderColor: hasError ? '#dc3545' : 
                    focusedField === fieldName ? '#c71585' : '#e9ecef',
        boxShadow: focusedField === fieldName ? '0 0 0 3px rgba(199, 21, 133, 0.1)' : 'none'
    });

    const styles = {
        container: {
            minHeight: '100vh',
            backgroundColor: '#f8f9fa',
            fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
        },
        header: {
            color: 'white',
            backgroundColor: '#c71585',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            textAlign: 'center',
            padding: '1.5rem 0',
            marginBottom: '2rem',
            boxShadow: '0 4px 12px rgba(199, 21, 133, 0.3)',
            background: 'linear-gradient(135deg, #c71585, #e91e63)'
        },
        contentContainer: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem'
        },
        introSection: {
            textAlign: 'center',
            marginBottom: '3rem'
        },
        introTitle: {
            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
            fontWeight: '700',
            color: '#c71585',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #c71585, #e91e63)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
        },
        introText: {
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: '#555',
            lineHeight: '1.6',
            maxWidth: '700px',
            margin: '0 auto'
        },
        contactSection: {
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '2rem',
            alignItems: 'start'
        },
        directContact: {
            display: 'flex',
            flexDirection: 'column'
        },
        contactFrame: {
            backgroundColor: 'white',
            border: '3px solid #c71585',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '12px 12px 0px rgba(199, 21, 133, 0.15)',
            height: 'fit-content',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        },
        contactTitle: {
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#c71585',
            marginBottom: '1.5rem',
            textAlign: 'center'
        },
        contactInfo: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        },
        contactItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            border: '2px solid #e9ecef',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
        },
        contactIcon: {
            fontSize: '1.5rem',
            minWidth: '24px'
        },
        contactLink: {
            color: '#c71585',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '1rem',
            transition: 'color 0.3s ease'
        },
        contactText: {
            color: '#555',
            fontSize: '1rem'
        },
        formSection: {
            display: 'flex',
            flexDirection: 'column'
        },
        formFrame: {
            backgroundColor: 'white',
            border: '3px solid #c71585',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '12px 12px 0px rgba(199, 21, 133, 0.15)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        },
        formTitle: {
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#c71585',
            marginBottom: '1.5rem',
            textAlign: 'center'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column'
        },
        label: {
            fontSize: '0.95rem',
            fontWeight: '600',
            color: '#333',
            marginBottom: '0.5rem'
        },
        input: {
            padding: '1rem',
            border: '2px solid #e9ecef',
            borderRadius: '12px',
            fontSize: '1rem',
            fontFamily: 'inherit',
            transition: 'all 0.3s ease',
            outline: 'none'
        },
        textarea: {
            padding: '1rem',
            border: '2px solid #e9ecef',
            borderRadius: '12px',
            fontSize: '1rem',
            fontFamily: 'inherit',
            transition: 'all 0.3s ease',
            outline: 'none',
            resize: 'vertical',
            minHeight: '140px'
        },
        submitButton: {
            backgroundColor: '#c71585',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginTop: '1rem',
            background: 'linear-gradient(135deg, #c71585, #e91e63)',
            boxShadow: '0 4px 12px rgba(199, 21, 133, 0.3)'
        },
        submitButtonDisabled: {
            background: '#ccc',
            cursor: 'not-allowed',
            boxShadow: 'none'
        },
        statusMessage: {
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid #c3e6cb',
            marginBottom: '1rem',
            textAlign: 'center',
            fontSize: '0.95rem'
        },
        errorMessage: {
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid #f5c6cb',
            marginBottom: '1rem',
            textAlign: 'center',
            fontSize: '0.95rem'
        },
        formNote: {
            fontSize: '0.85rem',
            color: '#666',
            textAlign: 'center',
            marginTop: '1rem',
            fontStyle: 'italic'
        },
        copyButton: {
            background: 'none',
            border: 'none',
            color: '#c71585',
            cursor: 'pointer',
            fontSize: '0.85rem',
            textDecoration: 'underline',
            marginLeft: '0.5rem'
        }
    };

    // Form validation
    const isFormValid = formData.name.trim() && 
                       formData.email.trim() && 
                       validateEmail(formData.email) && 
                       formData.message.trim();

    const emailError = formData.email && !validateEmail(formData.email);

    return (
        <div style={styles.container} id={id}>
            <div style={styles.header}>
                📧 Get In Touch
            </div>
            
            <div style={styles.contentContainer}>
                <div style={styles.introSection}>
                    <h2 style={styles.introTitle}>Let's Connect!</h2>
                    <p style={styles.introText}>
                        I'm always excited to discuss new opportunities, collaborate on interesting projects, 
                        or simply chat about technology and innovation. Don't hesitate to reach out!
                    </p>
                </div>

                <div style={styles.contactSection}>
                    <div style={styles.directContact}>
                        <div style={styles.contactFrame}>
                            <h3 style={styles.contactTitle}>Direct Contact</h3>
                            <div style={styles.contactInfo}>
                                <div 
                                    style={{
                                        ...styles.contactItem,
                                        ':hover': { backgroundColor: '#e3f2fd' }
                                    }}
                                    onClick={copyEmail}
                                    title="Click to copy email"
                                >
                                    <span style={styles.contactIcon}>📧</span>
                                    <a href="mailto:dinhphucdat005@gmail.com" style={styles.contactLink}>
                                        dinhphucdat005@gmail.com
                                    </a>
                                    <button style={styles.copyButton} onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        copyEmail();
                                    }}>
                                        📋
                                    </button>
                                </div>
                                <div style={styles.contactItem}>
                                    <span style={styles.contactIcon}>💼</span>
                                    <span style={styles.contactText}>Open to remote opportunities</span>
                                </div>
                                <div style={styles.contactItem}>
                                    <span style={styles.contactIcon}>📍</span>
                                    <span style={styles.contactText}>Saint Paul, Minnesota</span>
                                </div>
                                <div style={styles.contactItem}>
                                    <span style={styles.contactIcon}>⚡</span>
                                    <span style={styles.contactText}>Usually responds within 24 hours</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={styles.formSection}>
                        <div style={styles.formFrame}>
                            <h3 style={styles.formTitle}>Send a Message</h3>
                            
                            {submitStatus && (
                                <div style={
                                    submitStatus.includes('wrong') || submitStatus.includes('error') 
                                        ? styles.errorMessage 
                                        : styles.statusMessage
                                }>
                                    {submitStatus}
                                </div>
                            )}

                            <div style={styles.form}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        onFocus={() => handleFocus('name')}
                                        onBlur={handleBlur}
                                        style={getInputStyle('name')}
                                        placeholder="Your full name"
                                        required
                                    />
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        onFocus={() => handleFocus('email')}
                                        onBlur={handleBlur}
                                        style={getInputStyle('email', emailError)}
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                    {emailError && (
                                        <span style={{ color: '#dc3545', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                                            Please enter a valid email address
                                        </span>
                                    )}
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        onFocus={() => handleFocus('subject')}
                                        onBlur={handleBlur}
                                        style={getInputStyle('subject')}
                                        placeholder="What's this about?"
                                    />
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Message *</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        onFocus={() => handleFocus('message')}
                                        onBlur={handleBlur}
                                        style={getTextareaStyle('message')}
                                        placeholder="Tell me about your project, opportunity, or just say hello! I'd love to hear from you."
                                        rows="5"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={!isFormValid || isSubmitting}
                                    style={{
                                        ...styles.submitButton,
                                        ...((!isFormValid || isSubmitting) ? styles.submitButtonDisabled : {}),
                                        ':hover': !isFormValid || isSubmitting ? {} : {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 6px 16px rgba(199, 21, 133, 0.4)'
                                        }
                                    }}
                                >
                                    {isSubmitting ? '📧 Opening Email Client...' : '📧 Send Message'}
                                </button>
                            </div>

                            <p style={styles.formNote}>
                                💡 This will open your default email client with the message pre-filled. 
                                Make sure you have an email client configured!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}