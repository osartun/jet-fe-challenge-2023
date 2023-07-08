import type { GatsbySSR } from 'gatsby'
import React from 'react'
import { Provider } from 'react-redux'

import store from './src/app/store'

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => {
  return (
    <Provider store={store}>
      {element}
    </Provider>
  )
}