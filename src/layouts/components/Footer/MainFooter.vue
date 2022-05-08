<script setup lang="ts">
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const footerMenu = reactive([
  {
    title: 'footer.menu.about',
    submenu: [
      {
        name: 'footer.submenu.careers',
        link: 'https://www.airbnb.cn/careers'
      },
      {
        name: 'footer.submenu.news',
        link: 'https://www.airbnb.cn/press/news'
      },
      {
        name: 'footer.submenu.policy',
        link: 'https://www.airbnb.cn/policies'
      },
      {
        name: 'footer.submenu.accessibility',
        link: 'https://www.airbnb.cn/accessibility'
      }
    ]
  },
  {
    title: 'footer.menu.discover',
    submenu: [
      {
        name: 'footer.submenu.trustAndSafe',
        link: 'https://www.airbnb.cn/trust'
      },
      {
        name: 'footer.submenu.invite',
        link: 'https://www.airbnb.cn/invite?r=6'
      },
      {
        name: 'footer.submenu.evection',
        link: 'https://www.airbnb.cn/work?s=footer'
      },
      {
        name: 'footer.submenu.magzine',
        link: 'https://airbnbmag.com/'
      },
      {
        name: 'footer.submenu.airbnborg',
        link: 'https://www.airbnb.org/?locale=zh'
      }
    ]
  },
  {
    title: 'footer.menu.hosting',
    submenu: [
      {
        name: 'footer.submenu.tryHosting',
        link: 'https://www.airbnb.cn/host/homes?from_footer=1'
      },
      {
        name: 'footer.submenu.hospitality',
        link: 'https://www.airbnb.cn/hospitality'
      },
      {
        name: 'footer.submenu.responsibility',
        link: 'https://www.airbnb.cn/help/responsible-hosting'
      },
      {
        name: 'footer.submenu.experiences',
        link: 'https://www.airbnb.cn/host/experiences?from_footer=1'
      },
      {
        name: 'footer.submenu.resources',
        link: 'https://www.airbnb.cn/resources?traffic_source=footer'
      }
    ]
  },
  {
    title: 'footer.menu.support',
    submenu: [
      {
        name: 'footer.submenu.help',
        link: 'https://www.airbnb.cn/help?from=footer'
      },
      {
        name: 'footer.submenu.neighbors',
        link: 'https://www.airbnb.cn/neighbors'
      }
    ]
  }
]);
</script>

<template>
  <el-footer
    class="w-full h-fit bg-white text-primary-gray p-0 border-t border-neutral-150">
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
              :key="t(submenuItem.name)"
              class="mb-1">
              <a
                class="text-sm text-muted font-semibold no-underline hover:underline"
                :href="submenuItem.link"
                target="_blank">
                {{ t(submenuItem.name) }}
              </a>
            </li>
          </ul>
        </el-col>
      </el-row>

      <!-- Copyright -->
      <div class="mt-4 pt-4 border-t border-neutral-150">
        <div class="copyright text-sm text-muted text-center font-semibold">
          <p class="inline-block">© 2022 Aircnc, Inc. All rights reserved.</p>
          <p class="inline-block ml-2">
            <a
              href="https://www.airbnb.cn/terms"
              target="_blank"
              class="no-underline hover:underline">
              条款
            </a>
            <span> · </span>
            <a
              href="https://www.airbnb.cn/terms/privacy_policy"
              target="_blank"
              class="no-underline hover:underline">
              隐私政策
            </a>
            <span> · </span>
            <a
              href="https://www.airbnb.cn/sitemaps/v2"
              target="_blank"
              class="no-underline hover:underline">
              网站地图
            </a>
            <span> · </span>
            <span>全国旅游投诉渠道 12301</span>
          </p>
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
