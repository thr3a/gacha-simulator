import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate'
import { required, max_value, min_value } from 'vee-validate/dist/rules'
import ja from 'vee-validate/dist/locale/ja.json'

extend('required', required)
extend('max_value', max_value)
extend('min_value', min_value)

localize('ja', ja)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
