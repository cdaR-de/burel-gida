'use client';

import React from 'react';
import Image from 'next/image';
import { CertificationDisplay } from '@/components/content';
import { Card } from '@/components/ui';
import { useLocale } from '@/contexts/LocaleContext';
import { translations } from '@/lib/translations';
import styles from './page.module.scss';

export default function AboutPage() {
  const { locale } = useLocale();
  const t = translations[locale].about;

  React.useEffect(() => {
    document.title = `${t.hero.title} | ${locale === 'tr' ? 'Gıda Güvenliği' : 'Food Safety'}`;
  }, [locale, t.hero.title]);

  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>{t.hero.title}</h1>
          <p className={styles.subtitle}>
            {t.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>15+</span>
              <span className={styles.statLabel}>{t.stats.years}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>50k+</span>
              <span className={styles.statLabel}>{t.stats.trained}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>100+</span>
              <span className={styles.statLabel}>{t.stats.partners}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>{t.stats.support}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section - Split Layout */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.splitLayout}>
            <div className={styles.splitContent}>
              <h2 className={styles.sectionTitle}>{t.story.title}</h2>
              <p className={styles.leadText}>
                {t.story.lead}
              </p>
              <p>
                {t.story.p1}
              </p>
              <p>
                {t.story.p2}
              </p>
            </div>
            <div className={styles.splitImage}>
              <div className={styles.imageWrapper}>
                {/* 
                  TODO: Replace with generated image when quota allows.
                  Using a styled placeholder for now.
                */}
                <div className={styles.placeholderImage} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission - Side by Side */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.visionMissionGrid}>
            <div className={styles.visionItem}>
              <h2>{t.vision.title}</h2>
              <p>
                {t.vision.description}
              </p>
            </div>
            <div className={styles.missionItem}>
              <h2>{t.mission.title}</h2>
              <p>
                {t.mission.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t.values.title}</h2>
          <div className={styles.valuesGrid}>
            <Card className={styles.valueCard}>
              <h3>{t.values.accuracy.title}</h3>
              <p>
                {t.values.accuracy.desc}
              </p>
            </Card>
            <Card className={styles.valueCard}>
              <h3>{t.values.accessibility.title}</h3>
              <p>
                {t.values.accessibility.desc}
              </p>
            </Card>
            <Card className={styles.valueCard}>
              <h3>{t.values.innovation.title}</h3>
              <p>
                {t.values.innovation.desc}
              </p>
            </Card>
            <Card className={styles.valueCard}>
              <h3>{t.values.integrity.title}</h3>
              <p>
                {t.values.integrity.desc}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t.team.title}</h2>
          <p className={styles.sectionDescription}>
            {t.team.subtitle}
          </p>
          <div className={styles.teamGrid}>
            <Card className={styles.teamCard}>
              <div className={styles.teamAvatar}>
                <Image
                  src="/images/team/member-1.jpg"
                  alt="Dr. Sarah Johnson"
                  width={120}
                  height={120}
                />
              </div>
              <h3>Dr. Sarah Johnson</h3>
              <p className={styles.teamRole}>{t.team.roles.chief}</p>
              <p className={styles.teamQualifications}>
                Ph.D. Food Science • 15+ Years Exp.
              </p>
            </Card>

            <Card className={styles.teamCard}>
              <div className={styles.teamAvatar}>
                <Image
                  src="/images/team/member-2.jpg"
                  alt="Michael Chen"
                  width={120}
                  height={120}
                />
              </div>
              <h3>Michael Chen</h3>
              <p className={styles.teamRole}>{t.team.roles.tech}</p>
              <p className={styles.teamQualifications}>
                M.Sc. Food Tech • ISO 22000 Lead
              </p>
            </Card>

            <Card className={styles.teamCard}>
              <div className={styles.teamAvatar}>
                <Image
                  src="/images/team/member-3.jpg"
                  alt="Emma Williams"
                  width={120}
                  height={120}
                />
              </div>
              <h3>Emma Williams</h3>
              <p className={styles.teamRole}>{t.team.roles.edu}</p>
              <p className={styles.teamQualifications}>
                Certified Trainer • Nutrition Expert
              </p>
            </Card>

            <Card className={styles.teamCard}>
              <div className={styles.teamAvatar}>
                <Image
                  src="/images/team/member-4.jpg"
                  alt="David Martinez"
                  width={120}
                  height={120}
                />
              </div>
              <h3>David Martinez</h3>
              <p className={styles.teamRole}>{t.team.roles.compliance}</p>
              <p className={styles.teamQualifications}>
                GFSI Auditor • Safety Strategist
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>{t.cta.title}</h2>
            <p>
              {t.cta.description}
            </p>
            <a href="/contact" className={styles.ctaButton}>
              {t.cta.button}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
