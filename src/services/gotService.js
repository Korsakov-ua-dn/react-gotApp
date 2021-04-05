export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api'
    }
    getResourse = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
            `, recived ${res.status}`);
        }
        return await res.json();
    }
    getAllCharacters = async () => {
        const res = await this.getResourse(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter);
    }
    getCharacter = async (id) => {
        const character = await this.getResourse(`/characters/${id}`);
        return this._transformCharacter(character);
    }
    
    getAllHouses = async () => {
        const res = await this.getResourse(`/houses/`);
        return res.map(this._transformHouse);
    }
    getHouse = async (id) => {
        const house = await this.getResourse(`/houses/${id}`);
        return this._transformHouse(house);
    }
    getAllBooks = async () => {
        const res = await this.getResourse(`/books/`);
        return res.map(this._transformBook);
    }
    getBook = async (id) => {
        const book = await this.getResourse(`/books/${id}`);
        return this._transformBook(book);
    }
    _transformCharacter(char) {
        for (let key in char) {
            if (!char[key]) {
                char[key] = "no result"
            }
        }
        const id = char.url.match(/\d/g).reduce((acc, cur) => acc + cur);
            // "url": "https://www.anapioficeandfire.com/api/characters/130" из url получаю массив чисел через запятую далее схлопываю.
        return {
            id: id,
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }
    _transformHouse(house) {
        for (let key in house) {
            if (!house[key].toString()) {
                house[key] = "no result"
            }
        }
        const id = house.url.match(/\d/g).reduce((acc, cur) => acc + cur);
        return {
            id: id,
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }
    _transformBook(book) {
        for (let key in book) {
            if (!book[key]) {
                book[key] = "no result"
            }
        }
        const id = book.url.match(/\d/g).reduce((acc, cur) => acc + cur);
        return {
            id: id,
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }
}