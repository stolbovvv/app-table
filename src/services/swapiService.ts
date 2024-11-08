import { v4 as uuidv4 } from 'uuid';
import type { PlanetList } from '@/entities/planetsTypes';

const BASE_URL = 'https://swapi.dev/api';

async function getData<T>(endpoint: string): Promise<T> {
	try {
		const response = await fetch(`${BASE_URL}/${endpoint}`);

		if (response.ok) {
			return response.json();
		} else {
			throw new Error(`SWAPI Error: ${response.status}`);
		}
	} catch (error) {
		console.error('Ошибка при запросе данных из SWAPI:', error);
		throw error;
	}
}

export const getPlanets = async (): Promise<PlanetList> => {
	const { count, next, previous, results } = await getData<PlanetList>('planets');

	return {
		count,
		next,
		previous,
		results: results.map((item) => ({ ...item, id: uuidv4() })),
	};
};
