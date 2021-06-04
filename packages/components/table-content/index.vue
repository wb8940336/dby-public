<template>
    <div class="table-content" :style="{'padding':padding+'px'}">
        <div class="filter-box" v-if="searchList.length>0">
            <el-form :inline="true" ref="form" :model="form">
                <el-form-item :label="item.label+':'" v-for="(item,index) in searchList" :key="index">
                    <template v-if="item.type=='input'">
                        <el-input :size="size" clearable v-model.trim="form[item.key]" :placeholder="`请输入${item.label}`"></el-input>
                    </template>
                    <template v-if="item.type=='autocomplete'">
                        <el-autocomplete clearable :size="size" class="inline-input" v-model.trim="form[item.key]" :value-key="item.searchKey||'value'"
                            :debounce="item.debounce||300" :fetch-suggestions="item.getData" :placeholder="`请输入${item.label}`" :trigger-on-focus="false"
                            prefix-icon="el-icon-search">
                        </el-autocomplete>
                    </template>
                    <template v-if="item.type=='datetime'">
                        <el-date-picker v-model="form[item.key]" type="datetime" :size="size" clearable :placeholder="`请选择${item.label}`">
                        </el-date-picker>
                    </template>
                    <template v-if="item.type=='datePicker'">
                        <el-date-picker v-model="form[item.key]" type="date" :format="item.format||'yyyy-MM-dd'" :value-format="item.format||'yyyy-MM-dd'" :size="size" clearable
                            :placeholder="`请选择${item.label}`" :picker-options="pickerOptions">
                        </el-date-picker>
                    </template>
                    <template v-if="item.type=='dateRange'">
                        <el-date-picker style="width:240px" type="daterange" v-model="form[item.key]" :format="'yyyy-MM-dd'" :value-format="'yyyy-MM-dd'" :size="size" clearable
                            start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="rangePickerOptions">
                        </el-date-picker>
                    </template>
                    <template v-if="item.type=='dateTimePicker'">
                        <el-date-picker style="width:340px" type="datetimerange" v-model="form[item.key]" :format="'yyyy-MM-dd HH:mm:ss'" :value-format="'yyyy-MM-dd HH:mm:ss'"
                            :size="size" clearable start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="dateTimePickerOpts">
                        </el-date-picker>
                    </template>
                    <template v-if="item.type=='select'">
                        <el-select :size="size" clearable v-model="form[item.key]" :placeholder="`请选择${item.label}`">
                            <el-option v-for="(opt,optIndex) in item.options" :key="optIndex" :label="opt[item.defaultProps?item.defaultProps.label:'label']"
                                :value="opt[item.defaultProps?item.defaultProps.value:'value']">
                            </el-option>
                        </el-select>
                    </template>
                    <template v-if="item.type=='cascader'">
                        <el-cascader :size="size" v-model="form[item.key]" :options="item.options" :props="{       
                            expandTrigger: 'hover',
                            checkStrictly:true
                        }"></el-cascader>
                    </template>
                </el-form-item>
                <el-form-item v-if="inlineSearch">
                    <el-button type="primary" icon="el-icon-search" size="small" @click="search">{{searchText}}</el-button>
                    <el-button type="reset" icon="el-icon-refresh" size="small" @click="reset">{{resetText}}</el-button>
                    <slot name="btns"></slot>
                </el-form-item>
            </el-form>
        </div>
        <div class="search-area" v-if="!inlineSearch">
            <el-button type="primary" icon="el-icon-search" size="small" @click="search">{{searchText}}</el-button>
            <el-button type="reset" icon="el-icon-refresh" size="small" @click="reset">{{resetText}}</el-button>
            <slot name="btns"></slot>
        </div>
        <div class="edit-group">
            <slot name="customArea"></slot>
        </div>
        <div class="table-wrapper">
            <el-table :header-cell-style="{background:'#FAFAFA'}" :data="tableData" :border="border" size="small" style="width: 100%" @selection-change="selectionChange"
                column-key="orderId" :max-height="maxHeight">
                <template slot="empty">
                    <div class="base-table-empty-img">
                        <svg-icon icon="noData" style="width:100px;height:100px"></svg-icon>
                        <p>{{emptyText}}</p>
                    </div>
                </template>
                <el-table-column type="selection" width="50" align="center" v-if="selection" fixed="left"></el-table-column>
                <el-table-column :width="item.width||'auto'" :prop="item.dataKey" :label="item.label" v-for="(item,index) in columns" :key="index" :align="item.align||'center'"
                    :fixed="item.fixed" :show-overflow-tooltip="item.showOverflowTooltip===false?item.showOverflowTooltip:showOverflowTooltip" :sortable="item.sortable">
                    <template slot-scope="scope">
                        <span v-if="item.type=='index'">{{scope.$index+1}}</span>
                        <slot v-else-if="item.slotScope" :name="item.slotScope" :row="scope.row">
                            {{scope.row[item.dataKey]||"--"}}
                        </slot>
                        <span v-else>{{scope.row[item.dataKey]||"--"}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination" v-if="pagination" :style="{'text-align':paginationAlign}">
                <el-pagination background @size-change="onSizeChange" @current-change="onPageChange" :current-page="page" :page-sizes="pageSizes" :page-size="pageSize"
                    layout="total,sizes,prev,pager,next,jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>

</template>

<script>
import moment from "moment";
export default {
    name: "tableWrapper",
    components: {},
    props: {
        //查询按钮文字
        searchText: {
            type: String,
            default: "查询"
        },
        //重置按钮文字
        resetText: {
            type: String,
            default: "重置"
        },
        padding: {
            type: Number,
            default: 20
        },
        //搜索表单列表
        searchList: {
            type: Array,
            default() {
                return []
            }
        },
        //搜索，重置是否行内显示
        inlineSearch: {
            type: Boolean,
            default: true
        },
        //表格列
        columns: {
            type: Array,
            dafault() {
                return []
            }
        },
        //数据源
        tableData: {
            type: Array,
            default() {
                return []
            }
        },
        //是否需要选择框
        selection: {
            type: Boolean,
            default: false
        },
        //是否溢出显示tooltip
        showOverflowTooltip: {
            type: Boolean,
            default: false
        },
        //表格最大高度
        maxHeight: {
            default: "—"
        },
        //分页参数,默认没有分页
        pagination: {
            default: null
        },
        //分页位置
        paginationAlign: {
            type: String,
            default: "center"
        },
        //表格边框是否需要
        border: {
            type: Boolean,
            default: true
        },
        //空数据文本提示;
        emptyText: {
            type: String,
            default: "暂无数据"
        },
        pageSizes: {
            type: Array,
            default() {
                return [10, 20, 50]
            }
        }
    },
    watch: {
        searchList: {
            handler(obj) {
                obj.map(($) => {
                    this.form = Object.assign({}, this.form, { [$.key]: $.value || $.default || "" })
                })
            },
            deep: true,
            immediate: true
        }
    },
    data() {
        return {
            form: {},
            dateRange: [],
            downloadLoading: false,
            size: "small",
            //日期快捷选项;
            pickerOptions: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
            //日期区间快捷选项;
            rangePickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const start = moment().subtract(7, "days").format("YYYY-MM-DD");
                        const end = moment().format("YYYY-MM-DD");
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const start = moment().subtract(1, "months").format("YYYY-MM-DD");
                        const end = moment().format("YYYY-MM-DD");
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const start = moment().subtract(3, "months").format("YYYY-MM-DD");
                        const end = moment().format("YYYY-MM-DD");
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            dateTimePickerOpts: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const start = moment().subtract(7, "days").format("YYYY-MM-DD HH:mm:ss");
                        const end = moment().format("YYYY-MM-DD HH:mm:ss");
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const start = moment().subtract(1, "months").format("YYYY-MM-DD HH:mm:ss");
                        const end = moment().format("YYYY-MM-DD HH:mm:ss");
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const start = moment().subtract(3, "months").format("YYYY-MM-DD HH:mm:ss");
                        const end = moment().format("YYYY-MM-DD HH:mm:ss");
                        picker.$emit('pick', [start, end]);
                    }
                }]
            }
        };
    },
    computed: {
        page() {
            return this.pagination ? this.pagination.page || 1 : 1
        },
        pageSize() {
            return this.pagination ? this.pagination.pageSize || 10 : 10
        },
        total() {
            return this.pagination ? this.pagination.total || 0 : 0
        }
    },
    created() {
        this.getData();
    },
    mounted() {

    },
    methods: {
        selectionChange(val) {
            this.$emit("selectChange", val)
        },
        getData() {
            let params = {};
            this.searchList.map(($) => {
                let arr = this.form[$.key];
                if ($.type == "dateRange" && (arr && arr.length != 0)) {
                    params = Object.assign({}, params, {
                        [$.start || "start"]: $.format ? (arr[0] + " 00:00:00") : arr[0],
                        [$.end || "end"]: $.format ? (arr[1] + " 23:59:59") : arr[1]
                    })
                } else if ($.type == "dateTimePicker" && (arr && arr.length != 0)) {
                    params = Object.assign({}, params, {
                        [$.start || "start"]: arr[0],
                        [$.end || "end"]: arr[1]
                    })
                } else {
                    if (this.form[$.key] || this.form[$.key] === 0) {
                        params = Object.assign({}, params, {
                            [$.key]: this.form[$.key] || ""
                        })
                    }
                }
            });
            this.$emit("search", params);
        },
        reset() {
            // for (let key in this.form) {
            //     this.form = Object.assign({}, this.form, { [key]: "" })
            // }
            this.searchList.map(($) => {
                this.form = Object.assign({}, this.form, { [$.key]: $.value || $.default || "" })
            });
            this.search();
        },
        search() {
            let pagination = this.pagination;
            let obj = Object.assign({}, pagination, {
                page: 1,
            });
            this.$emit("change", obj);
            this.getData();
        },
        onSizeChange(val) {
            let pagination = this.pagination;
            let obj = Object.assign({}, pagination, {
                page: 1,
                pageSize: val
            });
            this.$emit("change", obj);
            this.getData();
        },
        onPageChange(val) {
            let pagination = this.pagination;
            let obj = Object.assign({}, pagination, {
                page: val,
            });
            this.$emit("change", obj);
            this.getData();
        }
    }
}

</script>
<style lang='scss' scoped>
.table-content {
    height: 100%;
    padding: 20px;
    background-color: #fff;
    .edit-group {
        margin-bottom: 10px;
    }
    .pagination {
        text-align: center;
        margin-top: 10px;
    }
    .base-table-empty-img {
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px 0;
        p {
            font-size: 12px;
            color: #9fa7c0;
            font-weight: normal;
            line-height: 1em;
            margin: 10px 0;
        }
        .reload {
            padding: 12px 24px;
            background: rgba(79, 75, 250, 1);
            border-radius: 20px;
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 12px;
            display: inline-block;
            margin-top: 11px;
            cursor: pointer;
        }
    }
}
</style>