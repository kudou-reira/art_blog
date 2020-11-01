import React, { Component, useEffect, useState, Suspense } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import useScript from './useScript';
// import mview from '../portfolio_images/fashion_design/final/images/clothes_1.mview';
import DOMPortal from './domPortalComponent';

// import marmosetViewerComponent in project layout, pass it down, render

// document.addEventListener('DOMContentLoaded', (event) => {
//     //the event occurred
//     console.log("this is dom content stuff");
// })


class MarmosetViewer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("this is before mview");
        // console.log("this is mview", mview);


        console.log("this is mview props", this.props.mview);

        var test_view = this.props.mview;

        // var mview = undefined;
        
        console.log("this is window", window);

        if(test_view !== undefined) {
            var params = { width: 1024, height: 768, autoStart: false };
            // var myviewer = window.marmoset.embed(mview, params);
            console.log("this is marmoset");
            // console.log("this is window marmoset", window.marmoset.embed());
            
            var myViewer = new window.marmoset.WebViewer(1024, 768, this.props.mview);
            // var tempHolder = React.createElement("div", {className: 'container'}, myViewer.domRoot);

            console.log("this is myviewer dom root", myViewer.domRoot);
            console.log("this is type myviewer dom root", typeof(myViewer.domRoot));

            this.refs.marmosetTarget.appendChild(myViewer.domRoot);
        }
    }

    // componentWillUnmount() {
    //     this.refs.marmosetTarget.removeChild(myViewer.domRoot);
    // }

    
    render() {    
        
        return(
            <div>
                <Suspense fallback={<h1>Loading...</h1>}>
                    {/* <div ref={ref => ref.appendChild(myViewer.domRoot)}> */}
                    <div ref='marmosetTarget'></div>
                    {/* <DOMPortal parentEl={myViewer.domRoot}></DOMPortal> */}
                    
                </Suspense>
                {/* <div dangerouslySetInnerHTML={createMarkup()} /> */}
                
            </div>
        )
    }
}




// export default function MarmosetViewer(props) {

//     // function createMarkup(temp) {
//     //     return {__html: `${temp}`};
//     // }

//     // useScript('https://viewer.marmoset.co/main/marmoset.js');
//     // marmoset.src = "../lib/marmoset.js";

//     const [viewer] = useState({ viewerObj: [] });

//     useEffect(() => {
        
//     })


//     console.log("this is window", window);

//     var params = { width: 1024, height: 768, autoStart: false };
//     // var myviewer = window.marmoset.embed(mview, params);
//     console.log("this is marmoset");
//     // console.log("this is window marmoset", window.marmoset.embed());
    
//     var myViewer = new window.marmoset.WebViewer(1024, 768, mview);
//     // var tempHolder = React.createElement("div", {className: 'container'}, myViewer.domRoot);

//     console.log("this is myviewer dom root", myViewer.domRoot);
//     console.log("this is type myviewer dom root", typeof(myViewer.domRoot));

//     // var temp = JSON.stringify(myViewer.domRoot);

//     // console.log("this is myviewer stringify.....", typeof(temp));
//     // console.log("this is myviewer stringify", temp);
    


//     return(
//         <div>
//             This is MarmosetViewer
//             {/* <div dangerouslySetInnerHTML={createMarkup()} /> */}
//             <div ref={ref => ref.appendChild(myViewer.domRoot)}>

//             </div>
//         </div>
//     )
// }

export default MarmosetViewer;