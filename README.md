# MCQuery
A minecraft-data query tool, which provides a wrapper REST API for [Node Minecraft Data](https://github.com/PrismarineJS/node-minecraft-data).
## Setup and run
You have to run the following commands

    npm install
   or
   
    yarn install
To run you have to run

    npm start
  

## Endpoints
 - **/items**: List all Minecraft items
	 - **/item/{id}**: Get the item with given id
 - **/blocks**: List all Minecraft blocks
 	 - **/block/{id}**: Get the blockwith given id
 - **/recipes**: List all Minecraft recipes
  	 - **/recipe/{id}**: Get the recipe with given id
  	 - **/recipe/result/{id}**: Get the recipe for given item id
