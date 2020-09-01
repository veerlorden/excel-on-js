const CODES = {
  A: 65,
  Z: 90
}
const DEFAULT_WIDTH = '120'
const DEFAULT_HEIGHT = '24'

function getWidth(colState, index) {
  return (colState[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(rowState, index) {
  return (rowState[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(row, state) {
  return function(_, col) {
    const width = `style="width: ${getWidth(state, col)}"`
    return `
      <div class="cell"
        contenteditable
        data-col="${col}"
        data-type="cell"
        data-id="${row}:${col}"
        ${width}>
      </div>
  `
  }
}

function toColumn(state) {
  return function(col, index) {
    const width = `style="width: ${getWidth(state, index)}"`
    return `
    <div class="column"
      data-type="resizable"
      data-col="${index}"
      ${width}>
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
  }
}

function createRow(index, content, state = {}) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  const height = `style="height: ${getHeight(state, index)}"`
  return `
    <div class="row" data-type="resizable" data-row="${index}" ${height}>
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn(state.colState))
      .join('')

  rows.push(createRow(0, cols))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row, state.colState))
        .join('')

    rows.push(createRow(row + 1, cells, state.rowState))
  }

  return rows.join('')
}
