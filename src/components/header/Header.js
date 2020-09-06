import { ExcelComponent } from '../../core/ExcelComponent'
import { $ } from './../../core/dom'
import * as actions from './../../redux/actions'
import { defaultTitle } from '../../constants'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    })
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    console.log(title)
    return `
      <input type="text" class="input" value="${title}" data-type=header>

      <div>

        <div class="button">
          <i class="material-icons">delete</i>
        </div>

        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>

      </div>
    `
  }

  onInput(event) {
    const name = $(event.target).text()
    this.$dispatch(actions.changeHeader(name))
  }
}
