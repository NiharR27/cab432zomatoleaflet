const express = require('express')
const bodyParser = require('body-parser') //Get request
const path = require('path')
const Zomato = require('zomato.js')
const engine = require('ejs-mate');
const zomato = new Zomato('813c82d3a71214cbd7ac5223340ddf36') 


const app = express() // creating express app.
app.engine('ejs',engine);
app.set('view engine','ejs');


app.use(express.static(path.join(__dirname, 'static'))) //want to use the static library.. __dirname is magic name for current directory.
app.use(bodyParser.urlencoded({ extended: false }))
const cityid = '298';

app.use(require('./routes/'));

// app.post('/location', async (req,res) => {
//   try {
//     cityid = req.body.q;
//     const data = await zomato.search({query: cityid})

//     const cityinfo = data.cityinfo.map
//   }catch(err) {
//     res.status(500).send('Error grabbing information')
//   }
// })

//make post request to the server



app.post('/search', async (req, res) => {
  try {
    //q is the query that user send.
    const q = req.body.q;

    const data = await zomato.search({entity_id: cityid, entity_type: 'city', q})
    const restaurants = data.restaurants.map(r => {
      return {
        name: r.name,
        url: r.url,
        location: r.location,
        price: r.price_range,
        thumbnail: r.thumb,
        rating: r.user_rating.aggregate_rating,
        timings: r.timings,
      }
    })
    res.json({ restaurants})
  } catch (err) {
    console.error(err)
    res.status(500).send('There is some error retrieving the data......')
  }
})


//serves on localhost:3000
app.listen(3000, () => console.log('server started on port 3000'))
