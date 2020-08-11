<template>
    <HalfModal
        :haveLogo="false"
        title="二维码"
        :visible.sync="visible"
        :appendToBody="true"
        customClass="v-url-qrcode"
        @halfClosed="drawerClosed"
    >
        <div class="qrcode-content">
            <canvas id="urlqrcode"></canvas>
        </div>
    </HalfModal>
</template>

<script>
import HalfModal from '@components/HalfModal';
import { createQrCode } from '@common/utils';
export default {
    name: 'UrlQrcode', // url转换为二维码
    components: {
        HalfModal,
    },
    data() {
        return {
            visible: false,
        };
    },
    methods: {
        show() {
            this.visible = true;
            setTimeout(() => {
                const el = document.querySelector('#urlqrcode');
                console.log(el);
                createQrCode(el, window.location.href);
            }, 300);
        },
        close() {
            this.visible = false;
        },
        drawerClosed() {
            this.$emit('closeMenu');
        },
    },
};
</script>

<style lang="less">
.v-url-qrcode {
    .qrcode-content {
        height: calc(@half-height - @half-header-height);
        width: 100%;
        .flex-row-center();
    }
}
</style>
