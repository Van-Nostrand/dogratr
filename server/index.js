const compression = require('compression')
const express = require('express')
const app = express()
const path = require('path')
const publicPath = path.join(__dirname, '..', 'dist')
const PORT = process.env.PORT || 3000

app.use(compression())
app.use(express.static(publicPath))

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(PORT, () => { console.log(`app running on port ${PORT}`) })
