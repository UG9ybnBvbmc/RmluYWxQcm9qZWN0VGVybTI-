var message = [
    "เว็บไซต์ได้ส่งที่อยู่คุณไปหาผู้พัฒนาเรียบร้อย",
    "Your IP : 127.0.0.1",
    "ปรมินทร์รำมวยจีน",
    "ระเบิดตูดภูรินท์",
    "Protect By pulawat6680"
];
function generateRandomString() {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyz';
    let randomString = '';
    var maxLength = 20;
    var minLength = 7;

    for (let i = 0; i < Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters[randomIndex];
    }

    return randomString;
}
var div = document.querySelectorAll('*')
div.forEach(element => {
    var randomMessage = message[Math.floor(Math.random() * message.length)];
    element.setAttribute('data-by-pulawat6680-protect-' + generateRandomString(), randomMessage);
});