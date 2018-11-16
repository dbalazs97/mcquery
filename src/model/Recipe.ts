import MCData from 'minecraft-data';
import ErrorObject from './ErrorObject';
import {Item} from './Item';

export abstract class Recipe {
	public static count: number = 0;
	public static list: Recipe[] = [];

	public static getRecipeByID(id: number): Recipe | ErrorObject {
		const recipe = this.list.filter(value => value.id === id)[0];
		return (typeof recipe === 'undefined') ? new ErrorObject() : recipe;
	}

	public static getRecipeByResult(resid: number): Recipe | ErrorObject {
		const recipe = this.list.filter(value => value.result.id === resid)[0];
		return (typeof recipe === 'undefined') ? new ErrorObject() : recipe;
	}

	public static enumRecipes(): void {
		const recipes = MCData('1.13').recipes;

		for (const recipe in recipes) {
			if (recipes.hasOwnProperty(recipe)) {
				// @ts-ignore Because recipes has a weird shape
				const recipeElement = recipes[recipe][0];
				if (recipeElement.hasOwnProperty('ingredients')) {
					this.list.push(new ShapelessRecipe(recipeElement.ingredients, recipeElement.result));
				} else {
					this.list.push(new ShapedRecipe(recipeElement.inShape, recipeElement.result));
				}
			}
		}
	}

	public result: { id: number, item: number };
	public id: number;
	public abstract isShapeless: boolean;

	protected constructor(result: { id: number; item: number }) {
		this.result = result;
		this.id = Recipe.count++;
	}
}

export class ShapelessRecipe extends Recipe {
	public ingredients: Item[];
	public isShapeless = true;

	constructor(ingredients: Item[], result: { id: number, item: number }) {
		super(result);
		this.ingredients = ingredients;
	}
}

type ItemGrid = [
	[number?, number?, number?],
	[number?, number?, number?],
	[number?, number?, number?]
	];

export class ShapedRecipe extends Recipe {
	public grid: ItemGrid;
	public isShapeless = false;

	constructor(grid: ItemGrid = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]], result: { id: number; item: number }) {
		super(result);
		this.grid = grid;
	}
}