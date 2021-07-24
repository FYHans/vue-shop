<template>
    <div class="order" style="background-color: #fff">
        <Seller></Seller>
        <Trend></Trend>
        <Stock class="stock"></Stock>
    </div>
</template>

<script>
import Seller from '@/components/echarts/Seller';
import Trend from '@/components/echarts/Trend';
import Stock from '@/components/echarts/Stock';

export default {
    components: { Seller, Trend, Stock },
}
</script>