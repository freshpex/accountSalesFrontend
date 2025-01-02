'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Header from './components/Header';
import Footer from './components/Footer';
import PricingSection from './components/pricingSection';

export default function Home() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <>
        <Header />
            <div className={styles.container}>
                {/* Hero Section */}
                <motion.section 
                    className={styles.hero}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Replace with your hero image showing your product/service */}
                    <div className={styles.heroImage}>
                        {/* Add a high-quality lifestyle/product image here */}
                        <img 
                            src="/dummy-hero.jpg" 
                            alt="Hero"
                            className={styles.mainImage}
                        />
                    </div>
                    
                    <motion.div 
                        className={styles.heroContent}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h1>Transform Your Digital Presence</h1>
                        <p>Elevate your business with our innovative solutions</p>
                        <button className={styles.ctaButton}>Get Started</button>
                    </motion.div>
                </motion.section>

                {/* Features Grid */}
                <section className={styles.features}>
                    {/* Add 3-4 feature cards with icons/illustrations */}
                    {[1, 2, 3].map((item) => (
                        <motion.div
                            key={item}
                            className={styles.featureCard}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: item * 0.1 }}
                        >
                            <img 
                                src={`/feature-${item}.svg`} 
                                alt={`Feature ${item}`}
                                className={styles.featureIcon}
                            />
                            <h3>Feature {item}</h3>
                            <p>Description of amazing feature goes here</p>
                        </motion.div>
                    ))}
                </section>

                {/* Social Proof Section */}
                <motion.section 
                    className={styles.testimonials}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    {/* Add customer testimonials with profile pictures */}
                    <div className={styles.testimonialGrid}>
                        {/* Replace with actual customer testimonials */}
                        <div className={styles.testimonialCard}>
                            <img src="/avatar1.jpg" alt="Customer" />
                            <p>Incredible service that transformed our business!</p>
                            <h4>John Doe</h4>
                            <span>CEO, Tech Corp</span>
                        </div>
                    </div>
                </motion.section>

                {/* Call to Action */}
                <motion.section 
                    className={styles.cta}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2>Ready to Get Started?</h2>
                    <p>Join thousands of satisfied customers today</p>
                    <button className={styles.ctaButton}>Start Free Trial</button>
                </motion.section>
                <PricingSection />
            </div>
            <Footer />
        </>
    );
}