import { observer } from 'mobx-react-lite';
import { planetsStore } from '@/models/planetsStore';
import styles from './Table.module.css';

export const Table = observer(function Table() {
	const { state } = planetsStore;

	const isLoading = state.isLoading;
	const isError = !state.isLoading && state.error;
	const isData = !state.isLoading && !state.error && state.data.results.length > 0;

	return (
		<div className={styles.table} role="table">
			<div className={styles.table__head}>
				<div className={styles['table__head-row']}>
					<div className={styles['table__head-cell']}>Название</div>
					<div className={styles['table__head-cell']}>Климат</div>
					<div className={styles['table__head-cell']}>Местность</div>
					<div className={styles['table__head-cell']}>Диаметр</div>
					<div className={styles['table__head-cell']}>Население</div>
				</div>
			</div>
			<div className={styles.table__body}>
				{isLoading && <p className={styles.table__loading}>Загрузка данных...</p>}
				{isError && <p className={styles.table__error}>{state.error}</p>}
				{isData
					? state.data.results.map((planet) => (
							<div className={styles['table__body-row']} key={planet.name}>
								<div className={styles['table__body-cell']}>{planet.name}</div>
								<div className={styles['table__body-cell']}>{planet.climate}</div>
								<div className={styles['table__body-cell']}>{planet.terrain}</div>
								<div className={styles['table__body-cell']}>{planet.diameter}</div>
								<div className={styles['table__body-cell']}>{planet.population}</div>
							</div>
						))
					: !isLoading && <p className={styles.table__message}>Нет данных</p>}
			</div>
		</div>
	);
});
