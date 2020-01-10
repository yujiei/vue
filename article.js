import axios from '@/utils/myaxios.js'

//1。获取栏目的新闻数据
export const getPostList =(params)=>{
    return axios ({
        url : '/post',
        params
    })
}

// 2.根据文章的id获取文章详情
export const getArticleById = (id) =>{
    return axios ({
        url : `/post/${id}`
    })
}

// 3.点赞和取消点赞
export const likeArticle = (id) =>{
    return axios ({
        url : `/post_like/${id}`
    })
}