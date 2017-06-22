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


class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
          <section className="image-sec">
          </section>
          <nav className="controller-nav">
          </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
