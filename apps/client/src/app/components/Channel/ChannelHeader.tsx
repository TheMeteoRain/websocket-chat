import Card from '@material-ui/core/Card'
import React from 'react'

export interface ChannelHeaderProps {}

export const ChannelHeader: React.FC<ChannelHeaderProps> = (props) => {
  const { children } = props

  return (
    <Card
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
      }}
    >
      {children}
    </Card>
  )
}

export default ChannelHeader
