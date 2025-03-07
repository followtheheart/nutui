<template>
  <view class="nut-ecard">
    <view class="nut-ecard__title">{{ chooseText || translate('chooseText') }}</view>
    <view class="nut-ecard__list">
      <view
        v-for="(item, index) in dataList"
        :key="index"
        :class="['nut-ecard__list__item', currentIndex == index ? 'active' : '']"
        @click="handleClick(item, index)"
      >
        {{ item.price }}
      </view>
      <view :class="['nut-ecard__list__input', currentIndex == 'input' ? 'active' : '']" @click="inputClick">
        <view>{{ otherValueText || translate('otherValueText') }}</view>
        <view class="nut-ecard__list__input--con">
          <input
            class="nut-ecard__list__input--input"
            type="text"
            v-model="inputValue"
            @input="change"
            :placeholder="placeholder || translate('placeholder')"
          />
          {{ suffix }}
        </view>
      </view>
      <view class="nut-ecard__list__step">
        <view>{{ suffix }}{{ money }}</view>
        <nut-input-number v-model="stepValue" :min="cardBuyMin" :max="cardBuyMax" @change="changeStep" />
      </view>
    </view>
  </view>
</template>
<script lang="ts">
import { Ref, ref, watch } from 'vue';
import { createComponent } from '@/packages/utils/create';
const { create, translate } = createComponent('ecard');
import InputNumber from '../inputnumber/index.vue';
import type { PropType } from 'vue';

export interface dataList {
  price: string | number;
}
export default create({
  components: {
    [InputNumber.name]: InputNumber
  },
  props: {
    chooseText: {
      type: String,
      default: ''
    },
    otherValueText: {
      type: String,
      default: ''
    },
    dataList: {
      type: Array as PropType<dataList[]>,
      default: () => []
    },
    cardAmountMin: {
      type: Number,
      default: 1
    },
    cardAmountMax: {
      type: Number,
      default: 9999
    },
    cardBuyMin: {
      type: Number,
      default: 1
    },
    cardBuyMax: {
      type: Number,
      default: 9999
    },
    modelValue: {
      type: [Number, String],
      default: 0
    },
    placeholder: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: '¥'
    }
  },
  emits: ['inputChange', 'changeStep', 'inputClick', 'change', 'update:modelValue'],

  setup(props, { emit }) {
    const currentIndex: Ref<number | null | string> = ref(null);
    const currentValue: Ref<number | null | string | undefined> = ref(null);
    const inputValue: Ref<string | undefined | number> = ref('');
    const stepValue: Ref<number> = ref(props.cardAmountMin);
    const money: Ref<number | string | undefined> = ref(props.modelValue);
    const handleClick = (item: { price: number | string }, index: number) => {
      currentIndex.value = index;
      stepValue.value = props.cardAmountMin;
      currentValue.value = item.price;
      emit('change', item);
      emit('update:modelValue', item.price);
    };
    const change = (event: Event) => {
      let input = event.target as HTMLInputElement;
      let val = input.value.replace(/[^\d]/g, '');
      inputValue.value = val;
      currentValue.value = val;
      if (Number(val) > props.cardAmountMax) {
        inputValue.value = props.cardAmountMax;
        currentValue.value = props.cardAmountMax;
      }
      if (Number(val) < props.cardAmountMin) {
        inputValue.value = props.cardAmountMin;
        currentValue.value = props.cardAmountMin;
      }
      emit('inputChange', Number(inputValue.value));
      emit('update:modelValue', Number(inputValue.value));
    };
    const inputClick = () => {
      currentIndex.value = 'input';
      stepValue.value = props.cardAmountMin;
      currentValue.value = inputValue.value;
      emit('update:modelValue', inputValue.value);
      emit('inputClick');
    };
    const changeStep = (value: number) => {
      stepValue.value = value;
      emit('changeStep', stepValue.value, currentValue.value); // 返回数量, 返回当前选中值
    };
    watch(
      () => props.modelValue,
      (value) => {
        money.value = value;
      }
    );
    return {
      handleClick,
      changeStep,
      change,
      inputClick,
      stepValue,
      currentIndex,
      inputValue,
      money,
      translate
    };
  }
});
</script>
