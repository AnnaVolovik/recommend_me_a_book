import React from "react";
import Recommendation from "./Recommendation";

require('../css/styles.css');

import HeaderBackgroundImage from '../images/background_image.jpeg';
console.log(HeaderBackgroundImage)

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }
    addHeaderImg() {
        let headerBg = new Image();
        headerBg.src = 'dist/' + HeaderBackgroundImage;
        headerBg.height = window.innerHeight;
    }

    render() {
        return (
                <div className='contents'>
                    {this.addHeaderImg()}
                    <Recommendation
                        author="Harper Lee"
                        name="To Kill a Mockingbird"
                        description="As a Southern Gothic novel and a Bildungsroman, the primary themes
                        of To Kill a Mockingbird involve racial injustice and the destruction of innocence.
                        Scholars have noted that Lee also addresses is..."
                    />
                </div>
        );
    }
}