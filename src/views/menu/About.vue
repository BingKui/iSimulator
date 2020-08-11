<template>
    <HalfModal
        :haveLogo="false"
        title="关于"
        :visible.sync="visible"
        :appendToBody="true"
        customClass="v-about"
        size="550px"
        @halfClosed="drawerClosed"
    >
        <div class="about-content">
            <img class="logo" :src="logoSrc" alt="iSimulator">
            <div class="name">{{pkg.name}}</div>
            <div class="version">Version {{pkg.version}}</div>
            <div class="desc">{{pkg.description}}</div>
        </div>
    </HalfModal>
</template>

<script>
import HalfModal from '@components/HalfModal';
import { LOGO } from '@constants/assets';
const PKG = require('../../../package.json');
export default {
    name: 'About', // 关于
    components: {
        HalfModal,
    },
    data() {
        return {
            visible: false,
            logoSrc: LOGO,
            pkg: PKG,
        };
    },
    methods: {
        show() {
            this.visible = true;
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
.v-about {
    .about-content {
        height: calc(@half-height - @half-header-height);
        width: 100%;
        .flex-column-center();
        .logo {
            width: 100px;
            height: 100px;
        }
        .name {
            font-size: 22px;
            font-weight: bold;
            .m-v(@gap * 2);
        }
        .version {
            font-weight: bold;
            font-size: @font-size;
        }
        .desc {
            color: @tip-color;
            .m-t(@gap);
        }
    }
}
</style>
