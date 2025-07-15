import styles from './Expertise.module.css';
import { FaPython, FaJava, FaJs, FaCode } from 'react-icons/fa';
import { SiFlask, SiScikitlearn, SiOpencv, SiMongodb, SiMysql, SiTensorflow } from 'react-icons/si';

export default function Expertise() {
  return (
    <section id="expertise" className={styles.expertise}>
      <h2 className={styles.heading}>Expertise</h2>

      <div className={styles.block}>
        <h3 className={styles.subheading}>Languages</h3>
        <div className={styles.row}>
          <Skill label="Python" icon={<FaPython />} />
          <Skill label="Java" icon={<FaJava />} />
          <Skill label="JavaScript" icon={<FaJs />} />
        </div>
      </div>

      <div className={styles.block}>
        <h3 className={styles.subheading}>Frameworks & Libraries</h3>
        <div className={styles.row}>
          <Skill label="Flask" icon={<SiFlask />} />
          <Skill label="Scikit-learn" icon={<SiScikitlearn />} />
          <Skill label="OpenCV" icon={<SiOpencv />} />
          <Skill label="YOLOv8" icon={<FaCode />} />
          <Skill label="TensorFlow / PyTorch" icon={<SiTensorflow />} />
        </div>
      </div>

      <div className={styles.block}>
        <h3 className={styles.subheading}>DataBase</h3>
        <div className={styles.row}>
          <Skill label="MySQL" icon={<SiMysql />} />
          <Skill label="MongoDB" icon={<SiMongodb />} />
        </div>
      </div>
    </section>
  );
}

function Skill({ label, icon }) {
  return (
    <div className={styles.skillItem}>
      <span className={styles.icon}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}
