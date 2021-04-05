  
import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../error';
import {CharacterPage, HousePage, BookPage, BooksItem } from '../pages';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './app.css';

export default class App extends Component {

    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false,
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }
    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        const char = this.state.showRandomChar ? <RandomChar/> : null;
        return (
            <Router>
                <div className="app"> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                                <Button
                                    color="primary"
                                    className="toggle-btn"
                                    onClick={this.toggleRandomChar}>Toggle random character
                                </Button>
                            </Col>
                        </Row>
                        <Route path='/characters' exact component={CharacterPage}/>
                        <Route path='/houses' exact component={HousePage}/>
                        <Route path='/books' exact component={BookPage}/>
                        <Route path='/books/:id' exact render={
                            ({match}) => {
                                const {id} = match.params;
                            return <BooksItem bookId={id} />}
                        }/>
                    </Container>
                </div>
            </Router>
        );
    }
};