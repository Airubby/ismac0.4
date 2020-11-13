<template>
    <div class="content">
        
    </div>
</template>
<script>
export default {
    created() {
        
    },
    mounted() {
        var div2 = document.getElementById('div2');
        var div3 = document.getElementById('div3');
        var x = 0;
        var y = 0;

        document.onmousedown = function(ev) {
        var oEvent = ev || event;

        //x、y分别代表，鼠标与div之间的横坐标和纵坐标
        x = oEvent.clientX - div2.offsetLeft;
        y = oEvent.clientY - div2.offsetTop;

        document.onmousemove = function(ev) {
        var oEvent = ev || event;

        //m、n分别代表div的横、纵坐标
        var m = oEvent.clientX - x;
        var n = oEvent.clientY - y;

        //当左边小于50，就让m=0，形成磁性吸附的现象
        if(m < 50) {
        m = 0;
        } else if(m > (div3.offsetWidth - div2.offsetWidth - 50)) {
        m = div3.offsetWidth - div2.offsetWidth;
        }

        if(n < 50) {
        n = 0;
        } else if(n > (div3.offsetHeight - div2.offsetHeight - 50)) {
        n = div3.offsetHeight - div2.offsetHeight;
        }

        //设置div的坐标
        div2.style.left = m + 'px';
        div2.style.top = n + 'px';

        };

        document.onmouseup = function(ev) {
        var oEvent = ev || event;

        //释放move事件，如果不释放，放开鼠标后，div仍然会跟随鼠标移动
        document.onmousemove = null;
        document.onmouseup = null;
        };
        };
    },
    data(){
        return{
            
        }
    },
    computed: {
    },
	methods: {
        
	},
    components: {
        
    }
}
</script>
<style lang="less" scoped>
    .module-theme(...){
        #div2 {
width: 150px;
height: 150px;
position: absolute;
background: #CCCCCC;
}

#div3 {
width: 600px;
height: 500px;
position: absolute;
background: #2A6496;
}
    }
</style>