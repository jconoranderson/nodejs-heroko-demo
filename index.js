const express = require('express')
const app = express()
const port = process.env.PORT || 3000

/* 
    Incase you are using mongodb atlas database uncomment below line
    and replace "mongoAtlasUri" with your mongodb atlas uri.
*/
// mongoose.connect( mongoAtlasUri, {useNewUrlParser: true, useUnifiedTopology: true})
src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js" 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

$.ajax({
    url: "https://health.data.ny.gov/resource/nvtm-yit2.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : "aGFbKDOg0gCeCm2c9Od2EsFjL"
    }
}).done(function(data) {
  alert("Retrieved " + data.length + " records from the dataset!");
  console.log(data);
});