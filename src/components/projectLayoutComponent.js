import React, { Component, lazy, Suspense } from 'react';
import {withRouter} from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Typography from '@material-ui/core/Typography';
import { requirePropFactory } from '@material-ui/core';

import ImageGallery from './imageGalleryComponent';


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
            wip: '',
            isLoading: true,
            photos: undefined
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps !== undefined) {
            if (this.state.pathname !== nextProps.pathname) {
                this.setState({
                    pathname: nextProps.pathname, 
                    projectAll: nextProps.projectAll, 
                    projectDetails: nextProps.projectDetails,
                    resourcePath: nextProps.resourcePath,
                    photos: undefined, 
                    isLoading: true 
                });
                console.log("true, component will receive props");
            }
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        const { projectDetails, pathname } = this.state;
        var context = '';
        let tempPhotos = [];
        
        if(prevState.pathname !== this.state.pathname) {
            if(pathname === '') {
                this.setState({ 
                    pathname: 'home',
                });
            }

            var context = this.checkSwitchPath(pathname);
            tempPhotos = await this.generatePhotos(context);
            this.setState({ photos: tempPhotos, isLoading: false });
        }
    }

    async componentDidMount() {
        const { projectDetails, pathname } = this.state;
        let tempPhotos = [];
        var context = '';
        let fetchPoints = [];
        const babelLiteral = '!babel-loader!mdx-loader!';

        console.log("this is pathname", pathname);

        if(pathname === '') {
			this.setState({ pathname: 'home' });
        }

        context = this.checkSwitchPath(pathname);
        tempPhotos = await this.generatePhotos(context);

        this.setState({ 
            photos: tempPhotos, 
            isLoading: false 
        });
    }


    renderProjectLayoutDisplay() {
        return (
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

    testFunction() {
        return 2 + 4;
    }

    checkSwitchPath(folderPath) {
        // webpack requires literal path at build time

        switch(folderPath) {
            case 'publications':
                return this.importAll(require.context("../portfolio_images/publications/wip/images/", true, /\.(PNG|JPE?G|SVG)$/));
            case 'segmentation':
                return this.importAll(require.context("../portfolio_images/segmentation/wip/images/", true, /\.(PNG|JPE?G|SVG)$/));
            case 'style_transfer':
                return this.importAll(require.context("../portfolio_images/style_transfer/wip/images/", true, /\.(PNG|JPE?G|SVG)$/));
            case 'anime_charts':
                return this.importAll(require.context("../portfolio_images/anime_charts/wip/images/", true, /\.(PNG|JPE?G|SVG)$/));
            case 'figure_sculpting':
                return this.importAll(require.context("../portfolio_images/figure_sculpting/wip/images/", true, /\.(PNG|JPE?G|SVG)$/));
            case 'fashion_design':
                return this.importAll(require.context("../portfolio_images/fashion_design/wip/images/", true, /\.(PNG|JPE?G|SVG)$/));
            case 'robot_design':
                return this.importAll(require.context("../portfolio_images/robot_design/wip/images/", true, /\.(PNG|JPE?G|SVG)$/));
            case 'character_design':
                return this.importAll(require.context("../portfolio_images/character_design/wip/images/", true, /\.(PNG|JPE?G|SVG)$/));
            case '3d_sketches':
                return this.importAll(require.context("../portfolio_images/3d_sketches/wip/images/", true, /\.(PNG|JPE?G|SVG)$/));
            case 'paintings':
                return this.importAll(require.context("../portfolio_images/paintings/wip/images/", true, /\.(PNG|JPE?G|SVG)$/));
            case '2d_studies':
                return this.importAll(require.context("../portfolio_images/2d_studies/wip/images/", true, /\.(PNG|JPE?G|SVG)$/));
            case '2d_sketches':
                return this.importAll(require.context("../portfolio_images/2d_sketches/wip/images/", true, /\.(PNG|JPE?G|SVG)$/));
            case 'figure_sculpting':
                return this.importAll(require.context("../portfolio_images/figure_sculpting/wip/images/", true, /\.(PNG|JPE?G|SVG)$/));
            default:
                return this.importAll(require.context("../portfolio_images/home/wip/images/", true, /\.(PNG|JPE?G|SVG)$/));
        }
    }

    nearestAspectRatio(width, height, side) {
        var
        ratioX=0,
        ratio = (width * 100) / (height * 100),
        maxW = 3 in arguments ? arguments[2] : 16,
        maxH = 4 in arguments ? arguments[3] : 16,
        ratiosW = new Array(maxW).join(',').split(','),
        ratiosH = new Array(maxH).join(',').split(','),
        ratiosT = {},
        ratios = {},
        match,
        key;

        ratiosW.forEach(function (empty, ratioW) {
            ++ratioW;

            ratiosH.forEach(function (empty, ratioH) {
                ++ratioH;

                ratioX = (ratioW * 100) / (ratioH * 100);

                if (!ratiosT[ratioX]) {
                    ratiosT[ratioX] = true;

                    ratios[ratioW + ':' + ratioH] = ratioX;
                }
            });
        });

        for (key in ratios) {
            if (!match || (
                !side && Math.abs(ratio - ratios[key]) < Math.abs(ratio - ratios[match])
            ) || (
                side < 0 && ratios[key] <= ratio && Math.abs(ratio - ratios[key]) < Math.abs(ratio - ratios[match])
            ) || (
                side > 0 && ratios[key] >= ratio && Math.abs(ratio - ratios[key]) < Math.abs(ratio - ratios[match])
            )) {
                match = key;
            }
        }
        
        return match;
    }


    getDimensions(url) {
        return new Promise((resolve, reject) => {
            var img = new Image();
            img.onload = () => resolve([img.width, img.height]);
            img.onerror = reject;
            img.src = url;
        });
    }

    async getImgSrc(context) {
        let photos = [];

        console.log("this is context", context);
        await Promise.all(context.map(async (file) => {
            let dimensions = await this.getDimensions(file);

            // ar is a string
            let ar = this.nearestAspectRatio(dimensions[0], dimensions[1]);
            var[width, height] = ar.split(":");    

            photos.push({
                src: file,
                width,
                height,
            });
        }));

        return photos;
    }

    async generatePhotos(context) {
        let photos = [];
        let ar = 0;
        let newWidth = 0;
        let newHeight = 0;
        
        photos = await this.getImgSrc(context);

        console.log("intermediary photos", photos);

        return photos;
    }

    renderDetails(detailPath, folderPath, projectAll) {
        let { pathname, isLoading, photos } = this.state;
        // let mdFile = '';
        

        if('final' in projectAll && folderPath === 'final') {
            console.log("there are resources to be rendered");

            this.checkFileFormat(projectAll[folderPath]);
        }
        

        const MdFile = lazy(async() => (await import('!babel-loader!mdx-loader!' + "../portfolio_images/" + pathname + "/" + folderPath + "/" + folderPath + ".mdx")));


        // use a switch statement here to check all context files
        // return a different string based on each pathname
        console.log("this is folderPath", folderPath);

        // let tempPhotos = [];

        if (folderPath === 'wip') {
            var context = this.checkSwitchPath(pathname);

            // var context = this.importAll(require.context("../portfolio_images/robot_design/wip/images/", true, /\.(PNG|JPE?G|SVG)$/));

            console.log("before");
            console.log("this is context", context);
    
    
            // create the new photo array here
            // need to make this async somehow
            // suspense will provide a loading spinner
            if(isLoading) {
                return(
                    <div >
                        Loading...
                    </div>
                )
            }

            return (
                <div>
                    <Suspense fallback={<h1>Loading...</h1>}>
                        <MdFile
                            pathname={pathname}
                            folderPath={folderPath}
                            ImageGallery={<ImageGallery photos={this.state.photos} />}
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
