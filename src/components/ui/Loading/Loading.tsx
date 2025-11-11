import React from 'react';
import styles from './Loading.module.scss';

export type LoadingSize = 'small' | 'medium' | 'large';

export interface LoadingProps {
  size?: LoadingSize;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  className = ''
}) => {
  const classNames = [
    styles.spinner,
    styles[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="status" aria-label="Loading">
      <span className={styles.srOnly}>Loading...</span>
    </div>
  );
};
