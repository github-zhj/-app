<template>
    <div class="home">
        <van-tabs v-model="activeName">
            <van-tab to="/find" title="发现" name="a"></van-tab>
            <van-tab to="/home" title="推荐" name="b"></van-tab>
            <van-tab to="/daily" title="日报" name="c"></van-tab>
        </van-tabs>
        <div class="home-connet">
            <h2>每日开眼精选</h2>
            <div class="wrapper" v-for="(item,index) in resData" :key="index">
                <div class="home-img"
                    @click="goPlay(item.tags,item.author.icon,item.author.name,item.author.description,item.consumption.collectionCount,item.duration,item.cover.detail,item.playUrl,item.descriptionEditor,item.category,item.title)">
                    <img :src="item.cover.detail" v-lazy="item.cover.detail">
                    <i class="home-time">{{(item.duration/60).toFixed(2).replace('.',":")}}</i>
                </div>
                <div class="home-icon"><img :src="item.author.icon" v-lazy="item.author.icon"></div>
                <span class="home-title">{{item.title}}</span>
                <i class="home-tag">{{item.author.name}}</i>
                <i class="home-tag">#{{item.category}}</i>

                <div v-if="index===1" class="home-banner">
                    <van-swipe :autoplay="3000" indicator-color="white">
                        <van-swipe-item v-for="(item,index) in resBanner" :key="index">
                            <img :src="item.bgPicture" alt="">
                        </van-swipe-item>
                    </van-swipe>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
    import {
        Title
    } from '../assets/https/apis'
    export default {
        data() {
            return {
                resData: [],
                resBanner: [],
                activeName: 'b',
            }

        },
        created() {
            this.onLoad()
        },

        methods: {
            onLoad() {
                Title().then((res) => {
                    for (let i = 0; i < res.itemList.length; i++) {

                        if (res.itemList[i].type == "video") {
                            this.resData.push(res.itemList[i].data);
                        }
                    }
                    for (let j = 0; j < this.resData.length; j++) {
                        this.resBanner = this.resData[j].tags
                    }
                })
            },

            goPlay(tags, icon, name, description, collectionCount, duration, img, url, descriptionEditor, category,
                title) {

                this.$router.push({
                    path: '/play',
                    query: {
                        icon,
                        name,
                        description,
                        collectionCount,
                        duration,
                        img,
                        url,
                        descriptionEditor,
                        category,
                        title
                    }
                })
            }
        },
    }
</script>
<style lang="less" scoped>
    .home-connet {
        width: 94%;
        margin-left: 3%;
        position: relative;

        .wrapper {
            border-bottom: 1px solid #e3e3e3;
            margin-bottom: 5px;
        }

        h2 {
            font-weight: bold;
        }

        .home-img {
            position: relative;

            img {
                width: 100%;
            }

            .home-time {
                width: 24px;
                display: inline-block;
                text-align: center;
                border-radius: 2px;
                background-color: #000000;
                opacity: .7;
                color: #fff;
                position: absolute;
                right: 8px;
                bottom: 8px;
            }
        }

        .home-icon {
            width: 30px;
            height: 30px;
            display: inline-block;
            background-size: 40px 40px;
            border-radius: 50%;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                background-size: cover;
            }
        }

        .home-title {
            font-weight: bold;
            font-size: 12px;
            position: absolute;
            left: 40px;
        }

        .home-tag {
            margin-left: 10px;
        }

        .home-banner {
            img {
                background-size: cover;
                width: 100%;
                height: auto;
            }
        }

    }
</style>