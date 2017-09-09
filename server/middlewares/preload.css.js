export default `
  *,
  *:before,
  *:after {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
  }

  *{
    font-family: "Helvetica Neue", Helvetica,Arial, "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif; 
  }
  
  .spinner {
    margin: 20px auto;
    width: 100px;
    height: 60px;
    text-align: center;
    font-size: 10px;
  }
  
  .spinner > div {
    background-color: lightgray;
    height: 100%;
    width: 10px;
    margin: 5px;
    display: inline-block;
    
    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
  }
  
  .spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }
  
  .spinner .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }
  
  .spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }
  
  .spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }
  
  @-webkit-keyframes sk-stretchdelay {
    0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
    20% { -webkit-transform: scaleY(1.0) }
  }
  
  @keyframes sk-stretchdelay {
    0%, 40%, 100% { 
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }  20% { 
      transform: scaleY(1.0);
      -webkit-transform: scaleY(1.0);
    }
  }

  .spinner-header{
    text-align:center;
    display: block;
    color: black;
    margin: 20px;
    color:#555;
  }

  .spinner-container{
    top:150px;
    text-align:center;
    z-index:255;
    position:absolute;
    left:50%;
    margin-left:-350px;
    width:700px;
    height:300px;
  }

  .spinner-footer{
    text-align:center;
    display: block;
    color: black;
    margin: 40px;
    color:#555;
  }`
;
