//跨浏览器添加事件
function addEvent(element,event,listener){
  if(element.addEventListener){
    element.addEventListener(event,listener,false);
  }
  else if(element.attachEvent){
    element.attachEvent('on'+event,listener);
  }
  else{
    element['on'+event] = listener;
  }
}
//遍历数组，数组中的每个元素使用fn函数
function each(arr,fn){
  for(var cur=0,len=arr.length;cur<len;cur++){
    fn(arr[cur],cur);
  }
}

window.onload = function(){
  var container = document.getElementById('container');
  var buttonList = document.getElementsByTagName('input');
  
  //定义队列的对象
  var queue = {
    str : [],
    leftPush : function(num){
      this.str.unshift(num);
      this.paint();
    },
    rightPush : function(num){
      this.str.push(num);
      this.paint();
    },
    isEmpty : function(){
      return (this.str.length == 0);
    },
    leftPop : function(){
      if(!this.isEmpty()){
        alert(this.str.shift());
        this.paint();
      }
      else{
        alert("The queue is already empty!");
      }
    },
    rightPop : function(){
      if(!this.isEmpty()){
        alert(this.str.pop());
        this.paint();
      }
      else{
        alert("The queue is already empty!");
      }
    },
    paint : function(){
      var s = "";
      each(this.str,function(item){s += ('<div>'+parseInt(item)+'</div>')});
      container.innerHTML = s;
      addDivDelEvent();
    },
    deleteID : function(id){
      this.str.splice(id,1);
      this.paint();
      console.log(id);
    }
  }
  //为container的每个div添加删除事件
  function addDivDelEvent(){
    //使用闭包，不然读取的cur一直是最后一个
    for(var cur=0,len=container.childNodes.length;cur<len;cur++){
      addEvent(container.childNodes[cur],'click',
        function(cur){
          return function(){
            return queue.deleteID(cur);
          };
        }(cur));
    }
  }
  //为4个按钮绑定点击函数
  addEvent(buttonList[1],'click',
    function(){
      var input = buttonList[0].value;
      if((/^[0-9]+$/).test(input)){
        queue.leftPush(input);
      }
      else{
        alert("Please enter an interger!");
      }
    });
  addEvent(buttonList[2],'click',
    function(){
      var input = buttonList[0].value;
      if((/^[0-9]+$/).test(input)){
        queue.rightPush(input);
      }
      else{
        alert("Please enter an interger!");
      }
    });
  addEvent(buttonList[3],'click',function(){queue.leftPop()});
  addEvent(buttonList[4],'click',function(){queue.rightPop()});
}