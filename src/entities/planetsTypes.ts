export interface Planet {
	name: string;
	terrain: string;
	climate: string;
	diameter: string;
	population: string;
}

export interface PlanetList {
	count: number;
	next: string | null;
	previous: string | null;
	results: Planet[];
}

export function generateInitialData(): PlanetList {
	return {
		count: 0,
		next: null,
		previous: null,
		results: [],
	};
}
