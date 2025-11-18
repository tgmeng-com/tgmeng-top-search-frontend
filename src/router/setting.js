import SettingLayout from "@/components/settings/SettingLayout.vue";
import SettingList from "@/components/settings/SettingList.vue";
import BasicSettings from "@/components/settings/BasicSettings.vue";
import AboutSettings from "@/components/settings/AboutSettings.vue";
import DonationSettings from "@/components/settings/DonationSettings.vue";
import CommunitySettings from "@/components/settings/CommunitySettings.vue";

export default [
    {
        path: "/setting",
        component: SettingLayout,
        children: [
            {
                path: "",
                // 不再 redirect
                component: SettingList, // 移动端显示列表
                meta: { mobileOnly: true },
            },
            { path: "about", component: AboutSettings },
            { path: "basic", component: BasicSettings },
            { path: "donation", component: DonationSettings },
            { path: "community", component: CommunitySettings },
        ],
    },
];
