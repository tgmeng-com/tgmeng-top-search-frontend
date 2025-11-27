// ⚡ 所有 setting 相关组件都改成懒加载
// webpackChunkName 相同的会打包到同一个文件里

const SettingLayout = () => import(/* webpackChunkName: "settings" */"@/components/settings/SettingLayout.vue")

const SettingList = () => import(/* webpackChunkName: "settings" */"@/components/settings/SettingList.vue")

const BasicSettings = () => import(/* webpackChunkName: "settings" */"@/components/settings/BasicSettings.vue")

const AboutSettings = () => import(/* webpackChunkName: "settings" */"@/components/settings/AboutSettings.vue")

const DonationSettings = () => import(/* webpackChunkName: "settings" */"@/components/settings/DonationSettings.vue")

const CommunitySettings = () => import(/* webpackChunkName: "settings" */"@/components/settings/CommunitySettings.vue")


export default [
    {
        path: "/setting",
        component: SettingLayout,
        children: [
            {
                path: "",
                // 不再 redirect
                component: SettingList, // 移动端显示列表
                meta: {mobileOnly: true},
            },
            {path: "about", component: AboutSettings},
            {path: "basic", component: BasicSettings},
            {path: "donation", component: DonationSettings},
            {path: "community", component: CommunitySettings},
        ],
    },
];
