import React from 'react';
import './errorMessage.css';
// так же можно импортировать картинку из текущей папки компонента
// и использовать напрямую - import img from './error.jpg';

const ErrorMessage = () => {
    return (
        <>
            <img src={process.env.PUBLIC_URL + '/img/404.jpg'} alt='Not found'></img> 
            <span>Somthing goes wrong</span>
        </> // react фрагмент // получить перееменную из переменного окружения process.env.PUBLIC_URL
    )
}

export default ErrorMessage;