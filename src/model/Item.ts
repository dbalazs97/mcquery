import MCData from 'minecraft-data';

export interface IItemType {
	id: number;
	displayName: string;
	stackSize: number;
	name: string;
}

export class Item {
	public static list: Item[] = [];

	public static enumItems(): void {
		this.list = MCData('1.13').itemsArray.map(value => new Item({...value}));
	}

	public static getItemByID(id: number): Item {
		return this.list.filter(value => value.type.id === id)[0];
	}

	public type: IItemType;

	constructor(type: IItemType) {
		this.type = type;
	}
}