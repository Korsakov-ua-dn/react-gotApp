export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api/'
    }
    async getResourse(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
            `, recived ${res.status}`);
        }
        return await res.json();
    }
    async getAllCharacters() {
        const res = await this.getResourse(`characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter);
    }
    async getCharacter(id) {
        const character = await this.getResourse(`characters/${id}`);
        return this._transformCharacter(character);
    }
    // noResult(obj) {
    //     const res = [...obj];
    //     res.map((item) => {
    //         item.value
    //     });
    //     return {
            
    //     }
    // }
    getAllHouses() {
        return this.getResourse(`houses/`);
    }
    getHouse(id) {
        return this.getResourse(`houses/${id}`)
    }
    getAllBooks() {
        return this.getResourse(`books/`);
    }
    getBooks(id) {
        return this.getResourse(`books/${id}`)
    }
    _transformCharacter(char) {
        return {
            url: char.url,
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }
    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }
    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }
}