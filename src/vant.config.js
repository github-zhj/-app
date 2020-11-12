import { Form,Field,Button,Popup,Search, Toast , Tab, Tabs, Swipe, SwipeItem, Tabbar, TabbarItem } from 'vant'

const vants = [Form,Field,Button,Popup,Search, Toast , Tab, Tabs, Swipe, SwipeItem, Tabbar, TabbarItem]

export default {
    /**
     * Vue.use 方法会自动调用install函数
     * Install Vant Component plugin
     * @param Vue
     */
    install(Vue) {
        vants.forEach(Component => {
            Vue.use(Component)
        })
    }

}