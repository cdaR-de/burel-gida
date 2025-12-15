'use client';

import React from 'react';
import { Button, Input } from '@/components/ui';
import { Textarea } from '@/components/ui/Textarea';
import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/lib/translations';
import styles from './page.module.scss';

export default function ContactPage() {
    const { locale } = useLocale();
    const t = translations[locale].contact;

    React.useEffect(() => {
        document.title = `${t.hero.title} | ${locale === 'tr' ? 'Gıda Güvenliği' : 'Food Safety'}`;
    }, [locale, t.hero.title]);

    return (
        <div className={styles.contactPage}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <h1>{t.hero.title}</h1>
                    <p className={styles.subtitle}>
                        {t.hero.subtitle}
                    </p>
                </div>
            </section>

            <div className={styles.container}>
                <div className={styles.contentWrapper}>
                    {/* Contact Info */}
                    <div className={styles.infoSection}>
                        <div className={styles.infoCard}>
                            <h2>{t.info.title}</h2>
                            <div className={styles.contactDetails}>
                                <div className={styles.contactItem}>
                                    <div className={styles.icon}>📍</div>
                                    <div className={styles.details}>
                                        <h3>{t.info.visit.title}</h3>
                                        <p>{t.info.visit.address1}</p>
                                        <p>{t.info.visit.address2}</p>
                                    </div>
                                </div>

                                <div className={styles.contactItem}>
                                    <div className={styles.icon}>📧</div>
                                    <div className={styles.details}>
                                        <h3>{t.info.email.title}</h3>
                                        <p>{t.info.email.general} <a href="mailto:info@foodsafety.com">info@foodsafety.com</a></p>
                                        <p>{t.info.email.support} <a href="mailto:support@foodsafety.com">support@foodsafety.com</a></p>
                                    </div>
                                </div>

                                <div className={styles.contactItem}>
                                    <div className={styles.icon}>📞</div>
                                    <div className={styles.details}>
                                        <h3>{t.info.call.title}</h3>
                                        <p>{t.info.call.main} <a href="tel:+15551234567">+1 (555) 123-4567</a></p>
                                        <p>{t.info.call.support} <a href="tel:+15559876543">+1 (555) 987-6543</a></p>
                                    </div>
                                </div>

                                <div className={styles.contactItem}>
                                    <div className={styles.icon}>⏰</div>
                                    <div className={styles.details}>
                                        <h3>{t.info.hours.title}</h3>
                                        <p>{t.info.hours.weekdays}</p>
                                        <p>{t.info.hours.weekend}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className={styles.formCard}>
                        <h2>{t.form.title}</h2>
                        <p>{t.form.subtitle}</p>

                        <form className={styles.form}>
                            <div className={styles.formRow}>
                                <Input
                                    label={t.form.firstName}
                                    placeholder="John"
                                    fullWidth
                                    required
                                />
                                <Input
                                    label={t.form.lastName}
                                    placeholder="Doe"
                                    fullWidth
                                    required
                                />
                            </div>

                            <Input
                                label={t.form.email}
                                type="email"
                                placeholder="john@example.com"
                                fullWidth
                                required
                            />

                            <Input
                                label={t.form.subject}
                                placeholder={t.form.subjectPlaceholder}
                                fullWidth
                                required
                            />

                            <Textarea
                                label={t.form.message}
                                placeholder={t.form.messagePlaceholder}
                                fullWidth
                                required
                                rows={5}
                            />

                            <Button type="submit" size="large" fullWidth>
                                {t.form.submit}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Map Section */}
                <div className={styles.mapSection}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564756836!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        title="Office Location"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
