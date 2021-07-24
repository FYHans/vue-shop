<template>
    <div class="order-list">
        <div class="search">
        
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <div class="title">
                    <span class="el-icon-search"> 筛选搜索</span>
                    <div class="btn">
                        <el-form-item>
                            <el-button  @click="onReset">重置</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                        </el-form-item>
                    </div>
                </div>
                <div class="inp">
                    <el-form-item label="输入搜索">
                        <el-input v-model="formInline.search" placeholder="输入搜索"></el-input>
                    </el-form-item>
                    <el-form-item label="商品货号">
                        <el-input v-model="formInline.num" placeholder="商品货号"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类">
                        <el-select v-model="formInline.region" placeholder="请选择">
                            <el-option label="衣服" value="yifu"></el-option>
                            <el-option label="鞋子" value="xiezi"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="inp">
                    <el-form-item label="商品品牌">
                        <el-select v-model="formInline.region" placeholder="请选择品牌">
                            <el-option label="衣服" value="yifu"></el-option>
                            <el-option label="鞋子" value="xiezi"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上架状态">
                        <el-select v-model="formInline.region" placeholder="全部">
                            <el-option label="衣服" value="yifu"></el-option>
                            <el-option label="鞋子" value="xiezi"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="审核状态">
                        <el-select v-model="formInline.region" placeholder="全部">
                            <el-option label="衣服" value="yifu"></el-option>
                            <el-option label="鞋子" value="xiezi"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="add">
            数据列表
            <span class="el-icon-tickets">数据列表</span>
        </div>
        <div class="list"></div>
    </div>
</template>

<style lang="scss" scoped>
    .order-list {
        padding: 15px;
        .search {
            padding: 10px;
            margin-bottom: 10px;
            .title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                span {
                    font-size: 18px;
                }
            }
            .inp {
                display: flex;
                justify-content: space-evenly;
            }
        }
        .add {
            padding: 10px;
            border: 1px solid #ccc;
            font-size: 18px;
        }
    }
</style>

<script>
export default {
     data() {
      return {
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      onReset() {
          console.log('reset');
      }
    }
}
</script>