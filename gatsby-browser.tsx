import type { GatsbyBrowser } from 'gatsby'
import React from 'react'
import { Provider } from 'react-redux'

import store from './src/app/store'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => {
  return (
    <Provider store={store}>
      {element}
    </Provider>
  )
}