import styles from './Experience.module.css';

export default function Experience() {
  return (
    <section id="experience" className={styles.experience}>
      <h2 className={styles.heading}>Experience</h2>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.date}>May 2025 – July 2025</div>
          <h3 className={styles.title}>Intern @ Zettaone Technologies</h3>
          <p className={styles.desc}>
            Worked on real-world AI applications, learned production-level development
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.date}>2025 – 2027</div>
          <h3 className={styles.title}>Student Research & Projects</h3>
          <p className={styles.desc}>
            Created Climora, Periodontal AI Detector, and other smart tools using AI & full-stack dev.
            Focused on real-world problems and clean interfaces.
          </p>
        </div>
      </div>

      {/* 🎓 Education Section */}
      <h2 className={styles.heading}>Education</h2>

      <div className={styles.grid}>
        {/* College Card */}
        <div className={styles.card}>
          <h3 className={styles.title}>CSE (Artificial Intelligence & Machine Learning)</h3>
          <p className={styles.desc}>KPR Institute of Engineering and Technology</p>

          <div className={styles.eduRow}>
            <span className={styles.date}>2023 – 2027</span>
            <span className={styles.location}>Coimbatore, Tamil Nadu</span>
          </div>
        </div>

        {/* School Card */}
        <div className={styles.card}>
          <h3 className={styles.title}>Central Board of Secondary Education</h3>
          <p className={styles.desc}>Sri Vijay Vidyashram CBSE School</p>

          <div className={styles.eduRow}>
            <span className={styles.date}>2011 – 2023</span>
            <span className={styles.location}>Dharmapuri, Tamil Nadu</span>
          </div>
        </div>
      </div>
    </section>
  );
}
