import React, { Component } from 'react'
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo.js'
import Signin from './components/Signin/Signin';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import './App.css';
import Register from './components/Register/Rgister';



const app = new Clarifai.App({
    apiKey: '2b3d51fdedcc47ec96af99f909a8626c'
});



const poption = {
    particles: {

        number: {
            value: 200,
            density: {
                enable: true,
                value_area: 700
            }
        }

    }
}

const initialstate = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignin: false,
    user: {
        id: '',
        name: '',
        email: '',
        entier: 0,
        joined: ''

    }

}
class App extends Component {

    constructor() {
        super();
        this.state = initialstate;



    }

    loaduser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entier: data.entier,
                joined: data.joined
            }
        })


    }

    // componentDidMount() {
    //     fetch('http://localhost:3000')
    //         .then(response => response.json())
    //         .then(data => console.log(data))
    // }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('imgin');
        const width = Number(image.width);
        const height = Number(image.height);
        console.log(clarifaiFace);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)


        }
    }

    displayFaceBox = (box) => {
        console.log(box);
        this.setState({ box: box });


    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    }
    onButtonSubmit = () => {

        this.setState({ imageUrl: this.state.input });
        app.models
            .predict(
                Clarifai.FACE_DETECT_MODEL,
                this.state.input)
            .then(response => {
                console.log(this.calculateFaceLocation(response))
                if (response) {
                    fetch('http://localhost:3000/image', {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: this.state.user.id


                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState({
                                user: {
                                    entier: count
                                }
                            })
                        })

                }

                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err));


    }
    onRouteChange = (routes) => {
        if (routes === 'signout') {
            this.setState(initialstate);

        }

        else if (routes === 'home') {

            this.setState({ isSignin: true });

        }
        this.setState({ route: routes });

    }


    render() {
        return (

            <div>

                <Particles className='particles'
                    params={poption}
                />
                <Navigation isSignin={this.state.isSignin} onRouteChange={this.onRouteChange} />
                {this.state.route === 'home'
                    ? <div>
                        <Logo />
                        <Rank name={this.state.user.name} entier={this.state.user.entier} />
                        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
                    </div>
                    : (
                        this.state.route === 'signin'
                            ? <Signin loaduser={this.loaduser} onRouteChange={this.onRouteChange} />
                            : <Register loaduser={this.loaduser} onRouteChange={this.onRouteChange} />
                    )
                }
            </div>
        )

    }
}



export default App;