import Box from '@material-ui/core/Box'
import LinearProgress, {
  LinearProgressProps,
} from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

function LinearProgressWithLabel(props: LinearProgressProps) {
  return (
    <Box display='flex' alignItems='center'>
      <Box width='100%'>
        <LinearProgress color='secondary' variant='indeterminate' {...props} />
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'flex-start',
    position: 'relative',
    zIndex: theme.zIndex.drawer + 1,
    width: '100%',
  },
}))

export const LinearWithValueLabel = () => {
  const classes = useStyles()

  return (
    <div className={classes.root} data-testid='loading-container'>
      <LinearProgressWithLabel data-testid='loading-animation' />
    </div>
  )
}
