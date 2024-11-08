import { observer } from 'mobx-react-lite';
import { planetsStore } from '@/models/planetsStore';
import { Button } from '../Button/Button';
import styles from './Pagination.module.css';

export const Pagination = observer(function Pagination() {
	const { state, fetchPlanets } = planetsStore;

	const buttonArr = Array.from({ length: Math.floor(state.data.count / 10) }, (_, index) => index + 1);

	return (
		<div className={styles.pagination}>
			<Button
				theme="primary"
				size="small"
				disabled={!state.data.previous}
				onClick={() => fetchPlanets(getPageNumber(state.data.previous))}
			>
				Prev
			</Button>

			{buttonArr.map((number, index) => (
				<Button theme="primary" size="small" key={index} onClick={() => fetchPlanets(`${number}`)}>
					{number}
				</Button>
			))}

			<Button
				theme="primary"
				size="small"
				disabled={!state.data.next}
				onClick={() => fetchPlanets(getPageNumber(state.data.next))}
			>
				Next
			</Button>
		</div>
	);
});

function getPageNumber(url: string | null): string | undefined {
	if (!url) return undefined;

	return new URL(url).searchParams.get('page') || undefined;
}
