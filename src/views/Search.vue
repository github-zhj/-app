<template>
    <div>
        <form action="/">
            <van-search v-model="value" show-action placeholder="搜索视频、作者、用户及标签" @search="onSearch(value)" @cancel="onCancel" />
        </form>
    </div>
</template>

<script>
    export default {
        name: 'Search',
        data() {
            return {
                value: ''
            }
        },
        methods: {
            onSearch(val) {
                this.axios({
                    method: 'GET',
                    url: `http://api.kele8.cn/agent/http://baobab.kaiyanapp.com/api/v3/search?query=${val}"udid=d8e9892b3b214de98f2f9ef7af0ea34d52491958&vc=6030101&vn=6.3.10&size=1080X2294&deviceModel=HD1900&first_channel=oppo&last_channel=oppo&system_version_code=29"`
                }).then(res => {
                    console.log(res)
                })
                this.$toast(val);
            },
            onCancel() {
                this.$toast('取消');
            },
        },
        // watch: {
        //     value(afther, old) {
        //         if (afther) {
        //             console.log("----->old",old)
        //         } else if (!afther) {
        //             cons.log("----->afther",afther)
        //         }
        //     },

        // },
    }
</script>