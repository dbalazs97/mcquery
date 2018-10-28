import {Item} from './Item';

abstract class Recipe {
	public result: { id: number, item: Item };

	protected constructor(result: { id: number; item: Item }) {
		this.result = result;
	}
}

export class ShapelessRecipe extends Recipe {
	public ingredients: Item[];

	constructor(ingredients: Item[], result: { id: number, item: Item }) {
		super(result);
		this.ingredients = ingredients;
	}
}

type ItemGrid = [
	[Item?, Item?, Item?],
	[Item?, Item?, Item?],
	[Item?, Item?, Item?]
	];

export class ShapedRecipe extends Recipe {
	public grid: ItemGrid;

	constructor(grid: ItemGrid, result: { id: number; item: Item }) {
		super(result);
		this.grid = grid;
	}
}