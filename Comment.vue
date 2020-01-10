<template>
  <div class="comments">     //评论
        <myheader title="精彩评论">
            <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
        </myheader>
        <div class="lists">
            <div class="item" v-for="comment in commentList" :key="comment.id">
                <div class="head">
                    <img :src="comment.user.head_img" alt="">
                <div>
                <p>{{comment.user.nickname}}</p>
                <span>2小时前</span>
                </div>
           
            <span @click="sendComment(comment)">回复</span>
        </div>
        <!-- 判断是否需上一级得评论结构  //content : 主要内容-->   
        <commentItem v-if="comment.parent" :parent="comment.parent"></commentItem>
        <div class="text">{{comment.content}}</div>
        </div>
         </div>
          <!-- 底部评论块 -->
          <hmCommentFooter :post="article" @refresh="refresh" :obj="replyObj" @reset="replyObj=null">

          </hmCommentFooter>
  </div>
</template>

<script>
import myheader from '@/components/hmheader.vue';
import commentItem from '@/components/hmCommentItem.vue';
import { getCommentList, getArticleById } from "@/apis/article.js";
import hmCommentFooter from "@/components/hmCommentFooter.vue";
export default {
          components :{
              myheader,
              commentItem,
              hmCommentFooter
          },
           data () {
               return {
                //    这个对象就是当前需要回复得评论对象
                replyObj : null,
                commentList : [],
                article :{}
               };
           },
           async mounted () {
            //    获取当前文章得评论数据
            this.init()
            //   获取当前文章数据
             let res2 = await getArticleById(this.$route.params.id);
             this.article = res2.data.data;
           },
           methods :{
            //    数据初始化
            async init (){
                let res = await getCommentList(this.$route.params.id,{
                    pageSize : 40,
                    pageIndex : 1
                });
                console.log(res);
                this.commentList = 
                res.data.data.length > 0 ? res.data.data : this.commentList;
                this.commentList =this.commentList.map(value => {
                     value.user.head_img = 'http://127.0.0.1:3000'+ value.user.head_img;
                     return value;
                });
            },
            // 刷新
            refresh() {
                this.init()
                // 让页面滚动到顶部
                window.scrollTo(0,0)
            },
            // 回复评论
            sendComment(comment){
                this.replyObj = comment
            }
           }
}
</script>
 
<style lang='less' scoped>
.comments {
  padding-bottom: 50px;
}
.lists {
  border-top: 5px solid #ddd;
  padding: 0 15px;
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
}
</style>

</style>