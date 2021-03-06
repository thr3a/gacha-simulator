<template>
  <div class="container">
    <h3><a href="/">ガチャシュミレーター</a></h3>
    <p>
      スマホゲームなどのガチャ確率計算ツール
    </p>
    <hr class="invisible">
    <div class="form">
      <ValidationObserver ref="myform">
        <div class="form-group">
          <ValidationProvider v-slot="{ errors }" rules="min_value:0.01|required|max_value:99">
            <label for="">当たりの出現率</label>
            <div class="input-group">
              <input v-model="prob" type="number" class="form-control" name="出現率">
              <div class="input-group-append">
                <span class="input-group-text">%</span>
              </div>
            </div>
            <span v-show="errors.length>0">
              {{ errors[0] }}
            </span>
            <div class="preset-btn-group">
              <template v-for="prob in presetProb">
                <button :key="prob" class="btn btn-outline-primary" :data-prob="prob" @click="setProb($event)">
                  {{ prob }}
                </button>
              </template>
            </div>
          </ValidationProvider>
          <div class="form-group">
            <ValidationProvider v-slot="{ errors }" rules="min_value:10|required">
              <label for="">ガチャを試す回数</label>
              <input v-model="count" type="number" class="form-control" name="回数">
              <span v-show="errors.length>0">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
            <div class="preset-btn-group">
              <button class="btn btn-outline-primary" @click="addCount(10)">
                +10
              </button>
              <button class="btn btn-outline-danger" @click="addCount(-10)">
                -10
              </button>
              <button class="btn btn-outline-primary" @click="addCount(100)">
                +100
              </button>
              <button class="btn btn-outline-danger" @click="addCount(-100)">
                -100
              </button>
            </div>
          </div>
        </div>
      </ValidationObserver>
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
    const c = 30
    return {
      value: 30,
      minCount: 10,
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
        5,
        6,
        10
      ]
    }
  },
  watch: {
    prob (val) {
      if (this.validateProb(val)) {
        this.gacha.setProb(val)
      }
    },
    async count (val) {
      const is_valid = await this.$refs.myform.validate('count')
      if (is_valid) {
        this.gacha.count = val
      }
    }
  },
  methods: {
    setProb (event) {
      this.prob = Number(event.target.dataset.prob)
    },
    setCount (event) {
      this.count = Number(event.target.dataset.count)
    },
    validateCount (val) {
      if (val === '') {
        return true
      }
      if (val < 10) {
        return false
      }
      return true
    },
    validateProb (val) {
      if (val === '') {
        return false
      }
      return true
    },
    addCount (num) {
      this.count = Number(this.count) + Number(num)
    }
  }

}
</script>

<style>
</style>
