import { defaultTitle, defaultStyles } from '../constants'
import { clone } from '../core/utils'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  title: defaultTitle,
  currentStyles: defaultStyles,
  openingTime: new Date().toJSON()
}

const normailze = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export function normailzeInitialState(state) {
  return state ? normailze(state) : clone(defaultState)
}
