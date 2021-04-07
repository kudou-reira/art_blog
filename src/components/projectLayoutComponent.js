import React, { Component, lazy, Suspense } from 'react';
import {withRouter} from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Typography from '@material-ui/core/Typography';
import { requirePropFactory } from '@material-ui/core';

import ImageGallery from './imageGalleryComponent';
import MarmosetViewer from './marmosetViewerComponent';
import CircularProgress from '@material-ui/core/CircularProgress';
// import HTML from '../portfolio_images/fashion_design/final/images/clothes_1.html';


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
            photos: undefined,
            final_photos: undefined,
            process_photos: undefined
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
                    final_photos: undefined,
                    process_photos: undefined,
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
        let finalPhotos = [];
        let processPhotos = [];
        
        if(prevState.pathname !== this.state.pathname) {
            if(pathname === '') {
                this.setState({ 
                    pathname: 'home',
                });
            }

            context = this.checkSwitchPath(pathname);
            tempPhotos = await this.generatePhotos(context);

            context = this.checkSwitchPathFinal(pathname);
            finalPhotos = await this.generatePhotos(context);

            context = this.checkSwitchPathProcess(pathname);
            processPhotos = await this.generatePhotos(context);

            this.setState({ 
                photos: tempPhotos,
                final_photos: finalPhotos,
                process_photos: processPhotos,
                isLoading: false
            });
        }
    }

    async componentDidMount() {
        const { projectDetails, pathname } = this.state;
        let tempPhotos = [];
        let finalPhotos = [];
        let processPhotos = [];
        var context = '';
        let fetchPoints = [];
        const babelLiteral = '!babel-loader!mdx-loader!';

        if(pathname === '') {
			this.setState({ pathname: 'home' });
        }

        context = this.checkSwitchPath(pathname);
        tempPhotos = await this.generatePhotos(context);

        context = this.checkSwitchPathFinal(pathname);
        finalPhotos = await this.generatePhotos(context);

        context = this.checkSwitchPathProcess(pathname);
        processPhotos = await this.generatePhotos(context);

        // console.log("this is process contex", context);

        this.setState({ 
            photos: tempPhotos, 
            final_photos: finalPhotos,
            process_photos: processPhotos,
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
            case 'about':
                return this.importAll(require.context("../portfolio_images/about/wip/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'publications':
                return this.importAll(require.context("../portfolio_images/publications/wip/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'segmentation':
                return this.importAll(require.context("../portfolio_images/segmentation/wip/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'style_transfer':
                return this.importAll(require.context("../portfolio_images/style_transfer/wip/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'anime_charts':
                return this.importAll(require.context("../portfolio_images/anime_charts/wip/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'kindle_scraper':
                return this.importAll(require.context("../portfolio_images/kindle_scraper/wip/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'mystical_city':
                return this.importAll(require.context("../portfolio_images/mystical_city/wip/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'octopus_study':
                    return this.importAll(require.context("../portfolio_images/octopus_study/wip/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'cathedral_sculpture':
                return this.importAll(require.context("../portfolio_images/cathedral_sculpture/wip/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'motion_graphics':
                return this.importAll(require.context("../portfolio_images/motion_graphics/wip/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'photography':
                return this.importAll(require.context("../portfolio_images/photography/wip/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'fashion_design':
                return this.importAll(require.context("../portfolio_images/fashion_design/wip/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'robot_design':
                return this.importAll(require.context("../portfolio_images/robot_design/wip/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'character_texturing':
                return this.importAll(require.context("../portfolio_images/character_texturing/wip/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case '3d_sketches':
                return this.importAll(require.context("../portfolio_images/3d_sketches/wip/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'paintings':
                return this.importAll(require.context("../portfolio_images/paintings/wip/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case '2d_studies':
                return this.importAll(require.context("../portfolio_images/2d_studies/wip/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'figure_sculpting':
                return this.importAll(require.context("../portfolio_images/figure_sculpting/wip/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            default:
                return this.importAll(require.context("../portfolio_images/home/wip/images/", true, /\.(PNG|JPE?G|SVG)$/i));
        }
    }

    checkSwitchPathFinal(folderPath) {
        // webpack requires literal path at build time

        switch(folderPath) {
            case 'publications':
                return this.importAll(require.context("../portfolio_images/publications/final/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'segmentation':
                return this.importAll(require.context("../portfolio_images/segmentation/final/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'style_transfer':
                return this.importAll(require.context("../portfolio_images/style_transfer/final/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'anime_charts':
                return this.importAll(require.context("../portfolio_images/anime_charts/final/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'kindle_scraper':
                return this.importAll(require.context("../portfolio_images/kindle_scraper/final/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'mystical_city':
                return this.importAll(require.context("../portfolio_images/mystical_city/final/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'octopus_study':
                return this.importAll(require.context("../portfolio_images/octopus_study/final/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'cathedral_sculpture':
                return this.importAll(require.context("../portfolio_images/cathedral_sculpture/final/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'motion_graphics':
                return this.importAll(require.context("../portfolio_images/motion_graphics/final/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'photography':
                return this.importAll(require.context("../portfolio_images/photography/final/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'fashion_design':
                return this.importAll(require.context("../portfolio_images/fashion_design/final/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'robot_design':
                return this.importAll(require.context("../portfolio_images/robot_design/final/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'character_texturing':
                return this.importAll(require.context("../portfolio_images/character_texturing/final/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case '3d_sketches':
                return this.importAll(require.context("../portfolio_images/3d_sketches/final/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'paintings':
                return this.importAll(require.context("../portfolio_images/paintings/final/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case '2d_studies':
                return this.importAll(require.context("../portfolio_images/2d_studies/final/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'figure_sculpting':
                return this.importAll(require.context("../portfolio_images/figure_sculpting/final/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            default:
                return this.importAll(require.context("../portfolio_images/home/final/images/", true, /\.(PNG|JPE?G|SVG)$/i));
        }
    }

    checkSwitchPathProcess(folderPath) {
        // webpack requires literal path at build time

        switch(folderPath) {
            case 'publications':
                return this.importAll(require.context("../portfolio_images/publications/process/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'segmentation':
                return this.importAll(require.context("../portfolio_images/segmentation/process/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'style_transfer':
                return this.importAll(require.context("../portfolio_images/style_transfer/process/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'anime_charts':
                return this.importAll(require.context("../portfolio_images/anime_charts/process/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'kindle_scraper':
                return this.importAll(require.context("../portfolio_images/kindle_scraper/process/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'figure_sculpting':
                return this.importAll(require.context("../portfolio_images/figure_sculpting/process/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'fashion_design':
                return this.importAll(require.context("../portfolio_images/fashion_design/process/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'robot_design':
                return this.importAll(require.context("../portfolio_images/robot_design/process/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'character_texturing':
                return this.importAll(require.context("../portfolio_images/character_texturing/process/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case '3d_sketches':
                return this.importAll(require.context("../portfolio_images/3d_sketches/process/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'paintings':
                return this.importAll(require.context("../portfolio_images/paintings/process/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case '2d_studies':
                return this.importAll(require.context("../portfolio_images/2d_studies/process/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            case 'figure_sculpting':
                return this.importAll(require.context("../portfolio_images/figure_sculpting/process/images/", true, /\.(PNG|JPE?G|SVG)$/i));
            default:
                return this.importAll(require.context("../portfolio_images/home/process/images/", true, /\.(PNG|JPE?G|SVG)$/i));
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

        // sort here?

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
            console.log("this is context wip", context);
    
    
            // create the new photo array here
            // need to make this async somehow
            // suspense will provide a loading spinner
            if(isLoading) {
                return(
                    <div >
                        <CircularProgress />
                    </div>
                )
            }

            return (
                <div>
                    <Suspense fallback={<h1><CircularProgress /></h1>}>
                        <MdFile
                            pathname={pathname}
                            folderPath={folderPath}
                            ImageGallery={<ImageGallery photos={this.state.photos} />}
                        />
                    </Suspense>
                </div>
            )             
        }

        if (folderPath === 'process') {
            console.log("hi")
            if(isLoading) {
                return(
                    <div >
                        <CircularProgress />
                    </div>
                )
            }
            console.log("this is context wip", context);
            return (
                <div>
                    <Suspense fallback={<h1><CircularProgress /></h1>}>
                        <MdFile
                            pathname={pathname}
                            folderPath={folderPath}
                            ImageGallery={<ImageGallery photos={this.state.process_photos} />}
                        />
                    </Suspense>
                </div>
            )    
        }

        if (folderPath === 'final') {
            if(isLoading) {
                return(
                    <div >
                        <CircularProgress />
                    </div>
                )
            }

            return (
                <div>
                    <Suspense fallback={<h1><CircularProgress /></h1>}>
                        <MdFile
                            pathname={pathname}
                            folderPath={folderPath}
                            MarmosetViewer={<MarmosetViewer />}
                            ImageGallery={<ImageGallery photos={this.state.final_photos} />}
                        />
                    </Suspense>
                </div>
            )    
        }

        return(
            <div>
                <Suspense fallback={<h1><CircularProgress /></h1>}>
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
                        {/* add modal bound */}
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
