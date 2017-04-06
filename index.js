const SERVICE_WORKER_API = 'serviceWorker';

const isSupportServiceWorker = () => SERVICE_WORKER_API in navigator;

navigator.serviceWorker.register('service-worker.js')
    .then(reg => {
        console.log("SW registered!\n", reg)
    })
    .catch(err => console.log("Boo!", err));

// 给sw发送postMessage
let sendPostMessageTOSW = (msg) => new Promise((resolve, reject) => {
    const messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = event => {
        console.log(event);
        if (event.data.error) {
            reject(event.data.error);
        } else {
            resolve(event.data);
        }
    };

    navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage(msg, [messageChannel.port2]);
});

document.querySelector('#test').addEventListener('click', () => {
    // window.postMessage('.....', '*');
    sendPostMessageTOSW('send msg to sw');
});

window.addEventListener('message',function(e){
    console.log(e);
},false);









// 资源缓存列子
setTimeout(() => {
    const img = new Image();
    img.src = "/dog.jpeg";
    document.body.appendChild(img);
}, 3000);