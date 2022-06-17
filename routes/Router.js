const express = require("express")
const router = express()

router.use('/api/users', require("./UserRoutes"))

//teste route
router.get('/', (req, res) => {
  res.send("Api funcionando!")
})


module.exports = router