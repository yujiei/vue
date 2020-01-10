<template>
   <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span :class="{active:article.has_follow}"
       @click="followThisUser">{{article.has_follow?'已关注':'关注'}}</span>
    </div>
    <div class="detail">
      <div class="title">{{article.title}}</div>
      <div class="desc">
        <!-- 访问一个不存在的变量，则报错：** is not defined
        访问一个对象不存在的属性，则返回undefined -->
        <span>{{article.user.nickname}}</span> &nbsp;&nbsp;
        <span>2019-9-9</span>
      </div>
      <div class="content" v-html='article.content' v-if='article.type===1'></div>
      <!-- controls:是否显示控制面板，默认不显示
      src:路径
      controls:是否显示控制面板
      autoplay:自动播放，在chrome是有问题，不会响应
      loop:是否循环播放
      poster:首帧画面 -->
      <video :src="article.content" v-if='article.type===2' controls></video>
      <div class="opt">
        <span class="like" :class="{active:article.has_like}" @click="likeThisArticle">
          <van-icon name="good-job-o" />{{article.like_length}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img src="http://127.0.0.1:3000/uploads/image/default.png" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
  </div>
</template>

<script>
import {getArticleById,likeArticle} from '@/apis/article.js'
import {followUser,unfollowUser} from '@/apis/user.js'
   
export default { 
    data () {
        return {
            article :{
                user : {}
            }
        }
    },
    async mounted () {
        // 根据id获取文章的详情，实现文章详情的动态渲染
        let res = await getArticleById(this.$route.params.id)
        console.log(res)
        this.article =res.data.data
    },
    methods:{
        // 关注和取消关注
        async followThisUser(){
            let res
            // 满足下面的条件说明你已经关注过了，这次单击就是取消
            if(this.article.has_follow){
                res = await unfollowUser(this.article.user.id)
            }else {
                // 还没有关注，此次单击就是关注该用户
                res = await followUser(this.article.user.id)
            }
            // 刷新
            this.article.has_follow =!this.article.has_follow
            this.$toast.success(res.data.message)
        },
        // 文章点赞
        async likeThisArticle () {
            let res = await likeArticle(this.article.id)
            console.log(res)
            if(res.data.message === '点赞成功'){
                ++this.article.like_length
            }else{
                --this.article.like_length
            }
            this.article.has_like =! this.article.has_like;
            this.$toast.success(res.data.message)
        }
    }
}
</script>

<style lang='less' scoped>
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    text-align: center;
    border:1px solid #ccc;
    border-radius: 15px;
    font-size: 13px;
    &.active{
      color:#fff;
      background-color: #f00;
    }
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
    /deep/.photo {
      img {
        width: 100%;
        display: block;
      }
    }
  }
  video{
    width: 100%;
  }
}
.opt {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .like{
    &.active{
      color:red;
    }
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>


