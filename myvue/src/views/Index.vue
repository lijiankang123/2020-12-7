<template>
  <div>
    <!-- 顶部头开始 -->
       <mt-header
    title="有问题，上知乎">
    <div slot="right" class="top">
      <router-link to="/login">注册</router-link>
      <router-link to="/register">登录</router-link>
    </div>
    <router-link to="/" slot="left">
    <mt-button icon="back"></mt-button>
    </router-link>
    </mt-header>
    <!-- 顶部头结束 -->

    <!-- 顶部导航栏开始 -->
    <mt-navbar v-model="active">
      <mt-tab-item  v-for="(item,index) of category" :key="index" :id="item.id.toString()">{{item.category_name}}</mt-tab-item>
    </mt-navbar>
    <!-- 顶部导航栏结束 -->

    <!-- 面板开始 -->
    <div class="main">
      <mt-tab-container>
      <mt-tab-container-item>
        <div class="my_container">
          <div class="articleItem" v-for="(item,index) of articles" :key="index">
            <router-link :to='`/article/${item.id}`'>
          <div class="articleItem-header">
          <p>{{item.subject}}</p>
        </div>
        <div class="rticleItem-wrapper">
          <div class="articleImg" v-if="item.image!=null">
          <img v-lazy="item.image" alt="">
          </div>
          <div class="articleDes">
            <p>{{item.description}}</p>
          </div>
        </div>
        </router-link>
        </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="item02">
        <p>222</p>
      </mt-tab-container-item>
      <mt-tab-container-item id="item03">
        <p>333</p>
      </mt-tab-container-item>
    </mt-tab-container>
    </div>
    <!-- 面板结束 -->

    <!-- 底部选项卡开始 -->
    <mt-tabbar v-model="selectedTed" fixed>
      <mt-tab-item id="index">首页
        <img src="../assets/images/index_enable.png" slot="icon" v-if="selectedTed=='index'">
        <img src="../assets/images/index_disable.png" slot="icon"    v-else>
      </mt-tab-item>
      <mt-tab-item id="me">我的
        <img src="../assets/images/me_enable.png" slot="icon" v-if="selectedTed=='me'">
        <img src="../assets/images/me_disable.png" slot="icon" v-else>
      </mt-tab-item>
    </mt-tabbar>
    <!-- 底部选项卡结束 -->
  </div>  
</template>

<style scoped>
.my_container{
  margin-bottom: 55px;
}
  .top>a{
    margin-left: 5px;
    color: aliceblue;
  }
  .articleItem { 
  padding: 10px 0;
  margin: 0 10px;
  border-bottom: 1px solid #999;
  /* margin-bottom: 55px; */
} 
.articleItem-header {
  font-weight: 600;
  font-size: 17px;
  color: #1a1a1a;
  line-height: 22px;
  text-align: left;
}
.articleItem-wrapper {
  display: flex;
  align-items: center;
  padding-top: 10px;
  width: 100%;
}
.articleImg {
  margin-right: 15px;
}
.articleImg img {
  width: 112px;
  height: 74px;
  border-radius: 5px;
}
.articleDes {
  height: 65px;
  font-size: 15px;
  overflow: hidden;
  font-weight: 400;
  text-overflow: ellipsis;
  line-height: 21px;
  letter-spacing: normal;
  color: #444;
}
.rticleItem-wrapper{
  display: flex;
}
</style>

<script>
export default {
  data(){
    return{
      active:"1",
      selected:"item01",
      selectedTed:"index",
      category:[],
      articles:[],
    }
  },
  watch:{
    active(val){
      this.articles = [];
     this.axios.get("/articles",{params:{
       id:val
     }}).then(res=>{
       let articles = res.data.results;
      //  console.log(articles);
       articles.forEach(article=>{
         if(article.image!=null){
           article.image = require('../assets/images/articles/' + article.image)
         }
         this.articles.push(article);
       })
     })
    },
    selectedTed(val){
      if(val=="index"){
        this.$router.push("/")
      }else if(val=="me"){
        this.$router.push("/login")
      }
    }
  },
  // 获取文章分类接口
  mounted(){
    this.axios.get("/category").then(res=>{
      // console.log(res.data.results);
      this.category = res.data.results;
    });
    this.axios.get("/articles",{params:{id:this.active}}).then(res=>{
      console.log(res.data);
      let articles = res.data.results;
      articles.forEach(article => {
        if(article.image!=null){ 
          article.image = require('../assets/images/articles/' + article.image);
        }
        this.articles.push(article);
      });
    })
  }
}
</script>
