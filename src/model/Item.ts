import bs from 'binary-search';
import MCData from 'minecraft-data';
import sprites from '../sprite.json';

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
			const spriteIndex = bs(sprites, value.displayName, (e, n) => e.displayName.localeCompare(n));
			if (spriteIndex > 0) {
				return new Item({...value, sprite: {x: sprites[spriteIndex].left, y: sprites[spriteIndex].top}});
			} else {
				return new Item({...value, sprite: {x: -1, y: -1}});
			}
		});
	}

	public static getItemByID(id: number): Item {
		return this.list.filter(value => value.type.id === id)[0];
	}

	public type: IItemType;

	constructor(type: IItemType) {
		this.type = type;
	}
}