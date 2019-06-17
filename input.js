'use strict'
/**
 *  Для использования нужно только подключить скрипт
 * 
 * Так же можно использовать для отправки либо input типа submit или button 
 * 
 * Так же после отправки очищает input и блокирует кнопку 
 */
const form = document.querySelectorAll('#form__load');
const element = form[0].querySelectorAll('input[type="file"]');
const submit = form[0].querySelector('input[type="submit"]');
const btn = form[0].querySelector('input[type="button"]');
const disabled = 'disabled';


window.onload = () => {
    (submit == null || btn == null) || (submit == undefined || btn == undefined) ? (submit.setAttribute(disabled, 'true')) : (btn.setAttribute(disabled, 'true'));
    uploadFile(element);
}

const uploadFile = element => {
    let lengths = element.length;
    lengths <= 1 ? drag_drop_one() : drag_drop(lengths);
}

const drag_drop_one = () => {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        element[0].addEventListener(eventName, preventDefaults, false)
    })
    element[0].addEventListener('drop', handleDrop, false)
    element[0].addEventListener('change', loadFiles, false)
}

const drag_drop = (lengths) => {
    for (let i = 0; i < lengths; i++) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            element[i].addEventListener(eventName, preventDefaults, false)
        })
        element[i].addEventListener('drop', handleDrop, false)
        element[i].addEventListener('change', loadFiles, false)
    }

}

const preventDefaults = () => {
    event.preventDefault();
    event.stopPropagation();
}

const handleDrop = () => {
    let dt = event.dataTransfer;
    let files = dt.files;
    (submit == null || btn == null) || (submit == undefined || btn == undefined) ? (submit.removeAttribute(disabled)) : (btn.removeAttribute(disabled));
    (submit == null || btn == null) || (submit == undefined || btn == undefined) ? (submit.addEventListener('click', event => {
        event.preventDefault();
        fetchSend(files);
    })) : (btn.addEventListener('click', event => {
        event.preventDefault();
        fetchSend(files);
    }));
}

const loadFiles = () => {
    let files = event.target.files || event.dataTransfer.files;
    (submit == null || btn == null) || (submit == undefined || btn == undefined) ? (submit.removeAttribute(disabled)) : (btn.removeAttribute(disabled));
    (submit == null || btn == null) || (submit == undefined || btn == undefined) ? (submit.addEventListener('click', event => {
        event.preventDefault();
        fetchSend(files);
    })) : (btn.addEventListener('click', event => {
        event.preventDefault();
        fetchSend(files);
    }));
}

const fetchSend = (file, i) => {
    let url = 'test.php'/* URL adress*/
    let formData = new FormData()
    formData.append('file', file)
    fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(() => {
            /* Готово. Информируем пользователя */
            alert('Файлы загруженны');
            clearInput();
        })
        .catch(() => {
            /* Ошибка. Информируем пользователя */
            alert('Ошибка при загрузке');
            clearInput();
        })
}

const clearInput = () => {
    let lengths = element.length;
    lengths <= 1 ? (element[0].value = '') : clearAll;
    const clearAll = () => {for (let i = 0; i < lengths; i++) {element[i].value = '';}}
    (submit == null || btn == null) || (submit == undefined || btn == undefined) ? (submit.setAttribute(disabled, 'true')) : (btn.setAttribute(disabled, 'true'));
}