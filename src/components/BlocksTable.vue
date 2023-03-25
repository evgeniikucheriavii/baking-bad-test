<template>
    <div class="p-3">
        <div id="table" class="table col gap-3">
            <div class="row gap-3 table-head">
                <div
                    v-for="(col, index) in columns"
                    :key="`col_${index}`"
                    class="row p-3 gap-3 align-items-center"
                    :style="{'width': `${col.width}px`}"
                >
                    <span>{{ col.title }}</span>
                    <i
                        v-if="col.sortable"
                        :class="[
                            'fa-solid',
                            sort === col.name ? 'fa-sort-down' : 'fa-sort text-gray'
                        ]"
                        @click="onSortClick(col.name)"
                    ></i>
                </div>
            </div>
            <div class="table-body col gap-2">
                <div
                    v-for="(row, rIndex) in data"
                    :key="`row_${rIndex}`"
                    class="row gap-3"
                >
                    <div
                        v-for="(col, cIndex) in columns"
                        :key="`row_${rIndex}_col_${cIndex}`"
                        class="row table-col p-3 gap-3 align-items-center"
                        :style="{'width': `${col.width}px`}"
                    >
                        <span
                            v-if="col.name === 'timestamp'"
                        >{{ new Date(row['timestamp']).toLocaleString() }}</span>
                        <span v-else-if="col.name === 'proposer'">{{ row[col.name].address }}</span>
                        <span v-else>{{ row[col.name] }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-if="fetchingData"
            class="table-body col gap-2"
        >
            <div
                v-for="(row, rIndex) in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]"
                :key="`fake_row_${rIndex}`"
                class="row gap-3"
            >
                <div
                    v-for="(col, cIndex) in columns"
                    :key="`row_${rIndex}_col_${cIndex}`"
                    class="row table-col p-3 gap-3 align-items-center"
                    :style="{'width': `${col.width}px`}"
                >
                    <div class="fake-block" :style="{'width': '100%'}"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getBlocks, getBlocksCount } from '@/assets/tzktApi'

export default {
    name: 'BlocksTable',
    data() {
        return {
            columns: [
                { name: 'level', title: 'Level', sortable: true, width: 100 },
                { name: 'timestamp', title: 'Timestamp', width: 200 },
                { name: 'hash', title: 'Hash', width: 550 },
                { name: 'proposer', title: 'Proposer', width: 400 },
                { name: 'reward', title: 'Reward', sortable: true, width: 100 },
                { name: 'fees', title: 'Fees', sortable: true, width: 100 },
            ],
            sort: 'id',
            offset: 0,
            limit: 20,
            data: [],
            fetchingData: false,
            lastBlocksCount: 0,
        }
    },
    watch: {
        sort() {
            this.offset = 0
            this.data = []
            this.fetchData()
        }
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll)
        this.fetchData()
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll)
    },
    methods: {
        fetchData() {
            this.fetchingData = true

            getBlocksCount().then((response) => {
                // тут мы проверяем актуальное количество блоков
                // Если оно больше последнего сохранённого - увеличиваем offset, чтобы не дублировать строки
                const newBlocksCount = response.data
                const blocksCountDelta = newBlocksCount - this.lastBlocksCount

                if (this.lastBlocksCount !== 0) {
                    this.offset += blocksCountDelta
                }
                this.lastBlocksCount = newBlocksCount

                getBlocks(this.offset, this.limit, this.sort).then((response) => {
                    this.data = [
                        ...this.data,
                        ...response.data
                    ]
                    this.fetchingData = false
                })
            })
        },
        onScroll() {
            if (this.fetchingData) {
                return
            }
            const pageHeight = document.body.scrollHeight
            const scrollBottom = window.scrollY + window.innerHeight

            const delta = Math.abs(pageHeight - scrollBottom)
            const scrollSpacing = 300

            if (delta < scrollSpacing) {
                this.offset += this.limit

                // Добавил задержку для демонстрации
                setTimeout(() => {
                    this.fetchData()
                }, 1000)
            }
        },
        onSortClick(value) {
            if (this.sort === value) {
                this.sort = 'id'
                return
            }

            this.sort = value
        },
    }
}
</script>

<style>
.table {
    width: 100%;
}

.table-head {
    border: 1px solid #333;
    background-color: #333;
    border-radius: var(--radius);
}

.table-col {
    overflow: hidden;
}
</style>
