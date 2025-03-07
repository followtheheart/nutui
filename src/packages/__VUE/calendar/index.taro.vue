<template>
  <nut-popup
    v-if="poppable"
    v-model:visible="show"
    position="bottom"
    round
    closeable
    @click-overlay="closePopup"
    @click-close-icon="closePopup"
    :style="{ height: '85vh' }"
  >
    <nut-calendar-item
      v-if="show"
      ref="calendarRef"
      :type="type"
      :is-auto-back-fill="isAutoBackFill"
      :poppable="poppable"
      :title="title"
      :default-value="defaultValue"
      :start-date="startDate"
      :end-date="endDate"
      @update="update"
      @close="close"
      @choose="choose"
      @select="select"
      :confirm-text="confirmText"
      :start-text="startText"
      :end-text="endText"
      :show-today="showToday"
      :show-title="showTitle"
      :show-sub-title="showSubTitle"
      :to-date-animation="toDateAnimation"
      :first-day-of-week="firstDayOfWeek"
    >
      <template #btn v-if="showTopBtn">
        <slot name="btn"> </slot>
      </template>
      <template #day="date" v-if="dayInfo">
        <slot name="day" :date="date.date"> </slot>
      </template>
      <template #top-info="date" v-if="topInfo">
        <slot name="top-info" :date="date.date"> </slot>
      </template>
      <template #bottom-info="date" v-if="bottomInfo">
        <slot name="bottom-info" :date="date.date"> </slot>
      </template>
    </nut-calendar-item>
  </nut-popup>
  <nut-calendar-item
    v-else
    :type="type"
    :is-auto-back-fill="isAutoBackFill"
    :poppable="poppable"
    :title="title"
    ref="calendarRef"
    :confirm-text="confirmText"
    :start-text="startText"
    :end-text="endText"
    :default-value="defaultValue"
    :start-date="startDate"
    :end-date="endDate"
    @close="close"
    @choose="choose"
    @select="select"
    :show-title="showTitle"
    :show-sub-title="showSubTitle"
    :to-date-animation="toDateAnimation"
    :show-today="showToday"
    :first-day-of-week="firstDayOfWeek"
  >
    <template #btn v-if="showTopBtn">
      <slot name="btn"> </slot>
    </template>
    <template #day="date" v-if="dayInfo">
      <slot name="day" :date="date.date"> </slot>
    </template>
    <template #top-info="date" v-if="topInfo">
      <slot name="top-info" :date="date.date"> </slot>
    </template>
    <template #bottom-info="date" v-if="bottomInfo">
      <slot name="bottom-info" :date="date.date"> </slot>
    </template>
  </nut-calendar-item>
</template>
<script lang="ts">
import { ref, watch, computed, reactive, toRefs } from 'vue';
import { createComponent } from '@/packages/utils/create';
const { create } = createComponent('calendar');
import CalendarItem from '../calendaritem/index.taro.vue';
import Popup from '../popup/index.taro.vue';
import Utils from '@/packages/utils/date';
import { useExpose } from '@/packages/utils/useExpose/index';
import Taro from '@tarojs/taro';
import { CalendarRef } from '../calendaritem/type';

export default create({
  components: {
    [CalendarItem.name]: CalendarItem,
    [Popup.name]: Popup
  },
  props: {
    type: {
      type: String,
      default: 'one'
    },
    isAutoBackFill: {
      type: Boolean,
      default: false
    },
    toDateAnimation: {
      type: Boolean,
      default: true
    },
    poppable: {
      type: Boolean,
      default: true
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showSubTitle: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      default: false
    },
    showToday: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: ''
    },
    startText: {
      type: String,
      default: ''
    },
    endText: {
      type: String,
      default: ''
    },
    defaultValue: {
      type: [String, Array]
    },
    startDate: {
      type: String,
      default: Utils.getDay(0)
    },
    endDate: {
      type: String,
      default: Utils.getDay(365)
    },
    firstDayOfWeek: {
      type: Number,
      default: 0,
      validator: (val: number) => val >= 0 && val <= 6
    }
  },
  emits: ['choose', 'close', 'update:visible', 'select'],
  setup(props, { emit, slots }) {
    const state = reactive({
      ENV: Taro.getEnv(),
      ENV_TYPE: Taro.ENV_TYPE
    });
    const showTopBtn = computed(() => {
      return slots.btn;
    });
    const topInfo = computed(() => {
      return slots['top-info'];
    });
    const dayInfo = computed(() => {
      return slots.day;
    });
    const bottomInfo = computed(() => {
      return slots['bottom-info'];
    });
    let show = ref(props.visible);
    // element refs
    const calendarRef = ref<null | CalendarRef>(null);
    const scrollToDate = (date: string) => {
      calendarRef.value?.scrollToDate(date);
    };
    const initPosition = () => {
      calendarRef.value?.initPosition();
    };
    useExpose({
      scrollToDate,
      initPosition
    });
    // methods
    const update = () => {
      show.value = false;
      emit('update:visible', false);
    };

    const close = () => {
      show.value = false;
      emit('close');
      emit('update:visible', false);
    };

    const choose = (param: string) => {
      close();
      emit('choose', param);
    };

    const closePopup = () => {
      close();
    };
    const select = (param: string) => {
      // close();
      emit('select', param);
    };
    watch(
      () => props.visible,
      (value: boolean) => {
        show.value = value;
      }
    );

    return {
      ...toRefs(state),
      show,
      closePopup,
      update,
      close,
      select,
      choose,
      calendarRef,
      showTopBtn,
      topInfo,
      dayInfo,
      bottomInfo
    };
  }
});
</script>
