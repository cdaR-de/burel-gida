'use client';

import React, { useEffect, useState } from 'react';
import styles from './TableOfContents.module.scss';

interface TableOfContentsProps {
    headings: string[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-100px 0px -66% 0px',
                threshold: 0.1,
            }
        );

        headings.forEach((heading) => {
            const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [headings]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -100; // Offset for sticky header if exists
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setActiveId(id);
        }
    };

    if (headings.length === 0) return null;

    return (
        <div className={styles.tocCard}>
            <h3 className={styles.tocTitle}>Table of Contents</h3>
            <ul className={styles.tocList}>
                {headings.map((heading, index) => {
                    const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    return (
                        <li key={index} className={styles.tocItem}>
                            <a
                                href={`#${id}`}
                                className={activeId === id ? styles.active : ''}
                                onClick={(e) => handleClick(e, id)}
                            >
                                {heading}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
