<template>
  <div class="main container">
    <h2>ガチャシュミレーター</h2>
    <form action="">
      <div class="form-group">
        <label for="">出現率</label>
        <input :value="prob" type="number" class="form-control" @input="changeProb($event)">
        <button class="btn btn-info">
          0.1
        </button>
        <button class="btn btn-info">
          0.1
        </button>
        <button class="btn btn-info">
          0.1
        </button>
      </div>
      <div class="form-group">
        <label for="">試行回数</label>
        <input type="number" class="form-control" :value="count" @input="changeCount($event)">
      </div>
    </form>
    <ul class="result-list">
      <li>1回以上当たる確率は <span class="any-success-prob">{{ gacha.anySuccessProb() | formatProb }}</span>%</li>
      <li>全て外れる確率は <span class="all-fail-prob">{{ gacha.allFailProb() | formatProb }}</span>%</li>
    </ul>
    <ul class="result-list">
      <li v-for="(threshold, index) in [50, 70, 95]" :key="index">
        {{ threshold }}%の人は <span class="count">{{ gacha.anySuccessCount(threshold) }}</span>回 やれば1回は当たる
      </li>
      <li>1%の人は <span class="all-fail-count">{{ gacha.anySuccessCount(99) }}</span>回 やっても全て外れる</li>
    </ul>
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th>出現回数</th>
          <th>確率</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="hit in [0,1,2,3,4,5]" :key="hit">
          <td>
            {{ hit }}
          </td>
          <td>
            <span>{{ gacha.SuccessProbByHit(hit) | formatProb }}</span>%
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const Gacha = require('calc-gacha')
export default {
  filters: {
    formatProb (value) {
      const p = (value * 100).toFixed(2)
      return (p < 100) ? p : 99.99
    }
  },
  data: () => {
    const p = 1
    const c = 100
    return {
      prob: p,
      count: c,
      gacha: new Gacha(p, c)
    }
  },
  methods: {
    changeProb (event) {
      this.gacha.setProb(event.target.value)
      this.prob = event.target.value
    },
    changeCount (event) {
      this.gacha.count = event.target.value
      this.count = event.target.value
    }
  }

}
</script>

<style>
</style>
