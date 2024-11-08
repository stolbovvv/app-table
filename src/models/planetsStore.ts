import { makeAutoObservable } from 'mobx';
import { getPlanets } from '@/services/swapiService';
import { generateInitialData, type PlanetList } from '@/entities/planetsTypes';

interface PlanetsStoreState {
	data: PlanetList;
	error: string | null;
	isLoading: boolean;
}

class PlanetsStore {
	state: PlanetsStoreState = {
		data: generateInitialData(),
		error: null,
		isLoading: false,
	};

	constructor() {
		makeAutoObservable(this);
	}

	fetchPlanets = async () => {
		this.state.error = null;
		this.state.isLoading = true;

		try {
			this.state.data = await getPlanets();
		} catch (error) {
			this.state.error = error instanceof Error ? error.message : 'Неизвестная ошибка';
		} finally {
			this.state.isLoading = false;
		}
	};

	cleanPlanets = () => {
		this.state.data = generateInitialData();
	};
}

export const planetsStore = new PlanetsStore();
