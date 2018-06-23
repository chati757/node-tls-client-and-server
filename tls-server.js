const tls = require('tls')
const fs = require('fs')

const options = { 
    key: fs.readFileSync('./tls-cer/server-key.pem'), 
    cert: fs.readFileSync('./tls-cer/server-crt.pem'), 
    ca: fs.readFileSync('./tls-cer/ca-crt.pem'), 
    requestCert: true, 
    rejectUnauthorized: true
}

const server = tls.createServer(options, (socket) => {
    console.log('server connected', 
        socket.authorized ? 'authorized' : 'unauthorized')
    
    socket.on('error', (error) => {
        console.log(error)
    })
    
    socket.write('welcome!\n')
    socket.setEncoding('utf8')
    socket.on('data', (data) => {
        console.log('datastage')
        console.log(data)
        console.log('afterdatastage')
        if(data=="end\r\n"){
            socket.end('goodbye\n')
            server.close()
        }
    }).on('error', (err) => {
        // handle errors here
        console.log('handle errors here')
        throw err;
      })
})

server.listen(3000, () => {
    console.log('server listening port 3000')
});