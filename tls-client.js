const tls = require('tls')
const fs = require('fs')

const options = {
    key: fs.readFileSync('./tls-cer/server-key.pem'), 
    cert: fs.readFileSync('./tls-cer/server-crt.pem'), 
    ca: fs.readFileSync('./tls-cer/ca-crt.pem'), 
    host: 'localhost',
    port: 3000,
    rejectUnauthorized:true,
    requestCert:true
}

const socket = tls.connect(options, () => {
    console.log('client connected', 
        socket.authorized ? 'authorized' : 'unauthorized')
    process.stdin.pipe(socket)//point to socket
    process.stdin.resume()//Begin reading from stdin so the process does not exit.
})

socket.setEncoding('utf8')

socket.on('data', (data) => {
    console.log('datastage')
    console.log(data)
})

socket.on('error', (error) => {
    console.log('errorstage')
    console.log(error)
})

socket.on('end', (data) => {
    console.log('endstage')
    console.log('Socket end event')
})