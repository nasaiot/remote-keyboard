const express = require('express')
const app = express()
const cors = require('cors')
var robot = require("robotjs");
const server_port = 8000

const taps=[]
taps["{space}"]="space"
taps["{enter}"]="enter"
taps["{tab}"]="tab"
taps["{bksp}"]="backspace"

app.use(cors())
app.get('/api/:value', (req, res) => {
    const value = req.params.value
    if(value.includes("{") && value.includes("}")){
        if(taps[value]!=undefined){
            robot.keyTap(taps[value])
            res.json(true)
        }else{
            res.json("keytap error")
        }
    }else{
        robot.typeString(value);
        res.json(true)
    }
})

app.listen(server_port, '0.0.0.0',() => {
  console.log(`api listening at http://0.0.0.0:${server_port}`)
})