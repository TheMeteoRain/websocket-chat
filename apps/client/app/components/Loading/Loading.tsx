import Box from '@mui/material/Box'
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress'
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress'

function LinearProgressWithLabel(props: LinearProgressProps) {
  const temporary = (
    <Box width='100%'>
      <LinearProgress color='secondary' variant='indeterminate' {...props} />
    </Box>
  )

  return (
    <Box display='flex' alignItems='center'>
      {temporary}
    </Box>
  )
}

export const LinearWithValueLabel = () => {
  return (
    <div data-testid='loading-container'>
      <LinearProgressWithLabel data-testid='loading-animation' />
    </div>
  )
}

export const Loading: React.FC<CircularProgressProps> = (props) => {
  return (
    <Box justifyContent='center' sx={{ display: 'flex' }}>
      <CircularProgress {...props} />
    </Box>
  )
}
