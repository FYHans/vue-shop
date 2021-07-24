<template>
<!-- main中数据图 -->
        <div class="card">
            <div><span :class="icon"></span> {{dataMain.title}}</div>
            <div><strong>{{dataMain.num}}</strong>{{dataMain.unit}}</div>
            <div>{{dataMain.day}}<span :class="dataMain.dayrise ? 'rise' : ''"></span></div> 
            <div>{{dataMain.info}}<span :class="dataMain.dayrise ? 'inforise' : 'infode'"></span></div>
        </div>
</template>

<style lang="scss">
@import '@/styles/mixin.scss';
$inColor: red;
$deColor: green;
$inBorder: bottom;
$deBorder: top;

    .card {
        box-sizing: border-box;
        padding: 15px 20px;
        height: 150px;
        line-height: 0px;
        text-align: left;
        color: #fff;
        border-radius: 20px;
        div {
            height: 20px;
            &:nth-child(1) {
                font-size: 18px;
                margin-bottom: 30px;
                span {
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    line-height: 24px;
                    text-align: center;
                    border: 2px solid #fff;
                    border-radius: 50%;
                }
            }
            &:nth-child(2) {
                font-size: 14px;
                padding-left: 20px;
                margin-bottom: 20px;
                strong {
                    font-size: 33px;
                    margin-right: 5px;
                }
            }
            &:nth-child(3),
            &:nth-child(4) {
                display: inline-block;
                margin-right: 20px;
                span {
                    position: relative;
                    top: -6px;
                    left: 5px;
                }
                .rise {
                    @include arrow(6px, $inColor, $inBorder)
                }
                .inforise {
                    @include arrow(6px, $inColor, $inBorder)
                }
                .infode {
                    top: -1px;
                    left: 5px;
                    @include arrow(6px, $deColor, $deBorder)
                }
            }
        }
    }
</style>

<script>
export default {
    props: ['dataMain', 'icon']
}
</script>