import { makeAutoObservable, toJS } from 'mobx';
import { getPlanets } from '@/services/swapiService';
import { generateInitialData, Planet, type PlanetList } from '@/entities/planetsTypes';

interface PlanetsStoreState {
	data: PlanetList;
	error: string | null;
	isLoading: boolean;
	sorting: {
		field: keyof Omit<Planet, 'id'> | null;
		direction: 'asc' | 'desc' | null;
	};
	deletingDialog: {
		isOpen: boolean;
		planetId: string | null;
		planetName: string | null;
	};
}

class PlanetsStore {
	state: PlanetsStoreState = {
		data: generateInitialData(),
		error: null,
		isLoading: false,
		sorting: {
			field: null,
			direction: null,
		},
		deletingDialog: {
			isOpen: false,
			planetId: null,
			planetName: null,
		},
	};

	constructor() {
		makeAutoObservable(this);
		this.loadStateFromLocalStorage();
	}

	saveStateToLocalStorage() {
		const stateToSave = toJS(this.state);
		localStorage.setItem('planetsStore', JSON.stringify(stateToSave));
	}

	loadStateFromLocalStorage() {
		const savedState = localStorage.getItem('planetsStore');
		if (savedState) {
			try {
				this.state = JSON.parse(savedState);
			} catch (error) {
				console.error('Ошибка загрузки состояния из localStorage:', error);
			}
		}
	}

	fetchPlanets = async (page?: string) => {
		this.state.error = null;
		this.state.isLoading = true;

		try {
			this.state.data = await getPlanets(page);
		} catch (error) {
			this.state.error = error instanceof Error ? error.message : 'Неизвестная ошибка';
		} finally {
			this.state.isLoading = false;
			this.saveStateToLocalStorage();
		}
	};

	cleanPlanets = () => {
		this.state.data = generateInitialData();
		this.saveStateToLocalStorage();
	};

	deletePlanetById = (id: string) => {
		this.state.data.results = this.state.data.results.filter((item) => item.id !== id);
		this.closeDeletingDialog();
		this.saveStateToLocalStorage();
	};

	openDeletingDialog = (id: string) => {
		this.state.deletingDialog.isOpen = true;
		this.state.deletingDialog.planetId = id;
		this.state.deletingDialog.planetName = this.state.data.results.filter((item) => item.id === id)[0].name;
		this.saveStateToLocalStorage();
	};

	closeDeletingDialog = () => {
		this.state.deletingDialog.isOpen = false;
		this.state.deletingDialog.planetId = null;
		this.state.deletingDialog.planetName = null;
		this.saveStateToLocalStorage();
	};

	sortPlanets = (field: keyof Omit<Planet, 'id'>) => {
		if (this.state.data.results.length === 0) return;

		if (this.state.sorting.field !== field) {
			this.state.sorting.direction = 'asc';
			this.state.sorting.field = field;
		} else {
			switch (this.state.sorting.direction) {
				case 'asc':
					this.state.sorting.direction = 'desc';
					break;

				case 'desc':
					this.state.sorting.direction = 'asc';
					break;
			}
		}

		const sortedResult = [...this.state.data.results].sort((a, b) => {
			const prevValue = String(a[field]);
			const nextValue = String(b[field]);

			let directionFactor = 1;

			if (this.state.sorting.direction === 'asc') directionFactor = 1;
			if (this.state.sorting.direction === 'desc') directionFactor = -1;

			return prevValue.localeCompare(nextValue) * directionFactor;
		});

		this.state.data.results = sortedResult;
		this.saveStateToLocalStorage();
	};
}

export const planetsStore = new PlanetsStore();
