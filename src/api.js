const { Router } = require("express");
const api = Router();

// This will be your data source
const players = [
  { id: 1, name: "Jon Snow", age: 23, health: 100, bag: [1] },
  { id: 2, name: "Littlefinger", age: 35, health: 100, bag: [2] },
  { id: 3, name: "Daenerys Targaryen", age: 20, health: 100, bag: [3] },
  { id: 4, name: "Samwell Tarly", age: 18, health: 100, bag: [4] }
];
const objects = [
  { id: 1, name: "spoon", value: -1 },
  { id: 2, name: "knife", value: -10 },
  { id: 3, name: "sword", value: -20 },
  { id: 4, name: "potion", value: +20 }
];
// 
api.get('/players', (req, res) => {
  res.status(200).json(players);
})
// 
api.get('/player', (req, res) => {
  const { id } = req.body
  players.forEach(element => {
    if (element.id == id) {
      res.status(200).json(element);
    }
  });

})
// 
api.post('/addPlayer', (req, res) => {

  const { name, age } = req.body;

  if (name.length >= 2 && age >= 16 && Number.isInteger(age)) {

    let newPlayer = {};

    newPlayer.id = players.length + 1;
    newPlayer.name = name;
    newPlayer.age = age;
    newPlayer.bag = [1];

    players.push(newPlayer)

    let lastItem = players[players.length - 1];

    res.status(201).json(lastItem)

  } else {
    res.status(400).json({ 'mesagge': 'need 2 param name<str> and age >= 16 <int>' })
  }
})
// 
api.patch('/armPlayer', (req, res) => {

  const { id, arm } = req.body;
  if (id < players.length || parseInt(arm )< objects.length){
    players.forEach(element => {
      if (element.id == id) {
        element.bag.push(arm)
        res.json(element)
      }
    });
  }else{
    res.json({"message": `need id player beteewn 1-${players.length} and arm id beteewn ${arm.length}`})
  }
})
// 
api.patch('/health', (req,res)=>{

  const { id, health} = req.body;


  if (id <= players.length){

    players.forEach(element => {
      if(element.id == id){
        if (0 >= health >=100){
          element.health = health;
          res.json(element);
        }else{
          res.json({
            "message": "health need be beteewn 0 dead player an 100 full health"
          })
        }
      }
    });
  }else{
    res.status(401).json({
      "mesagge": `player id need be beetwen 1 - ${players.length}`
    })
  }
})
// 
api.post('/object', (req,res)=>{
  const { name, value } = req.body;

  if( name != "" && -100 < value < 100 ){

    const newObj = {};

    newObj.id = objects.length + 1;
    newObj.name = name;
    newObj.value = value;

    objects.push(newObj);

    res.status(201).json(objects)
  }else{
    res.status(400).json(
      {
        "mesagge":`name <str> value <int> beteewn -100 - +100`
      }
    )
  }

})
// 
api.get('/objects', (req , res )=>{
  res.status(200).json(objects);
})
// 
api.get('/object', (req,res)=>{
  const { id }=req.body;

  if ( 0 < id <= objects.length ){
    objects.forEach(element => {
      if ( element.id == id ) res.status(200).json(element);
    });
  }else{
    res.status(400).json({
      "mesagge": `id <int> 1 - ${objects.length}`
    })
  }
})
// 
api.patch('/object', (req, res)=>{
  const { id, value } = req.body;

  if (0 <id <= objects.length && -100 < value < 100){
    objects.forEach(element => {
      if( element.id == id){
        element.value = value;
        res.status(200).json(element);
      }
    });
  }else{
    res.status(400).json({
      "mesagge": `id <int> 1 - ${objects.length} value <int> -100 - +100`
    })
  }
})
// 
api.delete('/object', (req, res)=>{

  const { id } = req.body;

  objects.forEach(element => {
    if ( id == element.id){
      let index = objects.indexOf(element);
      objects.splice(index,1)
      res.status(200).json(objects);
    }else{
      res.status(400).json({
        "mesagge": "item not found"
      })
    }
  });

})


module.exports = api;
