'use client';

import Navigation from '@/components/layout/Navigation';
import styles from './layout.module.css';
import { temas } from '@/data/temas';
import { useState } from 'react';

export default function TemasLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className={styles.container}>
            {/* Hamburger Button (Visible only on mobile) */}
            <button
                className={styles.hamburger}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                aria-label="Abrir menú"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </button>

            {/* Backdrop for mobile */}
            {isSidebarOpen && (
                <div
                    className={styles.backdrop}
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
                <Navigation themes={temas} onNavClick={() => setIsSidebarOpen(false)} />
            </aside>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}
