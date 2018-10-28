import MCData from 'minecraft-data';
import {Item} from './Item';

export abstract class Recipe {
	public static count: number = 0;

	public static enumRecipes(): Recipe[] {
		const recipes = MCData('1.13').recipes;
		const returnValue: Recipe[] = [];

		for (const recipe in recipes) {
			if (recipes.hasOwnProperty(recipe)) {
				// @ts-ignore Because recipes has a weird shape
				const recipeElement = recipes[recipe][0];
				if (recipeElement.hasOwnProperty('ingredients')) {
					returnValue.push(new ShapelessRecipe(recipeElement.ingredients, recipeElement.result));
				} else {
					returnValue.push(new ShapedRecipe(recipeElement.inShape, recipeElement.result));
				}
			}
		}

		return returnValue;
	}

	public static getRecipeByID(id: number): Recipe {
		return Recipe.enumRecipes().filter(recipe => recipe.id === id)[0];
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