import React from 'react';
import Image from 'next/image';
import { CertificationDisplay } from '@/components/content';
import { Card } from '@/components/ui';
import styles from './page.module.scss';

export const metadata = {
  title: 'About Us | Food Safety Excellence',
  description: 'Learn about our mission, vision, and commitment to food safety excellence. Meet our team and partners.',
};

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>About Us</h1>
          <p className={styles.subtitle}>
            Committed to excellence in food safety education and compliance
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.visionMission}>
            <div className={styles.visionMissionItem}>
              <div className={styles.icon}>🎯</div>
              <h2>Our Vision</h2>
              <p>
                To be the leading resource for food safety education and compliance,
                empowering individuals and organizations to maintain the highest
                standards of food safety across all sectors.
              </p>
            </div>
            <div className={styles.visionMissionItem}>
              <div className={styles.icon}>🚀</div>
              <h2>Our Mission</h2>
              <p>
                To provide accessible, comprehensive, and up-to-date food safety
                information, resources, and guidance that help protect public health
                and support compliance with international standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Story</h2>
          <Card className={styles.storyCard}>
            <p>
              Founded with a passion for food safety and public health, our organization
              has been at the forefront of food safety education for years. We recognized
              the need for accessible, reliable information that bridges the gap between
              complex regulations and practical implementation.
            </p>
            <p>
              What started as a small initiative to help local food businesses understand
              HACCP principles has grown into a comprehensive platform serving consumers,
              professionals, producers, and restaurant owners worldwide.
            </p>
            <p>
              Today, we continue to evolve, incorporating the latest research, regulatory
              updates, and best practices to ensure our community has access to the most
              current and relevant food safety information.
            </p>
          </Card>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Values</h2>
          <div className={styles.valuesGrid}>
            <Card className={styles.valueCard}>
              <div className={styles.valueIcon}>🔍</div>
              <h3>Accuracy</h3>
              <p>
                We ensure all information is thoroughly researched, verified, and
                aligned with current regulations and scientific evidence.
              </p>
            </Card>
            <Card className={styles.valueCard}>
              <div className={styles.valueIcon}>🤝</div>
              <h3>Accessibility</h3>
              <p>
                We make complex food safety concepts understandable and actionable
                for everyone, regardless of their background.
              </p>
            </Card>
            <Card className={styles.valueCard}>
              <div className={styles.valueIcon}>💡</div>
              <h3>Innovation</h3>
              <p>
                We continuously improve our platform and content to meet the
                evolving needs of the food safety community.
              </p>
            </Card>
            <Card className={styles.valueCard}>
              <div className={styles.valueIcon}>🌍</div>
              <h3>Integrity</h3>
              <p>
                We maintain the highest ethical standards in all our operations
                and communications, building trust with our community.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Certifications</h2>
          <p className={styles.sectionDescription}>
            We maintain the highest standards of food safety compliance through our certifications
          </p>
          <div className={styles.certificationsGrid}>
            <CertificationDisplay
              name="ISO 22000:2018"
              issuer="International Organization for Standardization"
              date={new Date('2023-06-15')}
              image="/images/certifications/iso-22000.svg"
              verificationUrl="https://www.iso.org/standard/65464.html"
            />
            <CertificationDisplay
              name="HACCP Certification"
              issuer="Food Safety Authority"
              date={new Date('2023-03-20')}
              image="/images/certifications/haccp.svg"
            />
            <CertificationDisplay
              name="Food Safety Management"
              issuer="Global Food Safety Initiative"
              date={new Date('2023-09-10')}
              image="/images/certifications/gfsi.svg"
              verificationUrl="https://mygfsi.com/"
            />
            <CertificationDisplay
              name="Quality Management ISO 9001"
              issuer="International Organization for Standardization"
              date={new Date('2023-01-15')}
              image="/images/certifications/iso-9001.svg"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Team</h2>
          <p className={styles.sectionDescription}>
            Meet the experts dedicated to food safety excellence
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
              <p className={styles.teamRole}>Chief Food Safety Officer</p>
              <p className={styles.teamQualifications}>
                Ph.D. in Food Science, HACCP Lead Auditor, 15+ years experience
              </p>
              <div className={styles.teamSocial}>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <span>in</span>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <span>𝕏</span>
                </a>
              </div>
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
              <p className={styles.teamRole}>Technical Director</p>
              <p className={styles.teamQualifications}>
                M.Sc. Food Technology, ISO 22000 Lead Implementer, 12+ years experience
              </p>
              <div className={styles.teamSocial}>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <span>in</span>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <span>𝕏</span>
                </a>
              </div>
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
              <p className={styles.teamRole}>Education Coordinator</p>
              <p className={styles.teamQualifications}>
                B.Sc. Nutrition, Certified Food Safety Trainer, 8+ years experience
              </p>
              <div className={styles.teamSocial}>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <span>in</span>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <span>𝕏</span>
                </a>
              </div>
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
              <p className={styles.teamRole}>Compliance Specialist</p>
              <p className={styles.teamQualifications}>
                M.Sc. Food Safety, GFSI Auditor, 10+ years experience
              </p>
              <div className={styles.teamSocial}>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <span>in</span>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <span>𝕏</span>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Partners</h2>
          <p className={styles.sectionDescription}>
            Collaborating with leading organizations to advance food safety
          </p>
          <div className={styles.partnersGrid}>
            <Card className={styles.partnerCard}>
              <div className={styles.partnerLogo}>
                <Image 
                  src="/images/partners/gfsi-logo.svg" 
                  alt="Global Food Safety Initiative" 
                  width={200}
                  height={80}
                />
              </div>
              <h3>Global Food Safety Initiative</h3>
              <p>
                Collaborating on harmonizing food safety standards and promoting
                best practices across the global food supply chain.
              </p>
            </Card>

            <Card className={styles.partnerCard}>
              <div className={styles.partnerLogo}>
                <Image 
                  src="/images/partners/fao-logo.svg" 
                  alt="Food and Agriculture Organization" 
                  width={200}
                  height={80}
                />
              </div>
              <h3>Food and Agriculture Organization</h3>
              <p>
                Working together to improve food safety knowledge and practices
                in developing regions and support sustainable food systems.
              </p>
            </Card>

            <Card className={styles.partnerCard}>
              <div className={styles.partnerLogo}>
                <Image 
                  src="/images/partners/codex-logo.svg" 
                  alt="Codex Alimentarius" 
                  width={200}
                  height={80}
                />
              </div>
              <h3>Codex Alimentarius Commission</h3>
              <p>
                Supporting the development and implementation of international
                food standards, guidelines, and codes of practice.
              </p>
            </Card>

            <Card className={styles.partnerCard}>
              <div className={styles.partnerLogo}>
                <Image 
                  src="/images/partners/university-logo.svg" 
                  alt="Food Science University" 
                  width={200}
                  height={80}
                />
              </div>
              <h3>International Food Science Institute</h3>
              <p>
                Partnering on research initiatives and educational programs to
                advance food safety science and technology.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
