import http from 'http'
import uuid from 'node-uuid'

const PORT = process.env.PORT || 3000

let intervals = []

const removeFromArray = (arr, k) => {
  delete arr[k]
  let res = []
  Object.keys(arr).forEach((key) => {
    if(arr[key]) {
      res[key] = arr[key]
    }
  })

  return res

}

setInterval(() => {
  console.log(intervals)
}, 5000)

const server = http.createServer((req, res) => {

  let body = ''




  req.setEncoding('utf8')

  req.on('data', (chunk) => {
    body += chunk
  })

  req.on('close', () => {
    console.log('Cliente desconectado :(')
  })

  req.on('error', (e) => {
    console.log(e)
  })

  req.on('end', () => {
    let cont = 1
    const uid = uuid.v1()
    intervals[uid] = setInterval(() => {
      console.log(cont)
      res.write(`Test: ${cont} \n`)
      if(cont == 2000) {
        clearInterval(intervals[uid])
        intervals = removeFromArray(intervals, uid)
        res.end()
      }
      cont++
    }, 10)
  })
});
server.timeout = 0
server.listen(PORT)
console.log(`Server listening on port ${PORT}`)
