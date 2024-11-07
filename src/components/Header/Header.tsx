import { Button } from '../Button/Button';
import styles from './Header.module.css';

export function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.header__masthead}>
				<h1 className={styles.header__heading}>App Table</h1>
				<p className={styles.header__summary}>React приложение для вывода данных в табличном виде</p>
			</div>
			<div className={styles.header__controls}>
				<Button theme="danger">Очистить</Button>
				<Button theme="success">Загрузить</Button>
			</div>
		</header>
	);
}
