import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

//import MyReactImageMagnify from "./MyReactImageMagnify";

class Gallery extends Component {
  render() {
    const properties = {
      thumbnailPosition: "left",
      useBrowserFullscreen: false,
      showPlayButton: false,
      showThumbnails: false,
      showFullscreenButton: false,
      showBullets: true,
      showIndex: true,

      items: [
        {
          original:
            "https://www.ncaa.com/_flysystem/public-s3/styles/large_16x9/public-s3/thumbnails/2019-10-03/di-mbk-katz-champions-classic-preview-2019.jpg?h=d6a0db88&itok=5zUOkWe_",
          thumbnail:
            "https://www.ncaa.com/_flysystem/public-s3/styles/large_16x9/public-s3/thumbnails/2019-10-03/di-mbk-katz-champions-classic-preview-2019.jpg?h=d6a0db88&itok=5zUOkWe_",
          originalHeight: 200,
          originalWidth: 300,
          thumbnailHeight: 150,
          thumbnailWidth: 225,
          originalTitle: "NCAA Basketball",
        },
        {
          original:
            "https://sportshub.cbsistatic.com/i/r/2018/03/14/350b6004-0ed6-4389-816a-cf62de4c56c0/thumbnail/640x360/16316ea7378546f7cea7b855826f2621/usatsi-10697375.jpg",
          thumbnail:
            "https://sportshub.cbsistatic.com/i/r/2018/03/14/350b6004-0ed6-4389-816a-cf62de4c56c0/thumbnail/640x360/16316ea7378546f7cea7b855826f2621/usatsi-10697375.jpg",
          originalHeight: 200,
          originalWidth: 300,
          thumbnailHeight: 150,
          thumbnailWidth: 225,
          originalTitle: "NCAA Basketball",
        },
        {
          original:
            "https://cdn.abcotvs.com/dip/images/6355738_080520-wtvd-NCAA-basketball-img.jpg?w=1600",
          thumbnail:
            "https://cdn.abcotvs.com/dip/images/6355738_080520-wtvd-NCAA-basketball-img.jpg?w=1600",
          originalHeight: 200,
          originalWidth: 300,
          thumbnailHeight: 150,
          thumbnailWidth: 225,
          originalTitle: "NCAA Basketball",
        },
      ],
    };

    return <ImageGallery {...properties} />;
  }
}

export default Gallery;
