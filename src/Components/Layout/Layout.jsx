import React, { Fragment } from 'react'
import Navigation from './Navigation'

export default function Layout(props) {
  return (
    <Fragment>
    <Navigation />
    <main>{props.children}</main>
  </Fragment>
  )
}
