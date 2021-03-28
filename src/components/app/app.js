import React, { Component } from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import './app.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';



export default class App extends Component{
    constructor() {
        super();
        this.updateChar();
    }

    gotService = new gotService();

    state = {
        className: "show",
        char: {},
        loading: true,
        error: false
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        });
    }
    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }
    updateChar = () => {
        const id = Math.floor(Math.random()*140 + 25); // начиная с 25 до 140
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onToggleChar = () => {
        const {className} = this.state;
        if (className === "show") {
            this.setState({
                className: "hide",
                loading: true
            })
        } else {
            this.setState({
                className: "show"
            })
            this.updateChar();
        }
    }

    render() {
        const {className, char, loading, error} = this.state

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <RandomChar char={char}/> : null;

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            <div className={className}>
                                {errorMessage}
                                {spinner}
                                {content}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Button className="btn" color="primary" onClick={this.onToggleChar}>Toogle randome character</Button>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};