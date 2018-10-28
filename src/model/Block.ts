import {Item} from './Item';

interface IBlockType {
	id: number;
	name: string;
	displayName: string;
	hardness: number;
	drops: Item[];
}

export class Block {
	public type: IBlockType;

	constructor(type: IBlockType) {
		this.type = type;
	}
}