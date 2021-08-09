Vue.component('task', {
    template: `
        <li>
            <slot></slot>
        </li>`,
});

Vue.component('task-list', {
    template: `
      <div>
        <task v-for="task in this.tasks">
          {{ task.description }}
        </task>
      </div>`,

    data() {
        return {
            tasks: [
                { description: 'Descrição 1', completed: false },
                { description: 'Descrição 2', completed: true },
                { description: 'Descrição 3', completed: false },
                { description: 'Descrição 4', completed: true },
                { description: 'Descrição 5', completed: false }
            ]
        }
    }
});

new Vue({
    el: '#root',
})