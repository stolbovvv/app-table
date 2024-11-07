import styles from './App.module.css';
import { Footer, Header, Table } from '@/components';

export function App() {
	return (
		<>
			<div className={styles.app}>
				<Header />
				<main>
					<Table />
				</main>
				<Footer />
			</div>
		</>
	);
}
