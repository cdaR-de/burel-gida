'use client';

import { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui';
import styles from './FAQItem.module.scss';

interface FAQItemProps {
  question: string;
  answer: string;
  category: string;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export function FAQItem({ 
  question, 
  answer, 
  category, 
  isExpanded = false,
  onToggle 
}: FAQItemProps) {
  const [expanded, setExpanded] = useState(isExpanded);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(0);

  useEffect(() => {
    setExpanded(isExpanded);
  }, [isExpanded]);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(expanded ? contentRef.current.scrollHeight : 0);
    }
  }, [expanded]);

  const handleToggle = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    if (onToggle) {
      onToggle();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className={styles.faqItem}>
      <button
        className={styles.question}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={expanded}
        aria-controls={`faq-answer-${question}`}
        type="button"
      >
        <div className={styles.questionContent}>
          <h3 className={styles.questionText}>{question}</h3>
          <Badge variant="secondary" size="small">
            {category}
          </Badge>
        </div>
        <svg
          className={`${styles.icon} ${expanded ? styles.iconExpanded : ''}`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        className={styles.answerWrapper}
        style={{ height: `${height}px` }}
        aria-hidden={!expanded}
      >
        <div
          ref={contentRef}
          id={`faq-answer-${question}`}
          className={styles.answer}
        >
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}
