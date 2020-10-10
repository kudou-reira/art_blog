import React, { Component, useEffect } from 'react';

// import marmosetViewerComponent in project layout, pass it down, render

function new_script(src) {
    return new Promise(function(resolve, reject){
        var script = document.createElement('script');
        script.src = src;
        script.addEventListener('load', function () {
            resolve();
        });
        script.addEventListener('error', function (e) {
            reject(e);
        });
        document.body.appendChild(script);
    })
};

  // Promise Interface can ensure load the script only once.
var marmoset = new_script('../lib/marmoset.js');

{/* <iframe src='./images/clothes_1.html' allowfullscreen=”true” height=”800″ width=”600″></iframe> */}


class MarmosetViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: 'start'
        }
    }

    do_load = () => {
        var self = this;
        marmoset.then(function() {
            self.setState({'status': 'done'});
        }).catch(function() {
            self.setState({'status': 'error'});
        })
    }
    
    render() {
        var self = this;
        if (self.state.status === 'start') {
          self.state.status = 'loading';
          setTimeout(function () {
              self.do_load()
            }, 0);
        }

        var params = { width: 1024, height: 768, autoStart: false };
        var myviewer = marmoset.embed( "../portfolio_images/fashion_design/final/images/clothes_1.mview", params );
    
        return (
            <div>
                {myviewer}
            </div>
        );
    }
}



// export default function MarmosetViewer(props) {

//     useEffect(() => {
//         const marmoset = document.createElement("script");
//         marmoset.src = "../lib/marmoset.js";
//         marmoset.async = true;
//         document.body.appendChild(marmoset);
//     })
    
//     // const marmoset = require( './marmoset.js');
    // var params = { width: 1024, height: 768, autoStart: false };
    // var myviewer = marmoset.embed( "../portfolio_images/fashion_design/final/images/clothes_1.mview", params );
    

//     return(
//         <div>
//             This is MarmosetViewer
//             {myviewer}
//         </div>
//     )
// }

export default MarmosetViewer;