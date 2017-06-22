require('normalize.css/normalize.css');
require('styles/App.css');//引入CSS方式

import React from 'react';
//获取图片相关的数据
let imageDatas = require('../data/imageData.json');
//利用自执行函数，将图片名信息转成URL路径信息
imageDatas  = (function genImageURL(imageDataArr) {
  for (let i = 0; i < imageDataArr.length; i++) {
    let singleImageData = imageDataArr[i];
    singleImageData.imageURL = require('../images/' + singleImageData.fileName);
    imageDataArr[i] = singleImageData;
  }
  return imageDataArr;
})(imageDatas);

let ImgFigure = React.createClass({
  render:function(){
    return(
      <figure className="img-figure">
        <img src={this.props.data.imageURL} alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    )
  }
})



class AppComponent extends React.Component {
  render() {
    let controllerUnits = [];
    let imgFigures = [];
    imageDatas.forEach((value)=>{
        imgFigures.push(<ImgFigure data={value}/>);
    });
    return (
      <section className="stage">
          <section className="image-sec">
              {imgFigures}
          </section>
          <nav className="controller-nav">
              {controllerUnits}
          </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
