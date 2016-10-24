var myvue = new Vue({
    el:"#main",
    data:{
        isShow:false,
        order: parseInt(location.hash.substring(location.hash.indexOf("=")+1,location.hash.length)),
        number:[],
        items:[]
    },
    methods:{
        showPic:function(){
            this.isShow = true;
        },
        hidePic:function(){
            this.isShow = false;
        },
        init:function(){
            this.liClass = "li"+this.order;
            this.photo = this.order*this.order;
            this.randomNum();
        },
        randomNum:function(){
            var me=this;
            for(var i=0;i<me.photo-1;i++){
                var option = Math.ceil(Math.random()*(me.photo-1));
                if(me.number.indexOf(option)<0){
                    me.number.push(option);
                }
                else{
                    i--;
                }
            }
            me.getData();
        },
        getData:function(){
            var me=this;
            for(var i= 0;i<me.photo-1;i++){
                var li={};
                li.name = "img"+me.number[i];
                li.path = "../images/"+me.order+"_"+me.number[i]+".jpg";
                me.items.push(li);
            }
            me.items.push({name:"",path:""});
        },
        trans:function(event){
            var me=this;
            var li = event.path[1];
            var index = $(li).index();
            var img = event.path[0];
            if($(img).hasClass("")){
                return;
            }
            else{
                if(index-me.order>=0 && $("li img").eq(index-me.order).hasClass("")){
                    me.transClass(index-me.order ,index);
                }
                else if(index%me.order!==0 && index-1>=0 && $("li img").eq(index-1).hasClass("")){
                    me.transClass(index-1 ,index);
                }
                else if(index%me.order !== me.order-1 && index+1<me.photo && $("li img").eq(index+1).hasClass("")){
                    me.transClass(index+1 ,index);
                }
                else if(index+me.order<me.photo && $("li img").eq(index+me.order).hasClass("")){
                    me.transClass(index+me.order ,index);
                }
            }
        },
        transClass:function(balance , index){
            var me = this;
            me.items[balance].name = me.items[index].name;
            me.items[balance].path = me.items[index].path;
            me.items[index].name = "";
            me.items[index].path = "";
            me.win();
        },
        win:function(){
            var me=this;
            var rex = /\d$/;
            var count = 0;
            for(var i=1;i<me.photo;i++){
                var res = rex.exec(me.items[i-1].name);
                if(res && res[0] == i){
                    count++;
                }
                else{
                    return;
                }
            }
            if(count === me.photo-1 && !(me.items[me.photo-1].name) && !(me.items[me.photo-1].path)){
                me.items[me.photo-1].name =  "img"+me.photo;
                me.items[me.photo-1].path = "../images/"+me.order+"_"+me.photo+".jpg";
            }
        }
    }
});
myvue.init();