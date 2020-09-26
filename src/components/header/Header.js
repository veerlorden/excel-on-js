import { ExcelComponent } from '../../core/ExcelComponent'
import { $ } from './../../core/dom'
import * as actions from './../../redux/actions'
import { defaultTitle } from '../../constants'
import { ActiveRoute } from '../../core/routes/ActiveRoute'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
      <input type="text" class="input" value="${title}" data-type=header>

      <div>
          <div class="button" data-button="delete">
            <i class="material-icons" data-button="delete">delete</i>
          </div>

            <div class="button" data-button="exit">
              <i class="material-icons" data-button="exit">exit_to_app</i>
            </div>

      </div>
    `
  }

  onInput(event) {
    const name = $(event.target).text()
    this.$dispatch(actions.changeHeader(name))
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.button === 'delete') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу?')
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.params)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }
}
