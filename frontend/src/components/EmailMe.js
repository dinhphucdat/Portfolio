import React, {useState, useEffect} from "react";

export default function EmailMe({id}) {
    const [formData, setFormData] = useState(
        {
            name: '', email: '', subject: '', message: ''
        }
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 600);
        };
    
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        
            setFormData(prev => ({
                ...prev, [name]: value
            }));
        
    };

    const handleSubmit = () => {
        setIsSubmitting(true);

        // create mailto link
        const subject = encodeURIComponent(formData.subject || 'Contact from Portfolio');
        const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        );
        const mailtoLink = `mailto:dinhphucdat005@gmail.com?subject=${subject}&body=${body}`;

        // open email client
        window.location.href = mailtoLink;

        // Show success message
        setSubmitStatus('Email client opened! Thank you for reaching out.');

        // Reset form after a delay
        setTimeout(() => {
            setFormData({ name: '', email: '', subject: '', message: '' });
            setSubmitStatus('');
            setIsSubmitting(false);
        }, 3000);
    };

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
            marginBottom: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
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
            fontSize: '2.2rem',
            fontWeight: '600',
            color: '#c71585',
            marginBottom: '1rem'
        },
        introText: {
            fontSize: '1.1rem',
            color: '#555',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
        },
        contactSection: {
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '2rem'
        },
        directContact: {
            display: 'flex',
            flexDirection: 'column'
        },
        contactFrame: {
            backgroundColor: 'white',
            border: '4px solid #c71585',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '8px 8px 0px rgba(199, 21, 133, 0.2)',
            height: 'fit-content'
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
            padding: '0.75rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '2px solid #e9ecef'
        },
        contactIcon: {
            fontSize: '1.5rem'
        },
        contactLink: {
            color: '#c71585',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '1rem'
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
            border: '4px solid #c71585',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '8px 8px 0px rgba(199, 21, 133, 0.2)'
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
            gap: '1rem'
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column'
        },
        label: {
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#333',
            marginBottom: '0.5rem'
        },
        input: {
            padding: '0.75rem',
            border: '2px solid #e9ecef',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: '"Open Sans", sans-serif',
            transition: 'border-color 0.3s ease',
            outline: 'none'
        },
        textarea: {
            padding: '0.75rem',
            border: '2px solid #e9ecef',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: '"Open Sans", sans-serif',
            transition: 'border-color 0.3s ease',
            outline: 'none',
            resize: 'vertical',
            minHeight: '120px'
        },
        submitButton: {
            backgroundColor: '#c71585',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginTop: '1rem'
        },
        submitButtonDisabled: {
            backgroundColor: '#ccc',
            cursor: 'not-allowed'
        },
        statusMessage: {
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid #c3e6cb',
            marginBottom: '1rem',
            textAlign: 'center'
        },
        formNote: {
            fontSize: '0.85rem',
            color: '#666',
            textAlign: 'center',
            marginTop: '1rem',
            fontStyle: 'italic'
        }
    };

    const isFormValid = formData.name && formData.email && formData.message;

    return (
        <div style={styles.container} id={id}>
            <div style={styles.header}>
                Email Me
            </div>
            
            <div style={styles.contentContainer}>
                <div style={styles.introSection}>
                    <h2 style={styles.introTitle}>Let's Connect!</h2>
                    <p style={styles.introText}>
                        I'm always interested in discussing new opportunities, collaborations, 
                        or just having a conversation about technology and innovation. 
                        Feel free to reach out!
                    </p>
                </div>

                <div style={styles.contactSection} className="contact-section">
                    <div style={styles.directContact}>
                        <div style={styles.contactFrame}>
                            <h3 style={styles.contactTitle}>Quick Contact</h3>
                            <div style={styles.contactInfo}>
                                <div style={styles.contactItem}>
                                    <span style={styles.contactIcon}>📧</span>
                                    <a href="mailto:dinhphucdat005@gmail.com" style={styles.contactLink}>
                                        dinhphucdat005@gmail.com
                                    </a>
                                </div>
                                <div style={styles.contactItem}>
                                    <span style={styles.contactIcon}>📱</span>
                                    <span style={styles.contactText}>Available for remote opportunities</span>
                                </div>
                                <div style={styles.contactItem}>
                                    <span style={styles.contactIcon}>🌍</span>
                                    <span style={styles.contactText}>Based in Saint Paul, MN</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={styles.formSection}>
                        <div style={styles.formFrame}>
                            <h3 style={styles.formTitle}>Send a Message</h3>
                            
                            {submitStatus && (
                                <div style={styles.statusMessage}>
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
                                        style={styles.input}
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
                                        style={styles.input}
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        placeholder="What's this about?"
                                    />
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Message *</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        style={styles.textarea}
                                        placeholder="Tell me about your project, opportunity, or just say hello!"
                                        rows="5"
                                        required
                                    />
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={!isFormValid || isSubmitting}
                                    style={{
                                        ...styles.submitButton,
                                        ...((!isFormValid || isSubmitting) ? styles.submitButtonDisabled : {})
                                    }}
                                >
                                    {isSubmitting ? '📧 Opening Email...' : '📧 Send Message'}
                                </button>
                            </div>

                            <p style={styles.formNote}>
                                * This will open your default email client with the message pre-filled
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

