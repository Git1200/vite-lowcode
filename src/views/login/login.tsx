import { ref, toRefs, defineComponent } from 'vue';
import { helloword } from './styles/HelloWord.module.scss'
const count = ref(0)
export default defineComponent({
  name: 'Login',
  render() {
    return <>
    <h1 class={helloword}>{this.msg}</h1>
    <h1>HelloWord</h1>
    <h1>HelloWord</h1>
  </>
  }
})

