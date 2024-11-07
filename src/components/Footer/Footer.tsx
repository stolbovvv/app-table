import styles from './Footer.module.css';

export function Footer() {
	return (
		<footer className={styles.footer}>
			<p className={styles.footer__text}>2024</p>
			<p className={styles.footer__text}>React</p>
		</footer>
	);
}
