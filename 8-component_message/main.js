Vue.component('message', {
    data() {
        return {
            isVisible: true
        }
    },
    props: ['title', 'body'],
    template: `
      <article class="message" v-show="isVisible">
          <div class="message-header">
            <p>{{ title }}</p>
            <button class="delete" aria-label="delete" @click="isVisible = false"></button>
          </div>
          <div class="message-body">
            {{ body }}
          </div>
      </article>
    `
})

new Vue({
    el: '#root'
})