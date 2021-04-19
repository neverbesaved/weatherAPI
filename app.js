const express=require("express");
const app =express();
const https=require("https");
const bodyParser=require("body-parser")

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html")
});

app.post("/", function(req,res){
    const query =req.body.cityName;
    const apiKey="7eb096a711accbd0c1d5592c8a185926";
    const units="metric"
    https.get("https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+units+"&appid="+apiKey, function(response){
        response.on("data", function(data){
            const weatherData= JSON.parse(data);
            res.write("<h1> The temperature in"+query+" is: "+ weatherData.main.temp+ "&#176C, it's currently "+ weatherData.weather[0].description+".</h1>")
            const icon=weatherData.weather[0].icon;
            const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<img src="+imageURL+">");
            res.send()
        })
    })
})

app.listen(3000,function(){
    console.log("Sever is running")
})
