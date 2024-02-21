const express = require('express')
const app = express()

app.get("/test", (req, res) => {
    res.json({"users": ["userone","usertwo"]})
})

app.listen(5000, () => {console.log("Server Started")} )