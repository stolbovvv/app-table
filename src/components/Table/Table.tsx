import { observer } from 'mobx-react-lite';
import { v4 as uuidv4 } from 'uuid';
import { type Planet } from '@/entities/planetsTypes';
import { planetsStore } from '@/models/planetsStore';
import { ReactComponent as IconTrash } from '@/assets/icon-trash.svg';
import styles from './Table.module.css';
import { ReactComponent as IconSortAsc } from '@/assets/icon-sort-asc.svg';
import { ReactComponent as IconSortDesc } from '@/assets/icon-sort-desc.svg';

interface TableHeading {
	id: string;
	filed: keyof Omit<Planet, 'id'>;
	label: string;
}

const tableHeadings: TableHeading[] = [
	{ id: uuidv4(), filed: 'name', label: 'Название' },
	{ id: uuidv4(), filed: 'climate', label: 'Климат' },
	{ id: uuidv4(), filed: 'terrain', label: 'Местность' },
	{ id: uuidv4(), filed: 'diameter', label: 'Диаметр' },
	{ id: uuidv4(), filed: 'population', label: 'Население' },
];

export const Table = observer(function Table() {
	const { state, openDeletingDialog, sortPlanets } = planetsStore;

	const isLoading = state.isLoading;
	const isError = !state.isLoading && state.error;
	const isData = !state.isLoading && !state.error && state.data.results.length > 0;

	return (
		<div className={styles.table} role="table">
			<div className={styles.table__head}>
				<div className={styles['table__head-row']}>
					{tableHeadings.map(({ filed, id, label }) => (
						<TableHeading key={id} filed={filed} label={label} onClick={() => sortPlanets(filed)} />
					))}
				</div>
			</div>
			<div className={styles.table__body}>
				{isLoading && <p className={styles.table__loading}>Загрузка данных...</p>}
				{isError && <p className={styles.table__error}>Ошибка: {state.error}</p>}
				{isData
					? state.data.results.map((planet) => (
							<div className={styles['table__body-row']} key={planet.id}>
								<div className={styles['table__body-cell']}>{planet.name}</div>
								<div className={styles['table__body-cell']}>{planet.climate}</div>
								<div className={styles['table__body-cell']}>{planet.terrain}</div>
								<div className={styles['table__body-cell']}>{planet.diameter}</div>
								<div className={styles['table__body-cell']}>{planet.population}</div>
								<button
									className={styles['table__body-delete']}
									onClick={() => {
										openDeletingDialog(planet.id);
									}}
								>
									<IconTrash />
								</button>
							</div>
						))
					: !isLoading && !isError && <p className={styles.table__message}>Нет данных</p>}
			</div>
		</div>
	);
});

interface TableHeadingProps extends Omit<TableHeading, 'id'> {
	onClick: () => void;
}

const TableHeading = observer(function TableHeading({ filed, label, onClick }: TableHeadingProps) {
	const { state } = planetsStore;

	let icon = null;

	if (state.sorting.direction === 'asc') icon = <IconSortAsc />;
	if (state.sorting.direction === 'desc') icon = <IconSortDesc />;

	return (
		<button className={styles['table__head-cell']} onClick={onClick}>
			{label}
			{state.sorting.field === filed && icon}
		</button>
	);
});
