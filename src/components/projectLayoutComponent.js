import React, { Component, lazy, Suspense } from 'react';
import {withRouter} from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Typography from '@material-ui/core/Typography';
import { requirePropFactory } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';


// import {importMDX} from 'mdx.macro';


class ProjectLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pathname: props.pathname,
            projectDetails: props.projectDetails,
            projectAll: props.projectAll,
            resourcePath: props.resourcePath,
            overview: '',
            final: '',
            background: '',
            process: '',
            wip: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps !== undefined) {
            if (this.state.pathname !== nextProps.pathname) {
                this.setState({
                    pathname: nextProps.pathname, 
                    projectAll: nextProps.projectAll, 
                    projectDetails: nextProps.projectDetails,
                    resourcePath: nextProps.resourcePath
                });
                console.log("true");
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        let { pathname } = this.state;
        if(prevState.pathname !== this.state.pathname) {
            if(pathname === '') {
                this.setState({ pathname: 'home' });
            }
        }

        // if(prevState.pathname !== this.state.pathname) {
        //     let { projectDetails, pathname } = this.state;

        //     let fetchPoints = [];

        //     projectDetails.map((obj, index) => {
        //         // console.log("this is obj", obj);

        //         let mdFile = '';
        //         let folderPath = obj.folder_path;

        //         if(pathname === '') {
        //             pathname = 'home';
        //         }

        //         mdFile = require("../portfolio_images/" + pathname + "/" + folderPath + "/" + folderPath + ".md");
        //         fetchPoints.push(mdFile);
                
        //         // build an array of fetches with mdFile as the endpoint
        //     });

        //     const files = await Promise.all(fetchPoints.map((file) => fetch(file). then((res) => res.text()))).catch((err) => console.error(err));
            
        //     this.setState({
        //         overview: files[0],
        //         final: files[1],
        //         background: files[2],
        //         process: files[3],
        //         wip: files[4]
        //     })
        // }
    }

    componentDidMount() {
        let { projectDetails, pathname } = this.state;
        let fetchPoints = [];
        const babelLiteral = '!babel-loader!mdx-loader!';

        console.log("this is pathname", pathname);

        if(pathname === '') {
			this.setState({ pathname: 'home' });
		}

        projectDetails.map((obj, index) => {
            // console.log("this is obj", obj);

            let mdFile = '';
            let folderPath = obj.folder_path;

            // if(pathname === '') {
            //     pathname = 'home';
            // }

            // mdFile = lazy(() => import(babelLiteral + "../portfolio_images/" + pathname + "/" + folderPath + "/" + folderPath + ".md"));

            // console.log("this is mdFIle", mdFile);

            // mdFile = lazy(() => importMDX("../portfolio_images/" + pathname + "/" + folderPath + "/" + folderPath + ".md"));
            // mdFile = importMDX.sync("../portfolio_images/" + pathname + "/" + folderPath + "/" + folderPath + ".md").then(component => {
            //     console.log(component, "loaded successfully");
            // });

            // console.log()

            // console.log("this is pathname", pathname);

            // mdFile = require("../portfolio_images/" + pathname + "/" + folderPath + "/" + folderPath + ".md");
            // fetchPoints.push(mdFile);

            
            // build an array of fetches with mdFile as the endpoint
        });

        // const files = await Promise.all(fetchPoints.map((file) => fetch(file). then((res) => res.text()))).catch((err) => console.error(err));
        
        // this.setState({
        //     overview: files[0],
        //     final: files[1],
        //     background: files[2],
        //     process: files[3],
        //     wip: files[4]
        // })

    }


    renderProjectLayoutDisplay() {
        return (
            // <ImageResults 
            //     database={this.state.database_id}
            // />
            <div>
                {this.renderText()}
            </div>
        )
    }

    checkFileFormat(files) {

    }

    importAll(r) {
        // console.log("this is import all");
        // console.log(r.keys().map(r));
        return r.keys().map(r);
    }


    renderDetails(detailPath, folderPath, projectAll) {
        let { pathname } = this.state;
        // let mdFile = '';
        

        if('final' in projectAll && folderPath === 'final') {
            console.log("there are resources to be rendered");

            this.checkFileFormat(projectAll[folderPath]);
        } 

        // mdFile = <ReactMarkdown source={this.state[folderPath]} />
        console.log("this is detailPath", detailPath);
        console.log("this is folderPath", folderPath);

        

        const MdFile = lazy(async() => (await import('!babel-loader!mdx-loader!' + "../portfolio_images/" + pathname + "/" + folderPath + "/" + folderPath + ".mdx")));



        // let imageDir = 

        console.log("this is folderPath", folderPath);

        let renderGallery = '';

        if (folderPath === 'wip') {
            renderGallery = true;
            console.log("this is renderGallery", renderGallery);
        }


        // let ImageGallery = lazy(async() => (await import('./imageGalleryComponent')));

        // let wipImages = lazy(async() => (await importAll(require.context('!babel-loader!mdx-loader!' + "../portfolio_images/" + pathname + "/" + folderPath + "/" + folderPath + "images", false, /\.(png|jpe?g|svg)$/))));

        

        // if(renderGallery) {
        //     const ImageGallery = lazy(async() => (await import('./imageGalleryComponent')));

        //     let wipImages = lazy(async() => (await this.importAll(require.context('!babel-loader!mdx-loader!' + "../portfolio_images/" + pathname + "/" + folderPath + "/" + folderPath + "images", false, /\.(png|jpe?g|svg)$/))));

        //     console.log("this is wipImages", wipImages);


        //     return(
        //         <div>
        //             <Suspense fallback={<h1>Loading...</h1>}>
        //                 <MdFile
        //                     pathname={pathname}
        //                     folderPath={folderPath}
        //                     test={'working?'}
        //                     importAll={this.importAll}
        //                     imageGallery={<ImageGallery photos={wipImages} />}
        //                 />
        //             </Suspense>
        //         </div>
        //     )
        // }

        

        // import ImageGallery from './imageGalleryComponent';

        // <div>{props.importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/))}</div>

        // <img src={img} />

        else {
            return(
                <div>
                    <Suspense fallback={<h1>Loading...</h1>}>
                        <MdFile
                            pathname={pathname}
                            folderPath={folderPath}
                            test={'working?'}
                            importAll={this.importAll}
                            // imageGallery={renderGallery ? <ImageGallery photos={wipImages} /> : null}
                        />
                    </Suspense>
                </div>
            )
        }

        return(
            <div>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <MdFile
                        pathname={pathname}
                        folderPath={folderPath}
                        test={'working?'}
                        importAll={this.importAll}
                        // imageGallery={renderGallery ? <ImageGallery photos={wipImages} /> : null}
                    />
                </Suspense>
            </div>
        )


        // return mdFile;
    }

    renderText() {
        let textItems = [];
        let tempText = '';

        let { resourcePath, pathname, projectAll } = this.state;

        tempText = (
            <Typography variant="h2" gutterBottom>
                {projectAll.text}
            </Typography>
        );

        textItems.push(tempText);

        this.state.projectDetails.map((obj, index) => {
            tempText = (
                <Typography variant="h4" gutterBottom>
                    {obj.text}
                    <Typography gutterBottom>
                        {this.renderDetails(pathname  + "/" + obj.folder_path, obj.folder_path, projectAll)}
                    </Typography>
                </Typography>
            )

            textItems.push(tempText);
        });

        return textItems;
    }

    render() {
        return(
            <div>
                <div>
                    {this.renderProjectLayoutDisplay()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        results: state.upload
    };
}


export default connect(mapStateToProps, actions)(withRouter(ProjectLayout));
