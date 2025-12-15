import Link from 'next/link';
import { Button } from '@/components/ui';
import styles from './not-found.module.scss';

export default function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>404</h1>
                <h2 className={styles.subtitle}>Page Not Found</h2>
                <p className={styles.description}>
                    The page you are looking for does not exist or has been moved.
                </p>
                <Link href="/">
                    <Button variant="primary" size="large">
                        Return Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}
