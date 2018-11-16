import MCData from 'minecraft-data';
import ErrorObject from './ErrorObject';

interface IBlockType {
	id: number;
	name: string;
	displayName: string;
	hardness: number | null;
	drops: number;
}

export class Block {
	public static list: Block[] = [];

	public static enumBlocks(): void {
		this.list = MCData('1.13').blocksArray.map(block => Block.convertFromMC(block));
	}

	public static getBlockByID(id: number): IBlockType | ErrorObject {
		const block = this.list.filter(value => value.type.id === id)[0];
		return (typeof block === 'undefined') ? new ErrorObject() : block.type;
	}

	public static convertFromMC(block: any): Block {
		return new Block({
			displayName: block.displayName,
			drops: block.drops[0],
			hardness: block.hardness,
			id: block.id,
			name: block.name,
		});
	}

	public type: IBlockType;

	constructor(type: IBlockType) {
		this.type = type;
	}
}