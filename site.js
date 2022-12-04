let express = require('express');
let app = express();
let fs = require('fs');
let fetch = require('node-fetch');
let visitjson = require('./pagevisits.json');


app.get('/games/:id', async (req, res) => {
    visitjson = visitjson+1;
    fetch('https://games.roblox.com/v1/games?universeIds='+req.params.id+'').then(res => res.json()).then(data => {
        fetch('https://games.roblox.com/v1/games/votes?universeIds='+req.params.id+'').then(res => res.json()).then(data1 => {
            res.json({
                title: data.data[0].sourceName,
                description: data.data[0].sourceDescription,
                playing: data.data[0].playing,
                visits: data.data[0].visits,
                placeid: data.data[0].rootPlaceId,
                favourites: data.data[0].favoritedCount,
                max: data.data[0].maxPlayers,
                creatoruser: data.data[0].creator.id,
                created: data.data[0].created,
                likes: data1.data[0].upVotes,
                dislikes: data1.data[0].downVotes,
                universe: data.data[0].id,
                apirequests: visitjson || 0
              })
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
    fs.writeFile('./pagevisits.json', JSON.stringify(visitjson), (err) => {
        if (err) console.log(err);

    })
    console.log('req! count: '+visitjson+'')
  })
  
  app.get('/uid/:id', async (req, res) => {
    visitjson = visitjson+1;
    fetch('https://apis.roblox.com/universes/v1/places/'+req.params.id+'/universe').then(res => res.json()).then(data => {
        res.json({
            universe: data.universeId
        })
    });
    fs.writeFile('./pagevisits.json', JSON.stringify(visitjson), (err) => {
        if (err) console.log(err);

    })
    console.log('req! count: '+visitjson+'')
  })
  
  


app.listen(90);