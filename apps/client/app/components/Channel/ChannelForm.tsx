import SendIcon from '@mui/icons-material/Send'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import React from 'react'

export type ChannelFormProps = {
  id: string
  handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export const ChannelForm: React.FC<ChannelFormProps> = ({
  id,
  handleOnSubmit,
}) => {
  const preventDefault =
    (callbackFn: (event: React.FormEvent<HTMLFormElement>) => void) =>
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      return callbackFn(event)
    }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      // Find the form and submit it
      const form = event.currentTarget.form
      if (form) {
        form.requestSubmit()
      }
    }
  }
  return (
    <Paper
      component='form'
      id={id}
      onSubmit={preventDefault(handleOnSubmit)}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mt: 3 }}
    >
      <InputBase
        sx={{ ml: 1, p: 2, flex: 1 }}
        placeholder='Message'
        id='message'
        multiline
        name='message'
        required
        inputProps={{ 'aria-label': 'message' }}
        onKeyDown={handleKeyDown}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
      <IconButton
        color='accent'
        sx={{ p: '10px' }}
        aria-label='directions'
        type='submit'
      >
        <SendIcon />
      </IconButton>
    </Paper>
  )
}

export default ChannelForm
