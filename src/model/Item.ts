import MCData from 'minecraft-data';
import stringSimilarity from 'string-similarity';
import sprites from '../sprite.json';
import ErrorObject from './ErrorObject';

export interface IItemType {
	id: number;
	displayName: string;
	stackSize: number;
	name: string;
	sprite?: { x: number, y: number };
}

export class Item {
	public static list: Item[] = [];

	public static enumItems(): void {
		this.list = MCData('1.13').itemsArray.map(value => {
			const spriteIndex = sprites.find(sprite => (stringSimilarity.compareTwoStrings(sprite.displayName, value.displayName) > 0.9));
			if (spriteIndex !== undefined) {
				return new Item({
					...value,
					sprite: {
						x: spriteIndex.left,
						y: spriteIndex.top,
					},
				});
			} else {
				return new Item({...value, sprite: {x: -1, y: -1}});
			}
		});
	}

	public static getItemByID(id: number): IItemType | ErrorObject {
		const item = this.list.filter(value => value.type.id === id)[0];
		return (typeof item === 'undefined') ? new ErrorObject() : item.type;
	}

	public type: IItemType;

	constructor(type: IItemType) {
		this.type = type;
	}
}