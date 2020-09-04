import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shouldResize, isCell, isShiftPressed,
  nextSelector, matrix } from './table.functions';
import { TableSelection } from './TableSelection';
import { $ } from './../../core/dom'
import * as actions from '../../redux/actions';
import { defaultStyles } from '../../constants';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  toHTML() {
    return createTable(20, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)

    this.$on('formula:input', text => {
      this.selection.current.text(text)
      this.updateTextInStore(text)
    })
    this.$on('formula:enter', () => {
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', style => {
      this.selection.applyStyle(style)
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(event, this.$root)
      this.$dispatch(actions.tableResize(data))
    } catch (error) {
      console.warn(error)
    }
  }

  onMousedown(event) {
    if (shouldResize()) {
      this.resizeTable(event)
    } else if (isCell()) {
      const $target = $(event.target)
      this.$emit('table:select', $target)
      if (isShiftPressed()) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowUp',
      'ArrowRight',
      'ArrowDown'
    ]
    const {key} = event

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
  }
}
