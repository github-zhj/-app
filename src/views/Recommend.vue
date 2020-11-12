<template>
    <div>
        <van-tabbar v-model="active">
            <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item to="/search" icon="search">搜索</van-tabbar-item>
            <van-tabbar-item to="/mine" icon="friends-o">我的</van-tabbar-item>
        </van-tabbar>
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'Recommend',
        data() {
            return {
                active: 0,
            };
        }
    }
</script>