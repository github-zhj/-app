<template>
    <v-touch v-on:swiperight="swiperright" class="wrapper">
        <div class="video-play">
            <div class="play" :style="`background-image:url(${queryData.VideoImg})`"> </div>
            <video ref="video" :src="queryData.VideoUrl" controls :poster="queryData.VideoImg"></video>
            <div class="video-content">
                <h2 class="video-title">{{queryData.VideoTitle}}</h2>
                <i>#{{queryData.VideoCategory}}</i>
                <i>/</i>
                <i>{{(queryData.VideoDuration/60).toFixed(2).replace('.',":")}}</i><br />
                <span class="video-introduce">{{queryData.VideoDescriptionEditor}}</span>
            </div>
            <div class="video-icon">
                <span @click="liked=!liked" v-if="liked" class="like"><img src="../../public/img/like2.png"></span>
                <span @click="liked=!liked" v-if="!liked" class="like"><img src="../../public/img/like1.png"></span>
                <i>{{queryData.VideoCollectionCount}}</i>

                <div class="video-favorite">
                    <span @click="isFavorite" v-if="!favorite" class="favorite"><img
                            src="../../public/img/favorite2.png"></span>
                    <span @click="isFavorite" v-if="favorite" class="favorite"><img
                            src="../../public/img/favorite1.png"></span>
                </div>

            </div>
            <div class="video-author-content">
                <div class="video-icon"><img :src="queryData.VideoIcon"></div>
                <div class="video-author">
                    <div class="video-author-name">{{queryData.VideoName}}</div>
                    <div class="video-author-description">{{queryData.VideoDescription}}</div>
                </div>
                <span>+关注</span>
            </div>
            <div class="video-title">
                <h2>热门评论 ></h2>
                <div class="video-remark" v-for="(item,index) in commentAll" :key="index">
                    <div class="video-remark-img"><img :src="item.imgleft" alt=""></div>
                    <div class="video-remark-user">{{item.user}}</div>
                    <div class="video-remark-content">{{item.content}}</div>
                    <div class="video-remakr-good"><span>{{item.num}}</span><img @click="isGood(index)"
                            :src="item.good"></div>
                </div>
            </div>
        </div>
    </v-touch>
</template>

<script>
    import {
        Title
    } from '../assets/https/apis'
    export default {
        name: 'Play',
        data() {
            return {
                queryData: {
                    VideoIcon: '',
                    VideoName: '',
                    VideoDescription: '',
                    VideoCollectionCount: '',
                    VideoDuration: '',
                    VideoImg: '',
                    BGImg:'',
                    VideoUrl: '',
                    VideoDescriptionEditor: '',
                    VideoCategory: '',
                    VideoTitle: ''
                },
                goodBool: false,
                id: '',
                liked: false,
                favorite: false,
                resData: [],
                resBanner: [],
                commentAll: [{
                        imgleft: require("../assets/image/user.png"),
                        user: "匿名用户",
                        content: "作品很感人，十分的好看！！",
                        replay: "回复",
                        num: 666,
                        good: require("../assets/image/dianzan.png"),
                    },
                    {
                        imgleft: require("../assets/image/user.png"),
                        user: "不知名网友",
                        content: "这部作品强力推荐！真的很好看",
                        replay: "回复",
                        num: 666,
                        good: require("../assets/image/dianzan.png"),
                    },
                    {
                        imgleft: require("../assets/image/user.png"),
                        user: "作者",
                        content: "感谢各位的支持，我以后会发布类似作品",
                        replay: "回复",
                        num: 666,
                        good: require("../assets/image/dianzan.png"),
                    },
                ],
                save: []
            }
        },

        created() {
            this.tags = this.$route.query.tags
            this.queryData.VideoIcon = this.$route.query.icon
            this.queryData.VideoName = this.$route.query.name
            this.queryData.VideoDescription = this.$route.query.description
            this.queryData.VideoCollectionCount = this.$route.query.collectionCount
            this.queryData.VideoDuration = this.$route.query.duration
            this.queryData.VideoImg = this.$route.query.Detailimg
            this.queryData.BGImg = this.$route.query.Blurredimg
            this.queryData.VideoUrl = this.$route.query.url
            this.queryData.VideoDescriptionEditor = this.$route.query.descriptionEditor
            this.queryData.VideoCategory = this.$route.query.category
            this.queryData.VideoTitle = this.$route.query.title
            if (localStorage.getItem("favorite")) {
                this.save = JSON.parse(localStorage.getItem("favorite"))
            }
            let favorite = JSON.parse(localStorage.getItem('favorite'))
            for (let i = 0; i < favorite.length; i++) {
                if (this.queryData.VideoUrl === favorite[i].VideoUrl) {
                    this.favorite = true
                }
            }
        },
        methods: {
            swiperright() {
                this.$router.go(-1);

            },
            isGood(index) {
                if (!this.goodBool) {
                    this.commentAll[index].num += 1
                } else {
                    this.commentAll[index].num -= 1
                }
                this.goodBool = !this.goodBool
            },
            isFavorite() {
                this.favorite = !this.favorite
                if (this.favorite) {
                    for (let i = 0; i < this.save.length; i++) {
                        if (this.save[i].VideoUrl == this.queryData.VideoUrl) {
                            this.save.splice(i, 1)
                        }
                    }

                    this.save.push({
                        VideoCategory: this.queryData.VideoCategory,
                        VideoCollectionCount: this.queryData.VideoCollectionCount,
                        VideoDescription: this.queryData.VideoDescription,
                        VideoDescriptionEditor: this.queryData.VideoDescriptionEditor,
                        VideoDuration: this.queryData.VideoDuration,
                        VideoIcon: this.queryData.VideoIcon,
                        VideoImg: this.queryData.VideoImg,
                        VideoName: this.queryData.VideoName,
                        VideoTitle: this.queryData.VideoTitle,
                        VideoUrl: this.queryData.VideoUrl,
                    });
                    localStorage.setItem("favorite", JSON.stringify(this.save))
                } else {
                    for (let i = 0; i < this.save.length; i++) {
                        if (this.queryData.VideoUrl === this.save[i].VideoUrl) {
                            this.save.splice(i, 1);
                            localStorage.setItem("favorite", JSON.stringify(this.save))
                        }
                    }
                   
                }
            }
        },
    }
</script>

<style lang="less" scoped>
    * {
        margin: 0;
        padding: 0;
        color: #ffffff;
        font-weight: normal;
    }

    .video-play {

        i {
            margin-left: 4px;

        }

        .play {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            opacity: 0.8;
            filter: blur(20px);
            z-index: -999;
        }

        video {
            width: 100%;
        }

        .video-content {
            margin-top: 10px;
            padding: 14px;


            .video-title {
                font-size: 17px;
            }

            .video-introduce {
                display: inline-block;
                font-weight: lighter;
                font-size: 12px;
                margin-top: 10px;
            }
        }

        .video-icon {
            width: 100%;
            margin-top: 20px;
            padding-left: 20px;
            padding-bottom: 20px;
            position: relative;
            border-bottom: 1px solid #e3e3e3;

            span {
                width: 20px;
                height: 20px;
                display: inline-block;

                img {
                    width: 100%;
                    height: 100%;
                }

            }

            i {
                font-size: 12px;
                position: absolute;
                top: 4px;
                left: 44px;
            }

            .video-favorite {
                position: absolute;
                top: 0;
                left: 100px;
            }
        }

        .video-author-content {
            position: relative;
            top: -10px;
            padding-bottom: 5px;
            border-bottom: 1px solid #e3e3e3;

            .video-icon {
                padding: 0;
                margin-left: 10px;
                width: 40px;
                height: 40px;
                display: inline-block;
                background-size: 40px 40px;
                border-radius: 50%;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .video-author {
                position: absolute;
                top: 24px;
                left: 60px;

                .video-author-name {
                    font-weight: bold;
                }

                .video-author-description {
                    margin-top: 2px;
                    font-size: 10px;
                    font-weight: lighter;
                }
            }

            span {
                width: 50px;
                text-align: center;
                position: absolute;
                right: 14px;
                top: 32px;
                display: inline-block;
                border: 1px solid #000;
                border-radius: 2px;

            }
        }

        .video-title {
            font-weight: bolder;
            padding-left: 8px;

            h2 {
                font-weight: bolder;
            }
        }

        .video-remark {
            position: relative;
            margin-top: 10px;

            .video-remark-img {
                width: 20px;
                height: 20px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .video-remark-user {
                position: absolute;
                top: -4px;
                left: 34px;
                font-size: 12px;
                font-weight: bold;
            }

            .video-remark-content {
                position: relative;
                left: 34px;
            }

            .video-remakr-good {
                width: 20px;
                height: 20px;
                position: absolute;
                top: 0;
                right: 10px;

                span {
                    position: absolute;
                    top: 6px;
                    right: 28px;
                }

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>