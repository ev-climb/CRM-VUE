<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p v-for="currency in currencies" :key="currency" class="currency-line">
          <span>{{ getCurrency(currency) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['rates'],
    data: () => ({
      currencies: ['USD', 'TRY', 'RUB'],
    }),
    computed: {
      base() {
        return this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['USD']);
      },
    },
    methods: {
      getCurrency(currency) {
        console.log(this.base);

        return Math.floor(this.base * this.rates[currency]);
      },
    },
  };
</script>
