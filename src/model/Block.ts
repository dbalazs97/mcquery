import MCData from 'minecraft-data';

interface IBlockType {
	id: number;
	name: string;
	displayName: string;
	hardness: number | null;
	drops: number;
}

export class Block {

	public static enumBlocks(): Block[] {
		return MCData('1.13').blocksArray.map(block => Block.convertFromMC(block));
	}

	public static getBlockByID(id: number): Block {
		return Block.enumBlocks().filter(block => block.type.id === id)[0];
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