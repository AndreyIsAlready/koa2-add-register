let form = document.querySelectorAll('#input');
let button = document.querySelector('button');

let register = () => {
    const request = new XMLHttpRequest();
    let url = '/addUser';
    let body = {name: form[0].value, surname: form[1].value, email: form[2].value, password: form[3].value};
    request.responseType = "json";
    request.open('POST', url, true);
    request.setRequestHeader("Content-type", "application/json;charset=utf-8");

    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            let obj = request.response; 
            if (obj.massege) {
                alert(obj.massege);
            }
            
            if (obj.url) {
                window.location.replace(obj.url);
            }
        }
    });

    request.send(JSON.stringify(body));
}

button.addEventListener('click', () => {
    register();
});