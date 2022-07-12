<script lang="ts" setup>
import IconCopy from '@/assets/images/roomDetails/copy.svg';
import IconEmail from '@/assets/images/roomDetails/email.svg';
import IconMessages from '@/assets/images/roomDetails/sms.svg';
import IconWhatsapp from '@/assets/images/roomDetails/whatsapp.svg';
import IconFacebook from '@/assets/images/roomDetails/facebook.svg';
import IconTwitter from '@/assets/images/roomDetails/twitter.svg';
import IconWechat from '@/assets/images/roomDetails/wechat.svg';
import IconClose from '@/assets/images/roomDetails/close.svg';
import { useRoomsStore } from '@/stores/rooms';
import { ClickOutside as vClickOutside } from 'element-plus';

const { t } = useI18n();
const roomsStore = useRoomsStore();
const roomDetails = computed(() => roomsStore.roomDetails);
</script>

<template>
  <div
    class="share-popup-container fixed z-100 flex inset-0 justify-center items-center">
    <div
      class="share-popup bg-white rounded-xl relative h-fit"
      v-click-outside="roomsStore.hideSharePopup">
      <!-- Close Button -->
      <div class="btn-close-container absolute top-6 left-6 leading-none">
        <el-button
          circle
          text
          class="btn-close -ml-2 -mt-2"
          @click="roomsStore.hideSharePopup">
          <icon-close />
        </el-button>
      </div>

      <!-- Content -->
      <div class="p-6">
        <section>
          <!-- Title -->
          <h2 class="title font-semibold mt-10">
            {{ t('rooms.share.title') }}
          </h2>

          <!-- Thumbnail -->
          <div class="flex items-center my-6">
            <el-image
              :src="roomDetails.imgs[0]"
              :alt="roomDetails.title"
              fit="cover"
              class="thumbnail rounded-lg shrink-0 mr-4"
              style="width: 64px; height: 64px" />
            <div class="text-base text-neutral-900">
              {{ roomDetails.title }}
            </div>
          </div>

          <!-- Social Media List -->
          <ul class="social-media-list flex flex-wrap -mx-2">
            <li class="social-media w-2/4 px-2 mb-4 cursor-pointer">
              <div
                class="w-full h-full flex border border-solid border-neutral-200 rounded-xl items-center">
                <div class="mx-5.5 rounded overflow-hidden">
                  <icon-copy />
                </div>
                <div class="font-semibold text-base">
                  {{ t('rooms.share.copy') }}
                </div>
              </div>
            </li>
            <li class="social-media w-2/4 px-2 mb-4 cursor-pointer">
              <div
                class="w-full h-full flex border border-solid border-neutral-200 rounded-xl items-center">
                <div class="mx-5.5 rounded overflow-hidden">
                  <icon-email />
                </div>
                <div class="font-semibold text-base">
                  {{ t('rooms.share.email') }}
                </div>
              </div>
            </li>
            <li class="social-media w-2/4 px-2 mb-4 cursor-pointer">
              <div
                class="w-full h-full flex border border-solid border-neutral-200 rounded-xl items-center">
                <div class="mx-5.5 rounded overflow-hidden">
                  <icon-messages />
                </div>
                <div class="font-semibold text-base">
                  {{ t('rooms.share.sms') }}
                </div>
              </div>
            </li>
            <li class="social-media w-2/4 px-2 mb-4 cursor-pointer">
              <div
                class="w-full h-full flex border border-solid border-neutral-200 rounded-xl items-center">
                <div class="mx-5.5 rounded overflow-hidden">
                  <icon-whatsapp />
                </div>
                <div class="font-semibold text-base">
                  {{ t('rooms.share.whatsapp') }}
                </div>
              </div>
            </li>
            <li class="social-media w-2/4 px-2 mb-4 cursor-pointer">
              <div
                class="w-full h-full flex border border-solid border-neutral-200 rounded-xl items-center">
                <div class="mx-5.5 rounded overflow-hidden">
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    style="display: block; height: 32px; width: 32px">
                    <defs>
                      <radialGradient
                        cx="19.25%"
                        cy="99.447%"
                        fx="19.25%"
                        fy="99.447%"
                        r="108.96%"
                        gradientTransform="scale(1 .99991)"
                        id="fbmessengera">
                        <stop stop-color="#09F" offset="0%"></stop>
                        <stop stop-color="#A033FF" offset="60.98%"></stop>
                        <stop stop-color="#FF5280" offset="93.48%"></stop>
                        <stop stop-color="#FF7061" offset="100%"></stop>
                      </radialGradient>
                    </defs>
                    <path fill="#FFF" d="M32 0v32H0V0z"></path>
                    <path
                      d="M16 4C9.241 4 4 8.953 4 15.64c0 3.498 1.434 6.522 3.768 8.61.195.174.315.42.321.684l.066 2.136a.96.96 0 0 0 1.347.849l2.382-1.05a.964.964 0 0 1 .642-.048c1.095.3 2.259.462 3.474.462 6.759 0 12-4.953 12-11.64S22.759 4 16 4z"
                      fill="url(#fbmessengera)"></path>
                    <path
                      d="M8.794 19.045l3.525-5.592a1.8 1.8 0 0 1 2.604-.48l2.805 2.103a.72.72 0 0 0 .867-.003l3.786-2.874c.504-.384 1.164.222.828.759l-3.528 5.589a1.8 1.8 0 0 1-2.604.48l-2.805-2.103a.72.72 0 0 0-.867.003l-3.786 2.874c-.504.384-1.164-.219-.825-.756z"
                      fill="#FFF"></path>
                  </svg>
                </div>
                <div class="font-semibold text-base">
                  {{ t('rooms.share.messenger') }}
                </div>
              </div>
            </li>
            <li class="social-media w-2/4 px-2 mb-4 cursor-pointer">
              <div
                class="w-full h-full flex border border-solid border-neutral-200 rounded-xl items-center">
                <div class="mx-5.5 rounded overflow-hidden">
                  <icon-facebook />
                </div>
                <div class="font-semibold text-base">
                  {{ t('rooms.share.facebook') }}
                </div>
              </div>
            </li>
            <li class="social-media w-2/4 px-2 mb-4 cursor-pointer">
              <div
                class="w-full h-full flex border border-solid border-neutral-200 rounded-xl items-center">
                <div class="mx-5.5 rounded overflow-hidden">
                  <icon-twitter />
                </div>
                <div class="font-semibold text-base">
                  {{ t('rooms.share.twitter') }}
                </div>
              </div>
            </li>
            <li class="social-media w-2/4 px-2 mb-4 cursor-pointer">
              <div
                class="w-full h-full flex border border-solid border-neutral-200 rounded-xl items-center">
                <div class="mx-5.5 rounded overflow-hidden">
                  <icon-wechat />
                </div>
                <div class="font-semibold text-base">
                  {{ t('rooms.share.wechat') }}
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media (min-width: 744px) {
  .share-popup {
    max-width: 568px;
  }
}

@media (min-width: 744px) and (min-height: 475px) {
  .share-popup-container {
    padding: 40px !important;
  }
}

.share-popup-container {
  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(34, 34, 34);
    animation: 0.4s ease 0s 1 both fadein;
    z-index: -1;
  }

  .share-popup {
    box-shadow: rgb(0 0 0 / 28%) 0px 8px 28px;
    animation: 0.4s ease 0s 1 both slideup;
  }

  .btn-close {
    color: #222;
  }

  .title {
    font-size: 26px;
    line-height: 30px;
    margin-bottom: 24px;
    color: #222;
  }

  .social-media {
    height: 76px;

    > div {
      &:hover {
        background-color: #f7f7f7;
      }
    }
  }
}

@keyframes fadein {
  from {
    opacity: 0;
  }

  to {
    opacity: 0.6;
  }
}

@keyframes slideup {
  from {
    opacity: 0;
    transform: translate(0px, 100%);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
</style>
