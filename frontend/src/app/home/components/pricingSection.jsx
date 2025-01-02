'use client';
import { motion } from 'framer-motion';
import styles from '../Home.module.css';

const PricingSection = () => (
    <motion.section 
        className={styles.pricing}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
    >
        <h2>Simple, Transparent Pricing</h2>
        <div className={styles.pricingGrid}>
            {['Basic', 'Pro', 'Enterprise'].map((tier, index) => (
                <motion.div 
                    key={tier}
                    className={styles.pricingCard}
                    initial={{ y: 50 }}
                    whileInView={{ y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                >
                    <h3>{tier}</h3>
                    <div className={styles.price}>
                        <span>$</span>
                        {[9, 29, 99][index]}
                        <span>/mo</span>
                    </div>
                    <ul>
                        <li>Feature 1</li>
                        <li>Feature 2</li>
                        <li>Feature 3</li>
                    </ul>
                    <button className={styles.selectButton}>Select Plan</button>
                </motion.div>
            ))}
        </div>
    </motion.section>
);

export default PricingSection;