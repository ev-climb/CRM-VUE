<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas" id="history-chart"></canvas>
    </div>
    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">Записей пока нет</p>

    <section v-else>
      <HistoryTable :records="items" />

      <Paginate
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'" />
    </section>
  </div>
</template>

<script>
  import paginationMixin from '@/mixins/pagination.mixins';
  import HistoryTable from '@/components/HistoryTable';
  import { Pie } from 'vue-chartjs';

  export default {
    name: 'history',
    metaInfo: {
      title: 'History | VUE-CRM',
    },
    extends: Pie,
    mixins: [paginationMixin],
    data: () => ({
      loading: true,
      records: [],
    }),
    components: {
      HistoryTable,
    },
    async mounted() {
      this.records = await this.$store.dispatch('fetchRecords');
      const categories = await this.$store.dispatch('fetchCategories');

      this.setup(categories);
      this.loading = false;
    },
    methods: {
      setup(categories) {
        this.setupPagination(
          this.records.map((record) => {
            return {
              ...record,
              categoryName: categories.find((c) => c.id === record.categoryId).title,
              typeClass: record.type === 'income' ? 'green' : 'red',
              typeText: record.type === 'income' ? 'Доход' : 'Расход',
            };
          }),
        );
        this.renderChart({
          labels: categories.map((c) => c.title),
          datasets: [
            {
              label: 'Расходы по категориям',
              data: categories.map((c) => {
                return this.records.reduce((total, r) => {
                  if (r.categoryId === c.id && r.type === 'outcome') {
                    total += +r.amount;
                  }
                  return total;
                }, 0);
              }),
              borderWidth: 1,
            },
          ],
        });
      },
    },
  };
</script>

<style lang="scss" scoped></style>
