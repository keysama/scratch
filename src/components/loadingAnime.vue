<template>
    <div id="loading">
        <div id="loading-center">
            <div id="loading-center-absolute">
                <div class="object" id="object_one"></div>
                <div class="object" id="object_two" style="left:20px;"></div>
                <div class="object" id="object_three" style="left:40px;"></div>
                <div class="object" id="object_four" style="left:60px;"></div>
                <div class="object" id="object_five" style="left:80px;"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

};
</script>
<style scoped lang="less">
#loading{
	height: 100%;
	width: 100%;
	position: absolute;
	z-index: 1;
	margin-top: 0px;
	top: 0px;
}
#loading-center{
	width: 100%;
	height: 100%;
	position: relative;
	}
#loading-center-absolute {
	position: absolute;
	left: 50%;
	top: 50%;
	height: 20px;
	width: 100px;
	margin-top: -10px;
	margin-left: -50px;

}
.object{
	width: 20px;
	height: 20px;
	background-color: rgb(125,172,66);
	-moz-border-radius: 50% 50% 50% 50%;
	-webkit-border-radius: 50% 50% 50% 50%;
	border-radius: 50% 50% 50% 50%;
	margin-right: 20px;
	margin-bottom: 20px;
	position: absolute;	
}


#object_one{
	-webkit-animation: object 2s linear infinite;
	 animation: object 2s linear infinite;
	 }
#object_two{ 
	-webkit-animation: object 2s linear infinite -.4s;
	animation: object 2s linear infinite -.4s;
	 }
#object_three{ 
	-webkit-animation: object 2s linear infinite -.8s; 
	animation: object 2s linear infinite -.8s; 
	}
#object_four{ 
	-webkit-animation: object 2s linear infinite -1.2s;
	animation: object 2s linear infinite -1.2s; 
	} 
#object_five{ 
	-webkit-animation: object 2s linear infinite -1.6s; 
	animation: object 2s linear infinite -1.6s; 
	}
	
	
@-webkit-keyframes object{
  0% { left: 100px; top:0}
  80% { left: 0; top:0;}
  85% { left: 0; top: -20px; width: 20px; height: 20px;}
  90% { width: 40px; height: 15px; }
  95% { left: 100px; top: -20px; width: 20px; height: 20px;}
  100% { left: 100px; top:0; }		
	
}		
@keyframes object{
  0% { left: 100px; top:0}
  80% { left: 0; top:0;}
  85% { left: 0; top: -20px; width: 20px; height: 20px;}
  90% { width: 40px; height: 15px; }
  95% { left: 100px; top: -20px; width: 20px; height: 20px;}
  100% { left: 100px; top:0; }
}	
</style>
      