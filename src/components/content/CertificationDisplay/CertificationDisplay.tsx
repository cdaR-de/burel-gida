import React from 'react';
import Image from 'next/image';
import styles from './CertificationDisplay.module.scss';

export interface CertificationDisplayProps {
  name: string;
  issuer: string;
  date: Date | string;
  image?: string;
  verificationUrl?: string;
}

export const CertificationDisplay: React.FC<CertificationDisplayProps> = ({
  name,
  issuer,
  date,
  image,
  verificationUrl
}) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });

  return (
    <div className={styles.certification}>
      <div className={styles.imageWrapper}>
        {image ? (
          <Image 
            src={image} 
            alt={name}
            width={120}
            height={120}
            style={{ objectFit: 'contain' }}
          />
        ) : (
          <span className={styles.placeholder}>🏆</span>
        )}
      </div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.issuer}>{issuer}</p>
      <p className={styles.date}>{formattedDate}</p>
      {verificationUrl && (
        <a 
          href={verificationUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.verifyLink}
        >
          Verify Certificate
        </a>
      )}
    </div>
  );
};
