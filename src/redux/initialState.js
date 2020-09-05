import { storage } from '../core/utils'
import { defaultTitle, defaultStyles } from '../constants'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  title: defaultTitle,
  currentStyles: defaultStyles
}

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState
