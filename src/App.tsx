import { observer } from 'mobx-react-lite';
import styles from './App.module.css';
import { Dialog, Footer, Header, Pagination, Table } from '@/components';
import { planetsStore } from './models/planetsStore';

export const App = observer(function App() {
	const { state } = planetsStore;

	return (
		<>
			<div className={styles.app}>
				<Header />
				<main>
					<Table />
					{state.data.results.length > 0 && <Pagination />}
				</main>
				<Footer />
			</div>
			<Dialog />
		</>
	);
});
