interface IItemType {
	id: number;
	displayName: string;
	stackSize: number;
	name: string;
}

export class Item {
	public type: IItemType;

	constructor(type: IItemType) {
		this.type = type;
	}
}