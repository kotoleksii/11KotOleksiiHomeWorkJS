const dataUrl = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';
const logoLink = 'https://d2z9uwnt8eubh7.cloudfront.net/media/default/0001/13/4501b9f8651d364db111a2e5cffdefb2c74a4112.png';
const title = 'Currency rate "Privat24"';
const copyrightText = '© 2021 Kot Oleksii HomeWork JS №11 - All rights reserved';

setPageParameters('400px', '50px auto', '0 20px', '#0f0f0f');

fetch(dataUrl)
.then(response => {
    return new Promise(resolve => {
        return resolve(response.json());
    })
}).then(data => setLogo(logoLink, '50%') + createTable(`${title}\n${getCurrentDate()}`, [
    {name: data[0].ccy, buy: parseFloat(data[0].buy).toFixed(3), cell: parseFloat(data[0].sale).toFixed(3)},
    {name: data[1].ccy, buy: parseFloat(data[1].buy).toFixed(3), cell: parseFloat(data[1].sale).toFixed(3)},
    {name: data[3].ccy, buy: parseFloat(data[3].buy).toFixed(0), cell: parseFloat(data[3].sale).toFixed(0)},
], ['name', 'buy', 'cell'], ['Currency', 'Purchase', 'Sale']) + setCopyright(copyrightText));

function createTable(caption, objectArray, fields, fieldTitles) {
    let body = document.getElementsByTagName('body')[0];
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let thr = document.createElement('tr');

    table.setAttribute('style', 'font-family: "Roboto", "sans-serif"; text-align: center;' +
        'border-collapse: collapse; border-radius: 20px; border-spacing: 5px; background: #212121;' + 
        'width: 100%; box-shadow: 0 10px 10px rgba(0, 0, 0, 0.25);');

    let cap = table.createCaption();
    cap.innerHTML = caption;
    cap.setAttribute('style', 'font-size: 26px; font-weight: 300; padding: 12px; color: #9e9cff;');

    fieldTitles.forEach((fieldTitle) => {
        let th = document.createElement('th');
        th.setAttribute('style', 'font-size: 22px; font-weight: 300; padding: 12px;' +
            'border-bottom: 2px solid #8adc32; color: #d75873;');
        th.appendChild(document.createTextNode(fieldTitle));
        thr.appendChild(th);
    });
    thead.appendChild(thr);
    table.appendChild(thead);

    let tbdy = document.createElement('tbody');

    objectArray.forEach((object) => {
        let tr = document.createElement('tr');
        fields.forEach((field) => {
            var td = document.createElement('td');
            td.setAttribute('style', 'padding: 10px; color: #8D8173;');
            td.appendChild(document.createTextNode(object[field]));
            tr.appendChild(td);
        });
        tbdy.appendChild(tr);  
    });
    table.appendChild(tbdy);
    body.appendChild(table);
    return table;
};

function setPageParameters(width, margin, padding, backgroundColor) {
    document.body.style.width = width;
    document.body.style.margin = margin;
    document.body.style.padding = padding;
    document.body.style.backgroundColor = backgroundColor;  
};

function setLogo(link, width) {
    const img = document.createElement('img');
    img.src = link;
    img.setAttribute('style', 'display: block; margin-left: auto; margin-right: auto;');
    img.style.width = width;
    document.body.appendChild(img);
}

function setCopyright(text) {
    let div = document.createElement('div');
    div.innerHTML = text;
    div.setAttribute('style', 'font-family: "Roboto", "sans-serif"; font-size: 12px;' + 
        'color: #315a50; text-align: center; width: 100%; margin-top: 30px');

    document.body.append(div);
}

function getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    
    today = dd + '.' + mm + '.' + yyyy;
    
    return today;
}

let mask = document.querySelector('.mask');

window.addEventListener('load', () => {
    mask.classList.add('hide');

    setTimeout(() => { 
        mask.remove();
    }, 1600)
});