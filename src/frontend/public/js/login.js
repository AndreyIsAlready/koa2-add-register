const form = document.querySelectorAll('#input');
const button = document.querySelector('button');

let login = () => {
    const request = new XMLHttpRequest();

    let url = '/login';
    let body = {email: form[0].value, password: form[1].value};

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
    login();
});