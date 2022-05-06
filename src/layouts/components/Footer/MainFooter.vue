<script setup lang="ts">
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const footerMenu = reactive([
  {
    title: 'footer.menu.about',
    submenu: [
      {
        name: '工作机会',
        link: 'https://www.airbnb.cn/careers'
      },
      {
        name: '爱彼迎新闻',
        link: 'https://www.airbnb.cn/press/news'
      },
      {
        name: '政策',
        link: 'https://www.airbnb.cn/policies'
      },
      {
        name: '无障碍设施',
        link: 'https://www.airbnb.cn/accessibility'
      }
    ]
  },
  {
    title: 'footer.menu.discover',
    submenu: [
      {
        name: '信任与安全',
        link: 'https://www.airbnb.cn/trust'
      },
      {
        name: '邀请好友',
        link: 'https://www.airbnb.cn/invite?r=6'
      },
      {
        name: '商务差旅',
        link: 'https://www.airbnb.cn/work?s=footer'
      },
      {
        name: '爱彼迎杂志',
        link: 'https://airbnbmag.com/'
      },
      {
        name: 'Airbnb.org',
        link: 'https://www.airbnb.org/?locale=zh'
      }
    ]
  },
  {
    title: 'footer.menu.hosting',
    submenu: [
      {
        name: '为什么要出租?',
        link: 'https://www.airbnb.cn/host/homes?from_footer=1'
      },
      {
        name: '待客之道',
        link: 'https://www.airbnb.cn/hospitality'
      },
      {
        name: '房东义务',
        link: 'https://www.airbnb.cn/help/responsible-hosting'
      },
      {
        name: '开展体验',
        link: 'https://www.airbnb.cn/host/experiences?from_footer=1'
      },
      {
        name: '资源中心',
        link: 'https://www.airbnb.cn/resources?traffic_source=footer'
      }
    ]
  },
  {
    title: 'footer.menu.support',
    submenu: [
      {
        name: '帮助',
        link: 'https://www.airbnb.cn/help?from=footer'
      },
      {
        name: '邻里支持',
        link: 'https://www.airbnb.cn/neighbors'
      }
    ]
  }
]);
</script>

<template>
  <el-footer
    class="w-full bg-white text-primary-gray p-0 border-t border-neutral-100">
    <div class="content px-6 py-12">
      <!-- Menu -->
      <el-row>
        <el-col :span="6" v-for="menuItem in footerMenu" :key="menuItem.title">
          <!-- Title -->
          <h4 class="text-sm text-primary-gray font-extrabold">
            {{ t(menuItem.title) }}
          </h4>

          <!-- Submenus -->
          <ul class="mt-4">
            <li
              v-for="submenuItem in menuItem.submenu"
              :key="submenuItem.name"
              class="mb-1">
              <a
                class="text-sm text-muted"
                :href="submenuItem.link"
                target="_blank">
                {{ submenuItem.name }}
              </a>
            </li>
          </ul>
        </el-col>
      </el-row>

      <!-- Copyright -->
      <div class="mt-4 pt-4 border-t border-neutral-100">
        <div class="copyright">
          <p></p>
          <div>
            <p class="inline-block">© 2022 Aircnc, Inc. All rights reserved.</p>
            <p class="inline-block ml-2">
              条款 · 隐私政策 · 网站地图 · 全国旅游投诉渠道 12301
            </p>
          </div>
        </div>

        <div class="social-media">
          <span><a href=""></a></span>
          <span><a href=""></a></span>
        </div>
      </div>
    </div>
  </el-footer>
</template>

<style lang="scss" scoped>
@import '../../../assets/scss/abstracts/mixins.scss';

.el-footer {
  .content {
    @include main-wrapper;
  }
}
</style>
