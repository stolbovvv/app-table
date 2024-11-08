import { observer } from 'mobx-react-lite';
import { planetsStore } from '@/models/planetsStore';
import { Button } from '../Button/Button';
import styles from './Header.module.css';

export const Header = observer(function Header() {
	const { state, cleanPlanets, fetchPlanets } = planetsStore;

	const handleCleanClick = () => {
		cleanPlanets();
	};

	const handleFetchClick = () => {
		fetchPlanets();
	};

	return (
		<header className={styles.header}>
			<div className={styles.header__masthead}>
				<h1 className={styles.header__heading}>App Table</h1>
				<p className={styles.header__summary}>React приложение для вывода данных в табличном виде</p>
			</div>
			<div className={styles.header__controls}>
				<Button theme="danger" disabled={state.isLoading} onClick={handleCleanClick}>
					Очистить
				</Button>
				<Button theme="success" disabled={state.isLoading} onClick={handleFetchClick}>
					Загрузить
				</Button>
			</div>
		</header>
	);
});
