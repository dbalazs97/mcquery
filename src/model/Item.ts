import MCData from 'minecraft-data';

export interface IItemType {
	id: number;
	displayName: string;
	stackSize: number;
	name: string;
}

export class Item {

	public static enumItems(): Item[] {
		return MCData('1.13').itemsArray.map(value => new Item({...value}));
	}

	public static getItemByID(id: number): Item {
		return new Item(MCData('1.13').itemsArray.filter(value => value.id === id)[0]);
	}

	public type: IItemType;

	constructor(type: IItemType) {
		this.type = type;
	}
}