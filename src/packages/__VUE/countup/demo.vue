<template>
  <div class="demo">
    <h2>{{ translate('basic') }}</h2>
    <div class="show-demo">
      <nut-countup :init-num="0" :end-num="200"></nut-countup>
      <nut-countup :init-num="150.0" :end-num="0.0" :speed="6.18" :to-fixed="2"></nut-countup>
      <nut-countup :init-num="500.0" :end-num="0.0" :speed="50" :to-fixed="2"></nut-countup>
    </div>
    <!-- <h2>{{ translate('title') }}</h2>
    <div class="show-demo">
      <nut-countup :scrolling="true" :init-num="18.618" :during="600"></nut-countup>
    </div> -->
    <h2>{{ translate('title1') }}</h2>
    <div class="show-demo">
      <nut-countup
        :custom-change-num="customNumber"
        :custom-bg-img="bgImage"
        :custom-spac-num="11"
        :num-width="33"
        :num-height="47"
        :during="8000"
      >
      </nut-countup>
    </div>
    <h2>{{ translate('title2') }}</h2>
    <div class="show-demo">
      <nut-countup
        ref="countupMachine"
        type="machine"
        :machine-num="machineNum"
        :machine-prize-num="5"
        :machine-prize-level="prizeLevel"
        :machine-turn-more="5"
        :custom-bg-img="bgImage2"
        :num-width="100"
        :num-height="100"
        :during="3000"
        @scroll-end="scrollAniEnd"
      >
      </nut-countup>
      <div class="btnBtn">
        <nut-button type="danger" @click="startRole" :disabled="startFlag">{{ translate('btn1') }}</nut-button>
        <nut-button type="danger" @click="startRole2" :disabled="startFlag">{{ translate('btn2') }}</nut-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { createComponent } from '@/packages/utils/create';
import { reactive, toRefs, onMounted } from 'vue';
const { createDemo, translate } = createComponent('countup');
import { useTranslate } from '@/sites/assets/util/useTranslate';
const initTranslate = () =>
  useTranslate({
    'zh-CN': {
      basic: '基础用法',
      title: '数字滚动',
      title1: '自定义滚动图片展示',
      title2: '抽奖（模拟滚动抽奖）',
      btn1: '中奖',
      btn2: '不中奖'
    },
    'en-US': {
      basic: 'Basic Usage',
      title: 'Digital scrolling',
      title1: 'Custom scrolling picture display',
      title2: 'Lottery (simulated rolling lottery)',
      btn1: 'win the lottery',
      btn2: 'Not winning'
    }
  });
export default createDemo({
  props: {},
  setup() {
    initTranslate();
    const data = reactive({
      customNumber: 618,
      bgImage:
        'https://img10.360buyimg.com/imagetools/jfs/t1/133024/3/2251/2646/5ee7549aE8dc02d7e/de6901b6c72db396.png',
      startFlag: false,
      startFlag2: false,
      machineNum: 3,
      bgImage2:
        'https://img10.360buyimg.com/imagetools/jfs/t1/121466/20/6784/28830/5f06e7f2Edbb8998c/9bdd9e7b24dff9fe.png',
      prizeLevel: 0
    });
    const scrollAniEnd = (val: boolean) => {
      console.log(val ? '恭喜中奖！！！' : '很遗憾！没有中奖');
      setTimeout(() => {
        data.startFlag = false;
      }, 300);
    };
    const run = () => {
      let timer = null;
      timer = setInterval(() => {
        data.customNumber = Math.floor(Math.random() * (700 - 100 + 1) + 100);
      }, 5000);
    };
    const startRole = () => {
      data.prizeLevel = Math.floor(Math.random() * 5 + 1);
      console.log(data.prizeLevel, '中奖');
      data.startFlag = true;
      // 实际运行情况下，开始滚动函数，需要放在奖品回调函数之后，如果异步操作会影响转动结果
      setTimeout(() => {
        (countupMachine.value as any).machineLuck();
      }, 500);
    };
    const countupMachine = ref(null);
    const startRole2 = () => {
      data.prizeLevel = -1;
      console.log(data.prizeLevel, '不中奖');
      data.startFlag = true;
      setTimeout(() => {
        (countupMachine.value as any).machineLuck();
      }, 500);
    };
    onMounted(() => {
      run();
    });
    return {
      ...toRefs(data),
      scrollAniEnd,
      startRole,
      startRole2,
      countupMachine,
      translate
    };
  }
});
</script>

<style></style>
<style lang="scss" scoped>
#app .demo {
  padding: 57px 0 0 0;
}
.show-demo {
  background: #ffffff;
}
.nut-theme-dark {
  .show-demo {
    background: $dark-background;
  }
}
h2 {
  padding: 0 20px;
}
.btnBtn {
  text-align: center;
  .nut-button {
    margin-right: 20px;
  }
}
.disabledClick {
  pointer-events: none !important;
  cursor: not-allowed !important;
  opacity: 0.6 !important;
}
</style>
