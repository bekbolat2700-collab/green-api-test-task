const baseUrl = 'https://api.green-api.com';

async function callGreenApi(method, body = null) {
    const id = document.getElementById('idInstance').value;
    const token = document.getElementById('apiTokenInstance').value;
    const responseArea = document.getElementById('responseField');

    if (!id || !token) {
        alert("Пожалуйста, заполните idInstance и ApiTokenInstance");
        return;
    }

    const url = `${baseUrl}/waInstance${id}/${method}/${token}`;
    
    try {
        const requestOptions = {
            method: body ? 'POST' : 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        if (body) requestOptions.body = JSON.stringify(body);

        const response = await fetch(url, requestOptions);
        const result = await response.json();
        
        // Выводим результат в поле ответа [cite: 13]
        responseArea.value = JSON.stringify(result, null, 4);
    } catch (error) {
        responseArea.value = "Ошибка при запросе: " + error.message;
    }
}

// Функции для каждой кнопки [cite: 21]
function getSettings() { callGreenApi('getSettings'); }
function getStateInstance() { callGreenApi('getStateInstance'); }

function sendMessage() {
    const phone = document.getElementById('phoneNumber').value;
    const text = document.getElementById('messageText').value;
    const body = {
        chatId: `${phone}@c.us`,
        message: text
    };
    callGreenApi('sendMessage', body);
}

function sendFileByUrl() {
    const phone = document.getElementById('phoneNumberFile').value;
    const urlFile = document.getElementById('fileUrl').value;
    const fileName = urlFile.split('/').pop() || 'file';
    const body = {
        chatId: `${phone}@c.us`,
        urlFile: urlFile,
        fileName: fileName
    };
    callGreenApi('sendFileByUrl', body);
}