import { createStyles, makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginTop: theme.spacing(10),
    },
  })
)

export const NotFound = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <main className={classes.content}> NOT FOUND - 404</main>
    </div>
  )
}

export default NotFound
