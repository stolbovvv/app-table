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

export const getPlanets = async (): Promise<PlanetList> => getData<PlanetList>('planets');
