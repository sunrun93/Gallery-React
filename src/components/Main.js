require('normalize.css/normalize.css');
require('styles/App.less');//引入CSS方式
let ReactDOM = require('react-dom');

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

//获取区间内的随机值
function getRangeRandom(low,high){
  return Math.ceil(Math.random()*(high-low)+low);
}
//获取0-30°之间旋转的正值
function get30degRandom(){
  return (Math.random()>0.5?'':'-')+Math.ceil(Math.random()*3);
}

let ImgFigure = React.createClass({
  // imgFigure的点击处理函数
  handelClick:function(e){
    if(this.props.arrange.isCenter){
        this.props.inverse();
    }else{
      this.props.center();
    }
    
    e.stopPropagation();
    e.preventDefault();
  },
  render:function(){
    let styleObj={};
    //如果props属性中制定了这张图片的位置，则使用
    if(this.props.arrange.pos){
      styleObj = this.props.arrange.pos;
    }
    //如果图片须安装角度值不为0，添加旋转角度
    if (this.props.arrange.rotate) {
      ['-moz-', '-ms-', '-webkit-', ''].forEach(function (value) {
        styleObj[value + 'transform'] = `rotate(${this.props.arrange.rotate}deg)`;
      }.bind(this))

    }

    let imgFigureClassName = 'img-figure';
    imgFigureClassName+=this.props.arrange.isInverse?' is-inverse':''

    return(
      <figure className={imgFigureClassName} style={styleObj} onClick={this.handelClick}>
        <img src={this.props.data.imageURL} alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" onClick={this.handelClick}>
            <p>
              {this.props.data.desc}
            </p>
          </div>
        </figcaption>
      </figure>
    )
  }
})

//控制组件
var ControllerUnit = React.createClass({
  handleClick:function(e){
    e.stopPropagation();
    e.preventDefault();
    },
  render:function(){
    return(
      <span className = "controller-unit" onClick={this.handleClick}></span>
    );
  }
})

var AppComponent = React.createClass({
  Constant: {//初始化各分区的取值都为0
    centerPos: {
      left: 0,
      right: 0
    },
    hPosRange: {//水平方向取值范围
      leftSecX: [0, 0],//左分区
      rightSecX: [0, 0],//右分区
      y: [0, 0]
    },
    vPosRange: {//垂直方向取值范围
      x: [0, 0],
      topY: [0, 0]
    }
  },

  
  // *翻转图片
  // *param index 输入当前被执行inverse操作的图片对应图片信息数组的index值
  // * return {Function}只设一个闭包函数，其内return一个真正执行的函数
   
  inverse:function(index){
    return function(){
      var imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({
        imgsArrangeArr:imgsArrangeArr
      })
    }.bind(this)
  },

  /*
  *重新布局所有图片
  *@param centerIndex指定居中排布哪个图片
   */
  rearrange:function(centerIndex){
    let imgsArrangeArr = this.state.imgsArrangeArr,
    Constant = this.Constant,
    centerPos = Constant.centerPos,
    hPosRange = Constant.hPosRange,
    vPosRange = Constant.vPosRange,
    //左右两侧区域x,y的取值范围
    hPosRangeLeftSecX = hPosRange.leftSecX,
    hPosRangeRightSecX = hPosRange.rightSecX,
    hPosRangeY = hPosRange.y,
    //上侧区域x,y的取值范围
    vPosRangeTopY = vPosRange.topY,
    vPosRangeX = vPosRange.x,

    //用以存储上侧图片的状态信息
    imgsArrangeTopArr = [];
    let topImgNum = Math.ceil(Math.random()*2);//取一个或者不取
    let topImgSpliceIndex = 0;//上侧图片是数组中的哪一个，初始化为0

    let imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);//中心图片的状态信息

    //首先居中centerIndex的图片
    imgsArrangeCenterArr[0] = {
        pos : centerPos,
        rotate : 0,
        isCenter :true
    }
    //居中的图片不旋转
    imgsArrangeCenterArr[0].rotate = 0;

    //取出要布局上侧图片索引  取上侧图片的状态信息
    topImgSpliceIndex = Math.ceil(Math.random(imgsArrangeArr.length-topImgNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);
    // 布局上侧的图片
    imgsArrangeTopArr.forEach(function(value,index){
      imgsArrangeTopArr[index] = {
        pos: {
          top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
          left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
        },
        rotate: get30degRandom(),
        isCenter:false
        }
      })


    //布局左右两侧的图片
    for(let i=0,j = imgsArrangeArr.length,k=j/2;i<j;i++){
      let hPosRangeLorRX = null;
      //前半部分布局左边，右半部分布局右边
      if(i<k){
        hPosRangeLorRX = hPosRangeLeftSecX;
      }else{
        hPosRangeLorRX = hPosRangeRightSecX;
      }
      imgsArrangeArr[i]={
          pos:{
              top:getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
              left:getRangeRandom(hPosRangeLorRX[0],hPosRangeLorRX[1])
            },
          rotate:get30degRandom(),
          isCenter:false
      }
    }
    //把top元素插回到原来的数组中
    if(imgsArrangeTopArr &&imgsArrangeTopArr[0]){
      imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
    }
    //把中间区域的图片元素插回原来的数组
    imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

    //设置state触发component的重新渲染
    this.setState({
      imgsArrangeArr:imgsArrangeArr
    });
  },

  //利用rearrange函数，居中对应index的图片
  center:function(index){
      return function(){
        this.rearrange(index);
      }.bind(this);
  },

  getInitialState:function(){
    return{
      imgsArrangeArr:[
          // {
          //   pos: {
          //       left: '0',
          //       top: '0'
          //     },
          //   rotate: 0, //旋转角度
          //   isInverse: false,
          //   isCenter:false //默认图片是否居中
          // }
      ]
    }
  },

  
  //图片加载后，为每个图片计算其位置
  componentDidMount:function () {//加载完成后的构造函数
    //拿到舞台大小
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
    stageW = stageDOM.scrollWidth;
    let stageH = stageDOM.scrollHeight;
    let halfStageW = Math.ceil(stageW/2);
    let halfStageH = Math.ceil(stageH/2);

    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0);
    let imgW=imgFigureDOM.scrollWidth;
    let imgH=imgFigureDOM.scrollHeight;
    let halfImgW=Math.ceil(imgW/2);
    let halfImgH=Math.ceil(imgH/2);
    //计算中心图片位置点
    this.Constant.centerPos = {
      left:halfStageW-halfImgW,
      top:halfStageH-halfImgH
    }

    //计算左两侧区域的x取值范围
    this.Constant.hPosRange.leftSecX[0] =-halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW*3;
    //计算右侧区域x的取值范围
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    //计算左右两侧区域Y的取值范围
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    //计算上侧区域y的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH*3;
    //计算上侧区域x的取值范围
    this.Constant.vPosRange.x[0] = halfImgW-imgW;
    this.Constant.vPosRange.x[1] = halfImgW;

    this.rearrange(0);

  },
  render() {
    let controllerUnits = [];
    let imgFigures = [];

    imageDatas.forEach(function(value,index){

    if(!this.state.imgsArrangeArr[index]){
      this.state.imgsArrangeArr[index] = {
        pos:{
          left:0,
          top:0
        },
        rotate:0,
        inInverse:false,
        isCenter:false
      }
    }
    
      imgFigures.push(<ImgFigure key={index} data={value} ref={`imgFigure${index}`}
      arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);//通过arrange将图片的状态信息传递给imgsFigure
      controllerUnits.push(<ControllerUnit/>)
  }.bind(this));//用箭头函数bind方法报错

    return (
      <section className="stage" ref="stage">
        <section className="image-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
  })
 
ReactDOM.render(<AppComponent/>,document.getElementById('app'));//注意reactDOM.render取代原来的方法
module.exports = AppComponent;
