<template>
  <div class="container">
    <h2>ガチャシュミレーター</h2>
    <p>
      スマホゲームなどのガチャ確率計算ツール
    </p>
    <hr class="invisible">
    <div class="form">
      <div class="form-group">
        <label for="">出現率</label>
        <input :value="prob" type="number" class="form-control">
        <div class="preset-btn-group">
          <div v-for="prob in presetProb" :key="prob" class="preset-btn">
            <button class="btn btn-outline-primary" :data-prob="prob" @click="setProb($event)">
              {{ prob }}
            </button>
          </div>
        </div>
        <div class="form-group">
          <label for="">試行回数</label>
          <input type="number" class="form-control" :value="count">
          <div class="preset-btn-group">
            <div v-for="count in [10, 100]" :key="count" class="preset-btn">
              <button class="btn btn-outline-primary" :data-count="count" @click="setCount($event)">
                {{ count }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr class="invisible">
    <ul class="result-list">
      <li>1回以上当たる確率は <span class="any-success-prob">{{ gacha.anySuccessProb() | formatProb }}</span>%</li>
      <li>全て外れる確率は <span class="all-fail-prob">{{ gacha.allFailProb() | formatProb }}</span>%</li>
    </ul>
    <ul class="result-list">
      <li v-for="(threshold, index) in [50, 70, 95]" :key="index">
        {{ threshold }}%の人は <span class="count">{{ gacha.anySuccessCount(threshold) }}</span>回やれば、1回は当たる
      </li>
      <li>1%の人は <span class="all-fail-count">{{ gacha.anySuccessCount(99) }}</span>回やっても全て外れる🤪</li>
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
      gacha: new Gacha(p, c),
      presetProb: [
        0.1,
        0.2,
        0.25,
        0.3,
        0.333,
        0.4,
        0.5,
        0.6,
        0.7,
        0.75,
        0.8,
        0.9,
        1,
        1.2,
        1.666,
        2,
        3,
        4,
        10
      ]
    }
  },
  watch: {
    prob (val) {
      this.gacha.setProb(val)
      this.prob = val
    },
    count (val) {
      this.gacha.count = val
      this.count = val
    }
  },
  methods: {
    setProb (event) {
      this.prob = event.target.dataset.prob
    },
    setCount (event) {
      this.count = event.target.dataset.count
    }
  }

}
</script>

<style>
</style>
